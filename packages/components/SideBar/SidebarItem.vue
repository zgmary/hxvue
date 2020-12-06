<template>
  <div>
    <div v-for="item in menuData" :key="item.path">
      <el-submenu v-if="item.children" :index="item.path">
        <template slot="title">
          <i
            :class="item.icon"
            :style="{ fontSize: item.iconSize || '18px' }"
          ></i>
          <span slot="title" :style="{ fontSize: item.fontSize || '16px' }">{{
            item.label
          }}</span>
        </template>
        <sidebar-item :menuData="item.children"></sidebar-item>
      </el-submenu>

      <el-menu-item v-else :index="item.path" :class="{ 'is-active': item.flagActive || false }">
        <i
          :class="item.icon"
          :style="{ fontSize: item.iconSize || '18px' }"
        ></i>
        <span slot="title" :style="{ fontSize: item.fontSize || '16px' }">{{
          item.label
        }}</span>
      </el-menu-item>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    menuData: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped></style>
