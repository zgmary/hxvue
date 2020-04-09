<template>
  <div class="card">
    <el-row :span="24" :gutter="gutter">
      <el-col
        :md="cardSpan"
        :xs="12"
        :sm="8"
        v-for="(item, index) in this.cardData"
        :key="index"
      >
        <div class="card-item">
          <div class="card-image" :style="{ height: setPx(imgHeight) }">
            <img
              :src="item.thumbUrl"
              :height="setPx(imgHeight)"
              width="100%"
              :object-fit="fitModel"
              loading="lazy"
              alt="图像获取失败！"
              @dblclick="imageClick(item, index)"
            />
          </div>
          <div class="card-menu">
            <div
              class="card-menu-author"
              @click="authorClick ? authorClick(item, index) : ''"
            >
              <el-avatar :size="20" :src="item.authorUrl"></el-avatar>
            </div>
            <div v-for="n in 3" :key="n"></div>
            <div
              class="card-menu-icon"
              @click="iconLoveClick ? iconLoveClick(item, index) : ''"
            >
              <i :class="iconLove" :style="{ color: item.color || 'red' }"></i>
              <p>{{ item.likeNum }}</p>
            </div>
            <div
              class="card-menu-icon"
              @click="downLoadClick ? downLoadClick(item, index) : ''"
            >
              <i
                :class="iconDownLoad"
                :style="{ color: item.color || 'red' }"
              ></i>
              <p>{{ item.downLoadNum }}</p>
            </div>
            <div
              class="card-menu-icon"
              @click="searchClick ? searchClick(item, index) : ''"
            >
              <i
                :class="iconSearch"
                :style="{ color: item.color || 'red' }"
              ></i>
            </div>
          </div>
          <el-image-viewer
            v-if="showViewer"
            :on-close="closeViewer"
            :url-list="[srcUrl]"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from "../../core/create";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
export default create({
  name: "cardimg",
  components: { ElImageViewer },
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      gutter: this.option.gutter || 6,
      cardSpan: this.option.cardSpan || 4,
      imgHeight: this.option.imgHeight || 200,
      fitModel: this.option.fitModel || "fill",
      iconLove: this.option.iconLove || "el-icon-star-off",
      iconDownLoad: this.option.iconDownLoad || "el-icon-download",
      iconSearch: this.option.iconSearch || "el-icon-search",
      authorClick: this.option.authorClick,
      iconLoveClick: this.option.iconLoveClick,
      downLoadClick: this.option.downLoadClick,
      searchClick: this.option.searchClick,
      showViewer: false,
      srcUrl: ""
    };
  },
  computed: {
    preview: function() {
      return this.option.preview || false;
    },
    cardData: function() {
      return this.option.data || [];
    }
  },
  methods: {
    imageClick(item, index) {
      if (this.preview) {
        this.srcUrl = item.imgUrl;
        this.showViewer = true;
      }
      this.$emit("image-click", item, index);
    },
    closeViewer() {
      this.showViewer = false;
    }
  }
});
</script>

<style scoped lang="scss">
.card {
  &-item {
    >>> .el-image-viewer__mask {
      background: rgba(0, 0, 0, 0.05);
    }
    margin-bottom: 6px;
    background-color: #fff;
    box-sizing: border-box;
    &:hover {
      box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3),
        0 0 40px rgba(0, 0, 0, 0.1) inset;
      .card-menu {
        display: flex;
        opacity: 0.7;
      }
    }
  }
  &-menu {
    display: none;
    justify-content: space-around;
    height: 28px;
    margin-top: -28px;
    background: #f4f6f7;
    position: relative;
    z-index: 100;
    &-author {
      padding-top: 4px;
    }
    &-icon {
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
}
</style>
