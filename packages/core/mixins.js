/**
 * 采用混入方式组织组件公用代码
 * @author  hx
 * @date    2019/10/07
 */
export const mixins = {
  data() {
    return {
      tips: "I Is Components mixin!"
    };
  },
  methods: {
    setPx(value) {
      if (!value) return "";
      value = value + "";
      if (value.indexOf("%") === -1) {
        value = value + "px";
      }
      return value;
    }
  }
};
