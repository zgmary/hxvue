<template>
  <div :class="bemCss()" v-if="visible">
    <!--遮蔽层-->
    <div :class="bemCss('mask')"></div>
    <div :class="bemCss('card')">
      <div :class="bemCss('catalogue')">
        <div :class="bemCss('time')">{{ time }}</div>
        <slot name="logo">
          <img :class="bemCss('logo')" :src="this.logoUrl" alt="图像获取失败" />
        </slot>
        <div :class="bemCss('info')">{{ option.logoInfo }}</div>
      </div>
      <div :class="bemCss('content')">
        <!--关闭按钮-->
        <div :class="bemCss('close')" @click="handleClose">
          <i class="el-icon-close"></i>
        </div>
        <div :class="bemCss('title')">{{ title }}</div>

        <el-form :class="bemCss('form')" :model="form" ref="form" status-icon>
          <el-form-item :rules="userName.rules" prop="userName">
            <el-tooltip
              :content="userName.tip || '请输入用户名'"
              :disabled="this.userName.tip === undefined"
              placement="top-start"
            >
              <!--form.username中的username只是键名-->
              <el-input
                v-model="form.userName"
                :prefix-icon="userName.icon || 'el-icon-user'"
                :placeholder="userName.placeholder || '请输入用户名'"
                :autocomplete="this.userName.autocomplete"
              >
              </el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item :rules="password.rules" prop="password">
            <el-tooltip
              :content="password.tip || '请输入密码'"
              :disabled="this.password.tip === undefined"
              placement="top-start"
            >
              <el-input
                type="password"
                v-model="form.password"
                :prefix-icon="password.icon || 'el-icon-unlock'"
                :placeholder="password.placeholder || '请输入密码'"
                show-password
              >
              </el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item :rules="code.rules" prop="code">
            <el-tooltip
              :content="code.tip || '请输入验证码'"
              :disabled="this.code.tip === undefined"
              placement="top-start"
            >
              <el-input
                :class="bemCss('append')"
                v-model="form.code"
                :prefix-icon="code.icon || 'el-icon-c-scale-to-original'"
                :placeholder="code.placeholder || '请输入验证码'"
              >
                <!--append:输入框后置内容，只对 type="text" 有效-->
                <template v-slot:append>
                  <img
                    :class="bemCss('code', 'img')"
                    v-if="isLogin"
                    :src="codeSrc"
                    alt="验证码获取失败"
                    @click="refresh"
                  />
                  <el-button
                    :class="bemCss('code', 'phone')"
                    v-if="isRegister"
                    type="primary"
                    @click="send"
                    >{{ text }}</el-button
                  >
                </template>
              </el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item v-if="isRegister" :rules="checked.rules" prop="checked">
            <el-checkbox v-model="form.checked">我已阅读并同意</el-checkbox>
            <a
              :class="bemCss('agreement')"
              :href="option.href || 'javascript:void(0);'"
              target="_blank"
              >《相关协议》</a
            >
          </el-form-item>
          <el-form-item>
            <el-button
              :class="bemCss('submit')"
              type="primary"
              @click="submit"
              >{{ option.title }}</el-button
            >
          </el-form-item>
        </el-form>
        <div v-if="isLogin" :class="bemCss('switch', 'login')">
          还未注册？<span @click="switchCard('register')">立即注册</span>
        </div>
        <div v-if="isRegister" :class="bemCss('switch', 'register')">
          已有账号？<span @click="switchCard('login')">立即登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const INIT_TEXT = "发送验证码";
const TIP_TEXT = "{{time}}s后重新获取";
import create from "../../core/create";

