// 导入组件，组件必须声明 name
import HxvueVideo from "./index.vue";

// 为组件提供 install 安装方法，供按需引入
HxvueVideo.install = function(vue) {
  vue.component(HxvueVideo.name, HxvueVideo);
};

// 默认导出组件
export default HxvueVideo;
