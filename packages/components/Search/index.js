// 导入组件，组件必须声明 name
import HxvueSearch from "./index.vue";

// 为组件提供 install 安装方法，供按需引入
HxvueSearch.install = function(vue) {
  vue.component(HxvueSearch.name, HxvueSearch);
};

// 默认导出组件
export default HxvueSearch;
