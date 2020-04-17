<template>
  <div :class="bemCss()" v-show="isShowImage" @click="isShowImage = false">
    <div :class="bemCss('mask')"></div>
    <i
      class="el-icon-arrow-left"
      v-show="isShowLeft"
      @click.capture.stop="previousImage"
    ></i>
    <div
      :class="bemCss('box')"
      :style="previewStyle"
      v-loading="changeing"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)"
    >
      <img ref="img" hidden :src="datas[index].imgUrl" />
      <el-image
        :src="datas[index].imgUrl"
        v-show="!changeing"
        @load="initStyle"
      ></el-image>
    </div>
    <i
      class="el-icon-arrow-right"
      v-show="isShowRight"
      @click.capture.stop="nextImage"
    ></i>
  </div>
</template>
<script>
import create from "../../core/create";
export default create({
  name: "image-preview",
  data() {
    return {
      isShowImage: true,
      datas: [],
      index: 0,
      onClose: null,
      changeing: true,
      width: 200,
      height: 200,
      isShowRight: true,
      isShowLeft: true
    };
  },
  watch: {
    isShowImage: function() {
      if (!this.isShowImage) {
        this.close();
        this.width = 200;
        this.height = 200;
      }
    },
    index: function() {
      this.isShowLeft = 0 !== this.index;
      this.isShowRight = this.maxIndex !== this.index;
    }
  },
  mounted() {
    this.isShowLeft = 0 !== this.index;
    this.isShowRight = this.datas.length - 1 !== this.index;
  },
  computed: {
    maxIndex: function() {
      return this.datas.length - 1;
    },
    previewStyle: function() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    }
  },
  methods: {
    initStyle() {
      this.width = this.$refs.img.width;
      this.height = this.$refs.img.height;
      this.changeing = false;
    },
    close() {
      if (typeof this.onClose === "function") {
        this.onClose(this);
        this.$destroy(); //自我摧毁
        this.$el.parentNode.removeChild(this.$el); //移除dom节点
      }
    },
    previousImage() {
      if (this.index > 0) {
        this.changeing = true;
        this.index--;
      }
    },
    nextImage() {
      if (this.index < this.maxIndex) {
        this.changeing = true;
        this.index++;
      }
    }
  }
});
</script>
<style scoped lang="scss">
@mixin display($position: fixed) {
  position: $position;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.hxvue-image-preview {
  @include display;
  display: flex;
  align-items: center;
  z-index: 2000;
  i {
    font-size: 48px;
    border-radius: 48px;
    color: white;
    background-color: #d3d5d6;
  }
  i:hover {
    color: red;
    background-color: white;
  }
  .el-icon-arrow-left {
    margin-left: 20px;
  }
  .el-icon-arrow-right {
    margin-right: 20px;
  }
  &__mask {
    @include display(absolute);
    background: rgba(0, 0, 0, 0.4);
    z-index: -1;
  }
  &__box {
    margin: 0 auto;
    background-color: #fff;
  }
}
</style>
