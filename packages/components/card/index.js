// 导入组件，组件必须声明 name
import HxvueCard from "./index.vue";

// 为组件提供 install 安装方法，供按需引入
HxvueCard.install = function(vue) {
  vue.component(HxvueCard.name, HxvueCard);
};

// 默认导出组件
export default HxvueCard;
