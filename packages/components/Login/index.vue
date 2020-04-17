<template>
  <div class="login" :style="{ width: this.setPx(this.formWidth) }">
    <el-form
      ref="form"
      :model="formData"
      label-suffix=":"
      :label-width="this.setPx(this.labelWidth)"
    >
      <el-form-item
        :label="this.userName.label || '用户名'"
        :rules="this.userName.rules"
        :label-width="this.setPx(this.userName.labelWidth)"
        v-if="!this.userName.hide"
        prop="userName"
      >
        <el-tooltip
          :content="this.userName.tip"
          :disabled="this.userName.tip === undefined"
          placement="top-start"
        >
          <el-input
            v-model="formData.userName"
            size="small"
            :prefix-icon="this.userName.prefixIcon || 'el-icon-user'"
            :placeholder="this.userName.placeholder || '请输入用户名'"
            :autocomplete="this.userName.autocomplete"
          ></el-input>
        </el-tooltip>
      </el-form-item>

      <el-form-item
        :label="this.password.label || '密码'"
        :rules="this.password.rules"
        :label-width="this.setPx(this.password.labelWidth)"
        v-if="!this.password.hide"
        prop="password"
      >
        <el-tooltip
          :content="this.password.tip"
          :disabled="this.password.tip === undefined"
          placement="top-start"
        >
          <el-input
            type="password"
            v-model="formData.password"
            size="small"
            show-password
            :prefix-icon="this.password.prefixIcon || 'el-icon-unlock'"
            :placeholder="this.password.placeholder || '请输入密码'"
            :autocomplete="this.password.autocomplete"
          ></el-input>
        </el-tooltip>
      </el-form-item>

      <el-form-item
        :label="this.code.label || '验证码'"
        :rules="this.code.rules"
        :label-width="this.setPx(this.code.labelWidth)"
        v-if="!this.code.hide"
        prop="code"
      >
        <el-tooltip
          :content="this.code.tip"
          :disabled="this.code.tip === undefined"
          placement="top-start"
        >
          <el-input
            v-model="formData.code"
            size="small"
            :prefix-icon="this.code.prefixIcon || 'el-icon-c-scale-to-original'"
            :placeholder="this.code.placeholder || '请输入验证码'"
            :autocomplete="this.code.autocomplete"
          >
            <template slot="append">
              <el-button
                type="primary"
                v-if="this.isPhone"
                @click="this.onSend"
              >
                {{ text }}
              </el-button>
              <span v-if="this.isImg">
                <img
                  :src="this.codeSrc"
                  alt=""
                  @click="this.onRefresh"
                  :width="this.code.width || '80'"
                  :height="this.code.height || '25'"
                />
              </span>
            </template>
          </el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="onSubmit" @click="this.onSubmit">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const INIT_TEXT = "发送验证码";
const TIP_TEXT = "{{time}}s后重新获取";
import create from "../../core/create";

export default create({
  name: "login",
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      text: "",
      nowTime: "",
      check: {},
      formData: {
        userName: "",
        password: "",
        code: ""
      }
    };
  },
  created() {
    this.text = INIT_TEXT;
  },
  computed: {
    labelWidth: function() {
      return this.option.labelWidth || 80;
    },
    time: function() {
      return this.option.time || 60;
    },
    codeType: function() {
      return this.option.codeType || "img";
    },
    isImg: function() {
      return this.codeType === "img";
    },
    isPhone: function() {
      return this.codeType === "phone";
    },
    formWidth: function() {
      return this.option.width || "100%";
    },
    column: function() {
      return this.option.column || {};
    },
    userName: function() {
      return this.column.userName || {};
    },
    password: function() {
      return this.column.password || {};
    },
    code: function() {
      return this.column.code || {};
    },
    codeSrc: function() {
      return this.option.codeSrc || "";
    }
  },
  methods: {
    onSend: function() {
      const callback = () => {
        this.nowTime = this.time;
        this.text = TIP_TEXT.replace("{{time}}", this.nowTime);
        this.check = setInterval(() => {
          this.nowTime--;
          if (this.nowTime <= 0) {
            this.text = INIT_TEXT;
            clearInterval(this.check);
          } else {
            this.text = TIP_TEXT.replace("{{time}}", this.nowTime);
          }
        }, 1000);
      };
      this.$emit("send", callback);
    },
    onRefresh: function() {
      this.$emit("refresh");
    },
    onSubmit: function() {
      const onCover = () => {
        const form = {};
        for (let o in this.formData) {
          let key = o;
          if (this[o].prop) {
            key = this[o].prop;
          }
          form[key] = this.formData[o];
        }
        return form;
      };
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("submit", onCover());
        }
      });
    }
  }
});
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 18px;
}
.onSubmit {
  width: 100%;
}
</style>
