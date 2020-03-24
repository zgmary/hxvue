// 导入组件，组件必须声明 name
import HxvueCardFlags from "./index.vue";

// 为组件提供 install 安装方法，供按需引入
HxvueCardFlags.install = function(vue) {
  vue.component(HxvueCardFlags.name, HxvueCardFlags);
};

// 默认导出组件
export default HxvueCardFlags;
