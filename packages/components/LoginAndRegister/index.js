// 导入组件，组件必须声明 name
import HxvueLoginAndRegister from "./index.vue";

// 为组件提供 install 安装方法，供按需引入
HxvueLoginAndRegister.install = function(vue) {
  vue.component(HxvueLoginAndRegister.name, HxvueLoginAndRegister);
};

// 默认导出组件
export default HxvueLoginAndRegister;
