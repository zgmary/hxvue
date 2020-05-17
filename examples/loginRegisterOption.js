// eslint-disable-next-line no-undef
option = {
  type: "register",
  title: "注册",
  logoUrl: "",
  logoInfo: "",
  href: "https://www.baidu.com/",
  codeSrc: "",
  data: {
    userName: {
      tip: "请输入您的手机号",
      icon: "el-icon-user",
      placeholder: "请输入您的手机号",
      rules: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        {
          pattern: /^1[0-9]{10}$/,
          message: "请输入正确的手机号",
          trigger: "blur"
        }
      ]
    },
    password: {
      tip: "请输入密码",
      icon: "el-icon-unlock",
      placeholder: "请输入密码",
      rules: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, message: "密码最少是6位", trigger: "blur" }
      ]
    },
    code: {
      tip: "请输入验证码",
      icon: "el-icon-c-scale-to-original",
      placeholder: "请输入验证码",
      rules: { required: true, message: "请输入合法的验证码", trigger: "blur" }
    },
    checked: {
      rules: {
        validator: (rule, value, callback) => {
          if (value === false) {
            callback(new Error("请勾选协议"));
          } else {
            callback();
          }
        }
      }
    }
  },
  beforeCloseClick(hide) {
    this.$message.success("CLOSE SUCCESS!");
    hide();
  }
};
