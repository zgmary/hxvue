<template>
  <div id="app">
    <!--    <img alt="Vue logo" src="./assets/logo.png" />-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App" />-->
    <hxvue-login :option="option"></hxvue-login>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      option: {
        width: 400,
        time: 60,
        codeType: "phone", //phone为手机验证码/img为图片验证码
        column: {
          userName: {
            // hide: true,
            label: "用户名",
            tip: "改变字段y4ey4为user",
            // prop: 'user',
            // placeholder:'',
            autocomplete: "off",
            rules: { required: true, message: "请输入用户名", trigger: "blur" }
          },
          password: {
            label: "密码",
            // prop: 'pass',
            // placeholder:'',
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
    this.$HxVueLog.capsule(
      "ERROR",
      "标题：提示",
      "内容：日志信息输出！",
      "primary"
    );
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
