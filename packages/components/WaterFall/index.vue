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
          @dblclick="imageClick(item, index)"
        />
      </div>
      <div :class="bemCss('menu')">
        <div
          :class="bemCss('author')"
          @click="authorClick ? authorClick(item, index) : ''"
        >
          <el-avatar :size="20" :src="item.authorUrl"></el-avatar>
        </div>
        <div v-for="n in 3" :key="n"></div>
        <div
          :class="bemCss('icon')"
          @click="iconLoveClick ? iconLoveClick(item, index) : ''"
        >
          <i :class="iconLove" :style="{ color: item.color || 'red' }"></i>
          <p>{{ item.likeNum }}</p>
        </div>
        <div
          :class="bemCss('icon')"
          @click="downLoadClick ? downLoadClick(item, index) : ''"
        >
          <i :class="iconDownLoad" :style="{ color: item.color || 'red' }"></i>
          <p>{{ item.downLoadNum }}</p>
        </div>
        <div
          :class="bemCss('icon')"
          @click="searchClick ? searchClick(item, index) : ''"
        >
          <i :class="iconSearch" :style="{ color: item.color || 'red' }"></i>
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
      iconLove: this.option.iconLove || "el-icon-star-off",
      iconDownLoad: this.option.iconDownLoad || "el-icon-download",
      iconSearch: this.option.iconSearch || "el-icon-search",
      authorClick: this.option.authorClick,
      iconLoveClick: this.option.iconLoveClick,
      downLoadClick: this.option.downLoadClick,
      searchClick: this.option.searchClick,
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
    }
  },
  mounted() {
    this.preload();
    this.cols = this.calcuCols();
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
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.response);
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
    imageClick(item, index) {
      if (this.preview) {
        this.$HxVueImagePreview(this.imgsArr, index);
      }
      this.$emit("image-click", item, index);
    },
    // ==1== 预加载
    preload() {
      if (this.imgsArr.length > this.loadedCount) {
        this.getLoadStatus(false);
      }
      this.imgsArr.forEach((imgItem, imgIndex) => {
        if (imgIndex < this.loadedCount) return; // 只对新加载图片进行预加载
        if (imgItem[this.srcKey]) {
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
      box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3),
        0 0 40px rgba(0, 0, 0, 0.1) inset;
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
  img:after {
    content: "";
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk1M0JCM0QwNkVFNDExRThCNTJCQUQ2RDFGQzg0NzIxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk1M0JCM0NGNkVFNDExRThCNTJCQUQ2RDFGQzg0NzIxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTYwRUMyMDE2RUUzMTFFOEJCRTU5RTFDODg1ODgwMjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTYwRUMyMDI2RUUzMTFFOEJCRTU5RTFDODg1ODgwMjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAQCwsLDAsQDAwQFw8NDxcbFBAQFBsfFxcXFxcfHhcaGhoaFx4eIyUnJSMeLy8zMy8vQEBAQEBAQEBAQEBAQEBAAREPDxETERUSEhUUERQRFBoUFhYUGiYaGhwaGiYwIx4eHh4jMCsuJycnLis1NTAwNTVAQD9AQEBAQEBAQEBAQED/wAARCACRAJEDASIAAhEBAxEB/8QAZQAAAwEBAQAAAAAAAAAAAAAAAAIDAQQHAQEAAAAAAAAAAAAAAAAAAAAAEAACAQMDBAEFAAMBAAAAAAAAAQIRMQMhQRJRYYEycZHBIkITsdFSYhEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9AAAAAMFnNQWt9kAwkssVbV9CTnKb10XQVtLSyAd5ZuzURW27yfhmX9RlDI+wD4Vf/ZVi41SKCdeNI3YEnOXJtOiBZZr/wBGcMi2Ft7AXjli76PoOcqael0Mpyg9NV0A6QEhNTWl90MBoAAAAAAGGiTlxjXfZAZkycdEqyI3q26sOrd92CTm6bbsA1boh1i3lqPGKiqIZAYklYHY0x6tIDY2B3NdjEBgNJ3NACTxbx0E1TozoYsoqSowI2o06MtjyctGqSItODptsw6NX2YHSaJCXKNd90OAAAAYznnLnJvZWK5pUjRXloiNdwCjk0l9S0YqKohcSpGrvLUcDUBLK23x23FWNtVSAuHch/KXQP5PoBdqq77GJ1XfczFVKjVBcuPk6rXqBQCH8n0D+UugFwZD+bV1oNif5OOzQDyipKjI0cW0/qXYmVVjVXjqAkZcHXZ3OhHNXcthlWNHeOjAoAABDLKs6bISlWl1Busm+42Jfm30At2BmI1gRy+3gpD1XwTy+3gpH1QDASyt8uKdFuJRw1iwOjdBKy+TIutGbK3kAAxtJNuwiywdmA7s/glj9/BV04unQli9l8AWDsBjAhSja6D4pUnTZmZV+afUVOkk+4HUBgAc0bD4v2+fsJGw+L9vn7AVQMEDAjl9vBSHqvgnl9vBSHqvgDJwbfJC8JPSlEO5wTo3qMnUDEqNGz0jXoD08BRSXyBB/m6u2xvFPQ1qjoDAVNxqv1ZuJUnT5BGw9/AFQYAwJZf1+fsJKw+X9fn7CSsB0AAAc7VG13GxP82uoZFSbezFWkkwOgGCBgRy15adDZTaioq7QZPfwZQDFFfPc2MnB0vE1AwCc+WituPjaS4kzU6agPkS9hEVeqJJU0AAh7+ACHv4AqAAwI5X+aXQVKrS7g3WTY2ONZp7IC9AAAJ5lWNf+dSV1XqdL1VGc8lxk47bAUxyqqO60GIpuL5LyuxZNNVVtmAmVfkpbbi1RYAI1QVRYAI1QJ1aRYzdAbJ8Y1I1RZggI1SNxL8uW1NCoAYxckqKiu9Bm0lV23ZFtyfJ+F2Ayyr0K4VSNf8ArUnFcpKO250LRUQABoAYLkhzXdWHMA5u26uNGXF9tx8uOusfYlbTcC6aaqrdTTnTlHVfQrHJF6PRsBwAAC5i9vg0xbgaAIAAxtJVduosskVotWiTcpav6ANKXJ9the27sF9NyuLHTWXsA2OHBd3cYDQAAAAAAAwSeNS1syhgHNRxdJfUK10ujoaTuJLCrp0Amm1Ztdhv6z3Sfkxwmu4leqoBT+1P1f8AkZy4469daEaopllRqPRAH9ZOyp5Fbbu2+xmuyGUJvsAtaaWQUcnSP1Kxwq7dR0krALDGo63Y4GgAAAAAAAAAAAAAAAAAshJ7AAGK6B3YABsNx4gADAAAAAAAAAAAAAf/2Q==);
    background-size: cover;
  }
  &__menu {
    display: none;
    justify-content: space-around;
    height: 28px;
    margin-top: -28px;
    background: #f4f6f7;
  }
  &__author {
    padding-top: 4px;
  }
  &__icon {
    display: flex;
    align-items: center;
    font-size: 10px;
    i {
      font-size: 18px;
    }
    p {
      margin-left: 5px;
    }
  }
}
</style>
