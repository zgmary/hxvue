<template>
  <span :class="[bemCss(), sizeCls, bemCss('icon')]" :style="sizeStyle">
    <img v-if="src" :class="bemCss('images')" :src="src" alt="" />
    <i :class="icon" v-else-if="icon"></i>
    <span
      v-else
      :class="bemCss('string')"
      :style="sizeChildrenStyle"
      ref="avatarChildren"
    >
      <slot></slot>
    </span>
  </span>
</template>
<script>
import create from "../../core/create";
const prefixCls = "hxvue-avatar";
export default create({
  name: "avatar",
  props: {
    src: String,
    shape: {
      type: String,
      validator: val => ["circle", "square"].includes(val),
      default: "circle"
    },
    size: {
      validator: val => {
        return (
          typeof val === "number" || ["small", "large", "default"].includes(val)
        );
      },
      default: "default"
    },
    icon: String
  },
  data() {
    return {
      scale: 1
    };
  },
  computed: {
    sizeChildrenStyle: function() {
      const transformString = `scale(${this.scale}) translateX(-50%)`;
      let childrenStyle = {
        msTransform: transformString,
        WebkitTransform: transformString,
        transform: transformString
      };
      if (typeof size === "number") {
        childrenStyle.lineHeight = `${this.size}px`;
      }
      return childrenStyle;
    },
    sizeCls: function() {
      return {
        [`${prefixCls}--${this.shape}`]: this.shape,
        [`${prefixCls}--lg`]: this.size === "large",
        [`${prefixCls}--sm`]: this.size === "small"
      };
    },
    sizeStyle: function() {
      return typeof this.size === "number"
        ? {
            width: `${this.size}px`,
            height: `${this.size}px`,
            lineHeight: `${this.size}px`,
            fontSize: this.icon ? `${this.size / 2}px` : "18px"
          }
        : {};
    }
  },
  updated() {
    this.$nextTick(() => {
      this.setScale();
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.setScale();
    });
  },
  methods: {
    setScale() {
      const childrenNode = this.$refs.avatarChildren;
      if (childrenNode) {
        const childrenWidth = childrenNode.offsetWidth;
        const avatarWidth = this.$el.getBoundingClientRect().width;
        if (avatarWidth - 8 < childrenWidth) {
          this.scale = (avatarWidth - 8) / childrenWidth;
        } else {
          this.scale = 1;
        }
      }
    }
  }
});
</script>
<style scoped lang="scss">
@mixin display($size: 40px, $fontSize: 24px) {
  width: $size;
  height: $size;
  line-height: $size;
  border-radius: 50%;
  font-size: $fontSize;
}
.hxvue-avatar {
  @include display(32px, 14px);
  font-variant: tabular-nums;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  display: inline-block;
  text-align: center;
  background: #ccc;
  color: #fff;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  &__images {
    width: 100%;
    height: 100%;
  }
  &__icon {
    font-size: 18px;
  }
  &__string {
    position: absolute;
    left: 50%;
    transform-origin: 0 center;
  }
  &--lg {
    @include display;
  }
  &--sm {
    @include display(24px, 14px);
  }
  &--square {
    border-radius: 4px;
  }
}
</style>
