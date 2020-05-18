<template>
  <div id="app">
    <!--    <img alt="Vue logo" src="./assets/logo.png" />-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App" />-->
    <h3>SVG Sprite使用示意</h3>
    <hr />
    <hxvue-svg-icon icon-name="lock" :style="iconStyle"></hxvue-svg-icon>
    <hr />
    <hxvue-login :option="option"></hxvue-login>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      iconStyle: {
        margin: "16px",
        fill: "red",
        width: "2em",
        height: "2em"
      },
      option: {
        width: 400,
        time: 60,
        codeType: "phone", //phone为手机验证码/img为图片验证码
        column: {
          userName: {
            label: "用户名",
            tip: "改变字段为user",
            prop: "user",
            placeholder: "请输入用户名",
            autocomplete: "off",
            rules: { required: true, message: "请输入用户名", trigger: "blur" }
          },
          password: {
            label: "密码",
            placeholder: "请输入密码",
            autocomplete: "off",
            rules: { required: true, message: "请输入密码", trigger: "blur" }
          },
          code: {
            hide: true
          }
        }
      }
    };
  },
  components: {},
  created() {
    // 注意：缺省情况下日志输出等级为ERROR,要修改请执行函数this.$HxVueLog.setLevel("DEBUG")
    this.$HxVueLog.capsule("ERROR", "标题：提示", "内容：日志信息输出！", "primary");
    this.$HxVueWatermark({ text: "组件版本：" + this.$HxVueVersion });
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
