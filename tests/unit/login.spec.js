import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Login from "components/Login/index.vue";

Vue.use(ElementUI);

describe("login.vue", () => {
  it("renders props.option when passed", () => {
    // 进行传入数据准备
    const option = {
      width: 400,
      time: 60,
      codeType: "phone", //phone为手机验证码/img为图片验证码
      column: {
        userName: {
          label: "用户名",
          tip: "请输入用户名",
          autocomplete: "off",
          prop: "user",
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
    // 挂载组件
    const wrapper = mount(Login, {
      propsData: { option }
    });
    // 判断HTML页面内容的存在
    expect(wrapper.text()).to.include("用户名");
    expect(wrapper.text()).to.include("密码");
    // 进行组件内数据赋值
    wrapper.vm.formData.userName = "userNameTest";
    wrapper.vm.formData.password = "passwordTest";
    wrapper.vm.formData.code = "codeTest";
    // 进行事件触发
    wrapper.find(".onSubmit").trigger("click");
    // 判断事件触发后的返回值判断
    expect(wrapper.emitted().submit).to.eql([
      [
        {
          user: "userNameTest",
          password: "passwordTest",
          code: "codeTest"
        }
      ]
    ]);
    // 检查属性
    expect(wrapper.find(".login").attributes("style")).to.equal(
      "width: 400px;"
    );
    // 在设定判断信息时，可以先日志输出确认输出无误后再行用断言判断，在测试用例全部通过后该语句可以删除
    console.log(wrapper.find(".login").attributes("style"));
  });
});
