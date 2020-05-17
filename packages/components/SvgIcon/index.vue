<template>
  <svg :class="this.svgClass" aria-hidden="true">
    <use :xlink:href="this.iconRealName" />
  </svg>
</template>

<script>
import create from "../../core/create";
export default create({
  name: "svg-icon",
  props: {
    iconName: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ""
    }
  },
  computed: {
    iconRealName() {
      return `#icon-${this.iconName}`;
    },
    svgClass() {
      return this.className || "svg-icon";
    }
  }
});
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
