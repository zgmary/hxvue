// 导入组件，组件必须声明 name
import HxvueDataCard from "./index.vue";

// 为组件提供 install 安装方法，供按需引入
HxvueDataCard.install = function(vue) {
  vue.component(HxvueDataCard.name, HxvueDataCard);
};

// 默认导出组件
export default HxvueDataCard;
