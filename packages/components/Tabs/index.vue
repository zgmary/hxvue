<template>
  <div :class="bemCss('tabs')">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in this.tabsData"
        :key="index"
        :name="item.tabName"
      >
        <span slot="label"
          ><i :class="item.iconClass ? item.iconClass : ''"></i>
          {{ item.labelName }}</span
        >
        <slot :item="item"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import create from "../../core/create";

export default create({
  name: "tabs",
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      activeName: this.option.tabsData[0].tabName || ""
    };
  },
  computed: {
    tabsData: function() {
      return this.option.tabsData || [];
    }
  },
  watch: {
    tabsData: function() {
      this.activeName = this.option.tabsData[0].tabName || "";
      this.tabClick(this.activeName);
    }
  },
  mounted: function() {
    this.tabClick(this.activeName);
  },
  methods: {
    tabClick(tabName) {
      this.$emit("tab-click", tabName);
    },
    handleClick(tab) {
      this.tabClick(tab.paneName);
    }
  }
});
</script>

<style scoped lang="scss">
$theme-color: #ff0000;
.hxvue-tabs {
  &__tabs {
    >>> .el-tabs {
      &__item {
        font-size: 16px;
        color: rgb(0, 0, 0);
        &.is-active,
        &:hover {
          color: $theme-color;
        }
      }
      &__active-bar {
        background-color: $theme-color;
      }
      &__nav {
        &-wrap {
          &::after {
            height: 0px;
          }
        }
      }
    }
  }
}
</style>
