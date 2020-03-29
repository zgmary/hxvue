import Main from "./index.vue";
import { isVNode } from "../../core/vdom";
let instance;
let instances = [];
let seed = 1;
const ImagePreview = function(Vue) {
  let MessageConstructor = Vue.extend(Main);
  const obj = function(imageUrl) {
    let id = "imagePreview_" + seed++;
    let options = {
      imageUrl: imageUrl
    };
    let userOnClose = options.onClose;
    instance = new MessageConstructor({
      data: options
    });
    options.onClose = function() {
      obj.close(id, userOnClose);
    };
    instance.id = id;
    if (isVNode(instance.message)) {
      instance.$slots.default = [instance.message];
      instance.message = null;
    }
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    instance.dom = instance.vm.$el;
    instances.push(instance);
    return instance.vm;
  };
  obj.close = function(id, userOnClose) {
    for (let i = 0, len = instances.length; i < len; i++) {
      if (id === instances[i].id) {
        if (typeof userOnClose === "function") {
          userOnClose(instances[i]);
        }
        instances.splice(i, 1);
        break;
      }
    }
  };
  return obj;
};

export default ImagePreview;
