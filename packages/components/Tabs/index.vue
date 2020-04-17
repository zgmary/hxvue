<template>
  <div :class="bemCss()">
    <div :class="bemCss('tabs')">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in this.tabsData"
          :key="index"
          :name="item.tabName"
        >
          <span slot="label">
            <i :class="item.iconClass ? item.iconClass : ''"></i>
            {{ item.labelName }}
          </span>
        </el-tab-pane>
      </el-tabs>
      <div :class="bemCss('control')" v-if="isSwitch">
        <div
          :class="bemCss('switch')"
          v-for="(item, index) in switchControl"
          :key="index"
        >
          <el-switch
            v-model="item.value"
            :active-text="item.label"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="switchClick"
          ></el-switch>
        </div>
      </div>
      <div :class="bemCss('control')" v-if="isIcon">
        <div
          :class="bemCss('icon')"
          v-for="(item, index) in iconControl"
          :key="index"
        >
          <i :class="item.icon" @click="iconClick(item.name)"></i>
        </div>
      </div>
    </div>
    <slot :componentName="this.activeName"></slot>
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
    },
    controlData: function() {
      return this.option.controlData || [];
    },
    switchControl: function() {
      return this.controlData.switchControl || [];
    },
    iconControl: function() {
      return this.controlData.iconControl || [];
    },
    isSwitch: function() {
      return this.controlData.type === "switch";
    },
    isIcon: function() {
      return this.controlData.type === "icon";
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
    },
    switchClick(val) {
      this.$emit("switch-click", val);
    },
    iconClick(name) {
      this.$emit("icon-click", name);
    }
  }
});
</script>

<style scoped lang="scss">
$theme-color: #ff0000;
.hxvue-tabs {
  &__tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  &__control {
    display: flex;
  }
  &__switch {
    margin-right: 20px;
  }
  &__icon {
    margin-right: 20px;
    font-size: 24px;
    color: rgb(0, 0, 0, 0.6);
  }
}
</style>
