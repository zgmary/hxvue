<template>
  <div :class="bemCss()">
    <el-scrollbar :class="scrollbarWrapperClass">
      <el-menu
        mode="vertical"
        :background-color="backgroundColor"
        :text-color="textColor"
        :active-text-color="activeTextColor"
        :collapse="isCollapse"
        :default-active="defaultActive"
        @select="menuClick"
        :class="bemCss('el-menu')"
        :style="elMenuStyle"
      >
        <sidebar-item :menuData="menuData"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import create from "../../core/create";
import SidebarItem from "./SidebarItem";

export default create({
  name: "side-bar",
  components: {
    SidebarItem
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    },
    menuData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    backgroundColor() {
      return this.option.backgroundColor || "#304156";
    },
    textColor() {
      return this.option.textColor || "#fff";
    },
    activeTextColor() {
      return this.option.activeTextColor || "#ffd04b";
    },
    isCollapse() {
      return this.option.isCollapse || false;
    },
    elMenuStyle() {
      return this.option.elMenuStyle || { height: "100%" };
    },
    scrollbarWrapperClass() {
      return this.option.scrollbarWrapperClass || "elScrollbarClass";
    },
    defaultActive() {
      return this.option.defaultActive || "";
    }
  },
  methods: {
    menuClick(index, indexPath) {
      this.$emit("menu-click", index, indexPath);
    }
  }
});
</script>

<style scoped lang="scss">
.hxvue-side-bar {
  &__el-menu {
    &:not(.el-menu--collapse) {
      //默认值为200px
      width: var(--SidebarWidth);
    }
  }
  .elScrollbarClass {
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
  >>> .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  >>> .el-scrollbar__view {
    height: 100%;
  }
  /*隐藏文字*/
  >>> .el-menu--collapse .el-submenu__title span {
    display: none;
  }
  /*隐藏 > */
  >>> .el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }
}
</style>
