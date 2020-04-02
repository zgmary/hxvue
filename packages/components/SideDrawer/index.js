// 导入组件，组件必须声明 name
import HxvueSideDrawer from "./index.vue";

// 为组件提供 install 安装方法，供按需引入
HxvueSideDrawer.install = function(vue) {
  vue.component(HxvueSideDrawer.name, HxvueSideDrawer);
};

// 默认导出组件
export default HxvueSideDrawer;
