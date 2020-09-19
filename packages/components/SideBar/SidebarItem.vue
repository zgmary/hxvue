<template>
  <div>
    <div v-for="item in menuData" :key="item.id">
      <el-submenu v-if="item.node" :index="item.id">
        <template slot="title">
          <i
            :class="item.icon"
            :style="{ fontSize: item.iconSize || '18px' }"
          ></i>
          <span slot="title" :style="{ fontSize: item.fontSize || '16px' }">{{
            item.menu_name
          }}</span>
        </template>
        <sidebar-item :menuData="item.node"></sidebar-item>
      </el-submenu>

      <el-menu-item v-else :index="item.id">
        <i
          :class="item.icon"
          :style="{ fontSize: item.iconSize || '18px' }"
        ></i>
        <span slot="title" :style="{ fontSize: item.fontSize || '16px' }">{{
          item.menu_name
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
