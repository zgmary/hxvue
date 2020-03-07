// 导入组件，组件必须声明 name
import HelloWord from "./index.vue";

// 为组件提供 install 安装方法，供按需引入
HelloWord.install = function(vue) {
  vue.component(HelloWord.name, HelloWord);
};

// 默认导出组件
export default HelloWord;
