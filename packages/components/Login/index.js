// 导入组件，组件必须声明 name
import HxvueLogin from "./index.vue";

// 为组件提供 install 安装方法，供按需引入
HxvueLogin.install = function(vue) {
  vue.component(HxvueLogin.name, HxvueLogin);
};

// 默认导出组件
export default HxvueLogin;
