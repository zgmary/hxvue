<template>
  <div :class="bemCss()">
    <!--遮蔽层-->
    <transition name="mask-fade">
      <div
        v-if="visible"
        :class="bemCss('mask')"
        @click.self="handleClose"
      ></div>
    </transition>
    <div
      :class="bemCss('bg')"
      :style="{ right: visible ? drawerWidth : '0px' }"
    ></div>
    <div
      :class="bemCss('btnGroup')"
      :style="{ right: visible ? drawerWidth : '0px' }"
    >
      <div
        :class="bemCss('btn')"
        @mouseover="item.btnText = item.tips"
        @mouseout="item.btnText = ''"
        v-for="(item, index) in this.btnInfo"
        :key="index"
      >
        <el-button type="info" size="mini" @click="btnHandleClose(item)">
          {{ item.btnText }}
          <i :class="item.iconClass || 'el-icon-setting'"></i>
        </el-button>
      </div>
    </div>
    <!--抽屉部分-->
    <transition name="drawer-fade">
      <div
        :class="bemCss('wrapper')"
        v-if="visible"
        :style="{
          width: drawerWidth,
          backgroundColor: this.option.backgroundColor || '#f4f4f4'
        }"
        ref="drawer"
      >
        <slot :name="slotName"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import create from "../../core/create";

export default create({
  name: "side-drawer",
  data() {
    return {
      visible: false,
      slotName: "",
      beforeCloseClick: this.option.beforeCloseClick
    };
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    drawerWidth: function() {
      return this.option.drawerWidth || "20%";
    },
    btnInfo: function() {
      return this.option.btnInfo || [];
    }
  },
  methods: {
    open() {
      this.visible = true;
      this.$emit("open");
    },
    hide() {
      this.visible = false;
    },
    btnHandleClose(item) {
      if (this.visible) {
        this.handleClose();
      } else {
        this.slotName = item.slotName;
        this.open();
      }
    },
    handleClose() {
      if (typeof this.beforeCloseClick === "function") {
        this.beforeCloseClick(this.hide);
      } else {
        this.hide();
      }
    }
  }
});
</script>

<style scoped lang="scss">
$bg-color: #909399;
$transform-time: 0.5s;
@import "../../styles/PositionInfo";
@import "../../styles/Transform";
.hxvue-side-drawer {
  &__mask {
    @include positionInfo;
    background-color: rgba(55, 55, 55, 0.6);
  }
  &__bg {
    @include positionInfo(0%, NULL, 0%, 5px, 100%);
    background-color: $bg-color;
    transition: right $transform-time;
  }
  &__btnGroup {
    @include positionInfo(50%, NULL, 0%, NULL, NULL);
    transform: translate(0, -50%);
    transition: right $transform-time;
  }
  &__btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
  }
  &__wrapper {
    @include positionInfo(0%, NULL, 0%, 0%, 100%);
  }
}
.drawer-fade-enter-active {
  animation: drawer-fade-in $transform-time;
}
.drawer-fade-leave-active {
  animation: drawer-fade-out $transform-time;
}
@keyframes drawer-fade-in {
  @include transform(100%, 0);
}
@keyframes drawer-fade-out {
  @include transform(0, 100%);
}
.mask-fade-enter-active {
  animation: mask-fade-in $transform-time;
}
.mask-fade-leave-active {
  animation: mask-fade-out $transform-time;
}
@keyframes mask-fade-in {
  @include opacity(0, 1);
}
@keyframes mask-fade-out {
  @include opacity(1, 0);
}
</style>
