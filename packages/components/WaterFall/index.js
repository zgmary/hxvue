// 导入组件，组件必须声明 name
import HxvueWaterFall from "./index.vue";

// 为组件提供 install 安装方法，供按需引入
HxvueWaterFall.install = function(vue) {
  vue.component(HxvueWaterFall.name, HxvueWaterFall);
};

// 默认导出组件
export default HxvueWaterFall;
