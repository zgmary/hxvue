<template>
  <div
    :class="bemCss()"
    :style="{
      width: setPx(colWidth * cols),
      left: '50%',
      marginLeft: setPx((-1 * colWidth * cols) / 2)
    }"
  >
    <div
      :class="bemCss('item')"
      v-for="(item, index) in imgsArr_c"
      :key="index"
    >
      <div
        :class="bemCss('img-box')"
        v-if="item[srcKey]"
        :style="{
          width: setPx(imgWidth),
          height: setPx(item._height)
        }"
      >
        <img
          :src="item[srcKey]"
          :width="setPx(imgWidth)"
          :height="setPx(item._height)"
          :object-fit="fitModel"
          loading="lazy"
          alt="图像获取失败！"
          @dblclick="imageDbClick(item, index)"
        />
      </div>
      <div :class="bemCss('menu')" v-if="menuIsVisible">
        <div v-for="(menuItem, menuIndex) in menuArr" :key="menuIndex">
          <div
            :class="
              menuItem.menuType === 'avatar' ? bemCss('author') : bemCss('icon')
            "
            @click="
              menuClick ? menuClick(item, index, menuItem, menuIndex) : ''
            "
          >
            <el-avatar
              :size="20"
              :src="item.authorUrl"
              v-if="menuItem.menuType === 'avatar'"
            ></el-avatar>
            <div v-else-if="menuItem.menuType === 'icon'">
              <i
                :class="menuItem.iconName"
                :style="{ color: menuItem.iconColor || 'red' }"
              ></i>
              <span v-if="menuItem.itemKey !== undefined">
                {{ item[menuItem.itemKey] }}
              </span>
            </div>
            <div v-else></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import create from "../../core/create";
