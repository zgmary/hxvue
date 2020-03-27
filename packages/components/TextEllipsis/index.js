// 导入组件，组件必须声明 name
import HxvueTextEllipsis from "./index.vue";

// 为组件提供 install 安装方法，供按需引入
HxvueTextEllipsis.install = function(vue) {
  vue.component(HxvueTextEllipsis.name, HxvueTextEllipsis);
};

// 默认导出组件
export default HxvueTextEllipsis;
