// 导入组件，组件必须声明 name
import HxvueSvgIcon from "./index.vue";

// 为组件提供 install 安装方法，供按需引入
HxvueSvgIcon.install = function(vue) {
  vue.component(HxvueSvgIcon.name, HxvueSvgIcon);
};

// 默认导出组件
export default HxvueSvgIcon;
