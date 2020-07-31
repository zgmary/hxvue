// 导入组件，组件必须声明 name
import HxvueFilterDrawer from "./index.vue";

// 为组件提供 install 安装方法，供按需引入
HxvueFilterDrawer.install = function(vue) {
  vue.component(HxvueFilterDrawer.name, HxvueFilterDrawer);
};

// 默认导出组件
export default HxvueFilterDrawer;
