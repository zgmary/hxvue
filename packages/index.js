import HelloWord from "./components/helloword";
import Login from "./components/login";
import $HxVueLog from "./plugin/logs/";
import { $HxVueWatermark } from "./plugin/canvas/";
// 存储组件列表
const components = [HelloWord, Login];
// 组件版本号
const $HxVueVersion = "Ver 0.1.0";
// 定义全局的API
let prototypes = {
  $HxVueVersion,
  $HxVueLog,
  $HxVueWatermark
};

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = vue => {
  components.map(component => {
    vue.component(component.name, component);
  });
  Object.keys(prototypes).forEach(key => {
    vue.prototype[key] = prototypes[key];
  });
};

// 判断是否是直接引入文件
if (window && window.Vue) install(window.Vue);

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  HelloWord,
  Login
};