export default create({
  name: "waterfall",
  props: {
    option: {
      type: Object,
      default: () => {}
    },
    imgsArr: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      maxCols: this.option.maxCols || 10,
      gutter: this.option.gutter || 6,
      imgWidth: this.option.imgWidth || 240,
      srcKey: this.option.srcKey || "thumbUrl",
      fitModel: this.option.fitModel || "fill",
      menuClick: this.option.menuClick,
      getLoadedImageNum: this.option.getLoadedImageNum,
      getLoadStatus: this.option.getLoadStatus,
      imgsArr_c: [],
      loadedCount: 0,
      cols: 0, // 需要根据窗口宽度初始化
      imgBoxEls: null, // 所有的.item元素
      beginIndex: 0,
      colsHeightArr: []
    };
  },
  computed: {
    colWidth() {
      return this.imgWidth + this.gutter;
    },
    pageWidth() {
      let pagePercent = (this.option.pageWidth || "80%").replace("%", "");
      return parseInt(pagePercent);
    },
    preview: function() {
      return this.option.preview || false;
    },
    menuIsVisible: function() {
      return this.option.menuArr || false;
    },
    menuArr: function() {
      return this.option.menuArr;
    }
  },
  mounted() {
    this.$on("preloaded", () => {
      this.imgsArr_c = this.imgsArr.concat([]); // 预加载完成，这时才开始渲染
      this.$nextTick(() => {
        this.getLoadStatus(true);
        this.imgBoxEls = this.$el.getElementsByClassName(
          "hxvue-waterfall__item"
        );
        this.getLoadedImageNum(this.imgBoxEls.length);
        this.waterfall();
      });
    });
    window.addEventListener("resize", this.response);
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("resize", this.response);
    });
    this.cols = this.calcuCols();
    this.preload();
  },
  watch: {
    imgsArr(newV) {
      if (
        this.imgsArr_c.length > newV.length ||
        (this.imgsArr_c.length > 0 && newV[0] && !newV[0]._height)
      ) {
        this.reset();
      }
      this.preload();
    }
  },
  methods: {
    imageDbClick(item, index) {
      if (this.preview) {
        this.$HxVueImagePreview(this.imgsArr, index);
      }
      this.$emit("image-dbclick", item, index);
    },
    // ==1== 预加载
    preload() {
      if (this.imgsArr.length > this.loadedCount) {
        this.getLoadStatus(false);
      }
      this.imgsArr.forEach((imgItem, imgIndex) => {
        if (imgIndex < this.loadedCount) return; // 只对新加载图片进行预加载
        if (imgItem[this.srcKey]) {
          //此处对缩略图的大小进行判断，如存在就直接使用而不是进行预加载获取
          if (imgItem.thumbUrlWidth === 0 || imgItem.thumbUrlHeight === 0) {
            const oImg = new Image();
            oImg.src = imgItem[this.srcKey];
            oImg.onload = oImg.onerror = e => {
              this.loadedCount++;
              // 预加载图片，计算图片容器的高
              this.imgsArr[imgIndex]._height =
                e.type === "load"
                  ? Math.round((this.imgWidth * oImg.height) / oImg.width)
                  : this.imgWidth;
              if (e.type === "error") {
                this.imgsArr[imgIndex]._error = true;
                this.$emit("imgError", this.imgsArr[imgIndex]);
              }
              if (this.loadedCount === this.imgsArr.length) {
                this.$emit("preloaded");
              }
            };
          } else {
            this.loadedCount++;
            this.imgsArr[imgIndex]._height = Math.round(
              (this.imgWidth * imgItem.thumbUrlHeight) / imgItem.thumbUrlWidth
            );
            if (this.loadedCount === this.imgsArr.length) {
              this.$emit("preloaded");
            }
          }
        } else {
          this.loadedCount++;
          this.imgsArr[imgIndex]._height = 0;
          if (this.loadedCount === this.imgsArr.length) {
            this.$emit("preloaded");
          }
        }
      });
    },
    // ==2== 计算cols
    calcuCols() {
      // 列数初始化
      const waterfallWidth =
        this.pageWidth > 100
          ? this.pageWidth
          : (this.pageWidth * window.innerWidth) / 100;
      let cols = Math.floor(waterfallWidth / this.colWidth);
      cols = cols === 0 ? 1 : cols;
      return cols > this.maxCols ? this.maxCols : cols;
    },
    // ==3== waterfall布局
    waterfall() {
      if (!this.imgBoxEls) return;
      let top = 0;
      let left = 0;
      let height = 0;
      if (this.beginIndex === 0) this.colsHeightArr = [];
      for (let i = this.beginIndex; i < this.imgsArr.length; i++) {
        if (!this.imgBoxEls[i]) return;
        height = this.imgBoxEls[i].offsetHeight + this.gutter;
        if (i < this.cols) {
          this.colsHeightArr.push(height);
          top = 0;
          left = i * this.colWidth;
        } else {
          const minHeight = Math.min.apply(null, this.colsHeightArr); // 最低高度
          const minIndex = this.colsHeightArr.indexOf(minHeight); // 最低高度的索引
          // 设置元素定位的位置
          top = minHeight;
          left = minIndex * this.colWidth;
          // 更新colsHeightArr
          this.colsHeightArr[minIndex] = minHeight + height;
        }
        this.imgBoxEls[i].style.left = left + "px";
        this.imgBoxEls[i].style.top = top + "px";
      }
      this.beginIndex = this.imgsArr.length; // 排列完之后，新增图片从这个索引开始预加载图片和排列
    },
    // ==4== resize 响应式
    response() {
      const old = this.cols;
      this.cols = this.calcuCols();
      if (old === this.cols) return; // 列数不变直接退出
      this.beginIndex = 0; // 开始排列的元素索引
      this.waterfall();
    },
    reset() {
      this.imgsArr_c = [];
      this.beginIndex = 0;
      this.loadedCount = 0;
    }
  }
});
</script>

<style scoped lang="scss">
@import "../../styles/NoImgError";
.hxvue-waterfall {
  position: absolute;
  @keyframes show-card {
    0% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1);
    }
  }
  &__item {
    position: absolute;
    box-sizing: border-box;
    &:hover {
      box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5),
        0 0 40px rgba(0, 0, 0, 0.3) inset;
      .hxvue-waterfall__menu {
        display: flex;
        opacity: 0.7;
      }
    }
  }
  &__img-box {
    animation: show-card 0.4s;
    transition: left 0.6s, top 0.6s;
    transition-delay: 0.1s;
  }
  &__menu {
    display: none;
    justify-content: space-around;
    height: 28px;
    margin-top: -28px;
    background: #f4f6f7;
  }
  &__author {
    padding-top: 5px;
  }
  &__icon {
    display: flex;
    i {
      padding-top: 7px;
      font-size: 18px;
    }
    span {
      font-size: 12px;
      margin-left: 3px;
    }
  }
}
</style>
