import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Login from "components/login/index.vue";

Vue.use(ElementUI);

describe("login.vue", () => {
  it("renders props.msg when passed", () => {
    const option = {
      width: 400,
      time: 60,
      codeType: "phone", //phone为手机验证码/img为图片验证码
      column: {
        userName: {
          label: "用户名",
          tip: "请输入用户名",
          autocomplete: "off",
          rules: { required: true, message: "请输入用户名", trigger: "blur" }
        },
        password: {
          label: "密码",
          autocomplete: "off",
          rules: { required: true, message: "请输入密码", trigger: "blur" }
        },
        code: {
          hide: true
        }
      }
    };
    const wrapper = shallowMount(Login, {
      propsData: { option }
    });
    // expect(wrapper.text()).to.include(msg);
  });
});
