// 导入组件，组件必须声明 name
import HxvueCardFlag from "./index.vue";

// 为组件提供 install 安装方法，供按需引入
HxvueCardFlag.install = function(vue) {
  vue.component(HxvueCardFlag.name, HxvueCardFlag);
};

// 默认导出组件
export default HxvueCardFlag;
