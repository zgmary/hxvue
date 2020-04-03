// 导入组件，组件必须声明 name
import HxvueTabs from "./index.vue";

// 为组件提供 install 安装方法，供按需引入
HxvueTabs.install = function(vue) {
  vue.component(HxvueTabs.name, HxvueTabs);
};

// 默认导出组件
export default HxvueTabs;