export default create({
  name: "login-and-register",
  data() {
    return {
      form: {
        //明确checked，以防出现bug
        checked: false
      },
      logoUrl: this.option.logoUrl || "",
      time: "",
      text: "",
      timer: "",
      beforeCloseClick: this.option.beforeCloseClick
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    data() {
      return this.option.data || {};
    },
    type() {
      return this.option.type || "login";
    },
    title() {
      return this.option.title || "登陆";
    },
    isLogin() {
      return this.type === "login";
    },
    isRegister() {
      return this.type === "register";
    },
    userName() {
      return this.data.userName || {};
    },
    password() {
      return this.data.password || {};
    },
    code() {
      return this.data.code || {};
    },
    codeSrc() {
      return this.option.codeSrc || "";
    },
    checked() {
      return this.data.checked || {};
    }
  },
  methods: {
    hide() {
      this.$emit("update:visible", false);
    },
    handleClose() {
      if (typeof this.beforeCloseClick === "function") {
        this.beforeCloseClick(this.hide);
      } else {
        this.hide();
      }
    },
    refresh() {
      this.$emit("refresh");
    },
    send() {
      const callback = () => {
        let nowTime = 60;
        this.text = TIP_TEXT.replace("{{time}}", nowTime);
        this.timer = setInterval(() => {
          nowTime--;
          if (nowTime <= 0) {
            this.text = INIT_TEXT;
            clearInterval(this.timer);
          } else {
            this.text = TIP_TEXT.replace("{{time}}", nowTime);
          }
        }, 1000);
      };
      this.$emit("send", callback);
    },
    submit() {
      const getFormData = () => {
        const form = {};
        for (let o in this.form) {
          let key = o;
          //若有prop，则重置键名
          if (this[o].prop) {
            key = this[o].prop;
          }
          form[key] = this.form[o];
        }
        return form;
      };
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("submit", getFormData());
        }
      });
    },
    setTime() {
      const dateTimer = setInterval(() => {
        let date = new Date();
        this.time = `${this.processTime(date.getFullYear())}-${this.processTime(
          date.getMonth() + 1
        )}-${this.processTime(date.getDate())}
				${this.processTime(date.getHours())}:${this.processTime(
          date.getMinutes()
        )}:${this.processTime(date.getSeconds())}`;
      }, 1000);
      this.$once("hook:beforeDestroy", () => {
        clearInterval(dateTimer);
      });
    },
    //小于10补0
    processTime(val) {
      if (val < 10) {
        val = "0" + val;
      }
      return val;
    },
    switchCard(val) {
      this.$emit("switch-card", val);
    }
  },
  created() {
    this.setTime();
    this.text = INIT_TEXT;
  }
});
</script>

<style scoped lang="scss">
@import "../../styles/PositionInfo";
.hxvue-login-and-register {
  &__mask {
    @include positionInfo;
    background-color: rgba(55, 55, 55, 0.6);
  }
  &__card {
    @include positionInfo(50%, 50%, NULL, 700px, 500px);
    //平移自己宽度（高度）的50%
    transform: translate(-50%, -50%);
    display: flex;
    box-shadow: 0 5px 10px darkgray;
    border-radius: 10px;
    overflow: hidden;
    background-color: white;
    line-height: 1;
  }
  &__catalogue {
    @include positionInfo(0%, 0%, NULL, 40%, 100%, relative);
    background-color: rgba(0, 123, 255, 153);
  }
  &__time {
    @include positionInfo(10%, 10%, NULL, NULL, NULL, absolute);
    color: floralwhite;
    font-size: 18px;
  }
  &__logo {
    @include positionInfo(25%, 10%, NULL, 80%, 50%, absolute);
  }
  &__info {
    @include positionInfo(80%, 0%, NULL, 100%, 20px, absolute);
    text-align: center;
    font-size: 20px;
    color: whitesmoke;
  }
  &__content {
    @include positionInfo(0%, 0%, NULL, 60%, 100%, relative);
  }
  &__close {
    @include positionInfo(2%, 90%, NULL, NULL, NULL, absolute);
    cursor: pointer;
    font-size: 25px;
  }
  &__title {
    @include positionInfo(10%, 10%, NULL, NULL, NULL, absolute);
    font-size: 30px;
  }
  &__form {
    @include positionInfo(25%, 10%, NULL, 80%, 50%, absolute);
  }
  &__append {
    >>> .el-input-group__append {
      padding: 0;
      border: 0;
    }
  }
  &__code {
    &--img {
      width: 91px;
      height: 40px;
    }
  }
  &__agreement {
    font-size: 14px;
    text-decoration: none;
    color: blue;
  }
  &__submit {
    font-size: 20px;
    width: 100%;
    background-color: white;
    color: skyblue;
    &:hover {
      background-color: royalblue;
    }
  }
  &__switch {
    span {
      color: lightgreen;
      cursor: pointer;
    }
    &--login {
      @include positionInfo(80%, 10%, NULL, NULL, NULL, absolute);
    }
    &--register {
      @include positionInfo(90%, 10%, NULL, NULL, NULL, absolute);
    }
  }
}
</style>
