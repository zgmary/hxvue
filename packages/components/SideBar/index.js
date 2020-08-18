// 导入组件，组件必须声明 name
import HxvueSideBar from "./index.vue";

// 为组件提供 install 安装方法，供按需引入
HxvueSideBar.install = function(vue) {
  vue.component(HxvueSideBar.name, HxvueSideBar);
};

// 默认导出组件
export default HxvueSideBar;
