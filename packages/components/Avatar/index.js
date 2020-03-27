// 导入组件，组件必须声明 name
import HxvueAvatar from "./index.vue";

// 为组件提供 install 安装方法，供按需引入
HxvueAvatar.install = function(vue) {
  vue.component(HxvueAvatar.name, HxvueAvatar);
};

// 默认导出组件
export default HxvueAvatar;
