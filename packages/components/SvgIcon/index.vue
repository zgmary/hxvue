<template>
  <svg :style="this.style" aria-hidden="true">
    <use :xlink:href="this.iconName" />
  </svg>
</template>

<script>
import create from "../../core/create";
const iconStyleDefault = {
  width: "1em",
  height: "1em",
  verticalAlign: "-0.15em",
  fill: "currentColor",
  overflow: "hidden"
};
export default create({
  name: "svg-icon",
  props: {
    iconClass: {
      type: String,
      required: true
    },
    style: {
      type: Object,
      default: () => {
        return iconStyleDefault;
      }
    }
  },
  data() {
    return {
      iconName: `#${this.iconClass}`
    };
  }
});
</script>
