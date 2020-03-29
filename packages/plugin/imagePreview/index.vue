<template>
  <div :class="bemCss()" v-show="isShowImage" @click="isShowImage = false">
    <div :class="bemCss('mask')"></div>
    <div
      :class="bemCss('box')"
      :style="previewStyle"
      v-loading="changeing"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)"
    >
      <img ref="img" hidden :src="imageUrl" />
      <el-image
        :src="imageUrl"
        v-show="!changeing"
        @load="initStyle"
      ></el-image>
    </div>
  </div>
</template>
<script>
import create from "../../core/create";
export default create({
  name: "image-preview",
  data() {
    return {
      isShowImage: true,
      imageUrl: "",
      onClose: null,
      changeing: true,
      width: 200,
      height: 200
    };
  },
  watch: {
    isShowImage: function() {
      if (!this.isShowImage) {
        this.close();
        this.width = 200;
        this.height = 200;
      }
    }
  },
  mounted() {},
  computed: {
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
  transition: all 0.5s;
  z-index: 9999;
  &__mask {
    @include display(absolute);
    background: rgba(0, 0, 0, 0.2);
    z-index: -1;
  }
  &__box {
    padding: 5px;
    margin: 50px auto;
    border-radius: 4px;
    background-color: #fff;
  }
}
</style>
