// 导入组件，组件必须声明 name
import HxvueTable from "./index.vue";

// 为组件提供 install 安装方法，供按需引入
HxvueTable.install = function(vue) {
  vue.component(HxvueTable.name, HxvueTable);
};

// 默认导出组件
export default HxvueTable;
