// eslint-disable-next-line no-undef
baseLoginOption = {
  width: 400,
  time: 60,
  codeType: "phone", //phone为手机验证码/img为图片验证码
  codeSrc: "",
  column: {
    userName: {
      label: "用户名",
      tip: "请输入用户名",
      placeholder: "手机号/邮箱/用户名",
      autocomplete: "on",
      rules: { required: true, message: "请输入用户名", trigger: "blur" }
    },
    password: {
      hide: false,
      label: "密码",
      tip: "请输入密码",
      autocomplete: "on",
      rules: { required: true, message: "请输入密码", trigger: "blur" }
    },
    code: {
      hide: true,
      label: "验证码",
      tip: "点击图片可以刷新验证码",
      autocomplete: "off",
      rules: { required: true, message: "请输验证码", trigger: "blur" }
    }
  }
};
