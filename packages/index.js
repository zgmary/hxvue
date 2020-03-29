import Login from "./components/Login";
import CardText from "./components/CardText";
import CardImg from "./components/CardImage";
import CardFlag from "./components/CardFlag";
import TextEllipsis from "./components/TextEllipsis";
import SvgIcon from "./components/SvgIcon";
import Avatar from "./components/Avatar";

// 组件版本号
const $HxVueVersion = "Ver 0.1.4";
import $HxVueLog from "./plugin/logs/";
import { $HxVueWatermark } from "./plugin/canvas/";
import $HxVueImagePreview from "./plugin/imagePreview/";
// 存储组件列表
const components = [
  Login,
  CardText,
  CardImg,
  CardFlag,
  TextEllipsis,
  SvgIcon,
  Avatar
];

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
  vue.prototype.$HxVueImagePreview = $HxVueImagePreview(vue);
};

// 判断是否是直接引入文件
if (window && window.Vue) install(window.Vue);

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  components
};
