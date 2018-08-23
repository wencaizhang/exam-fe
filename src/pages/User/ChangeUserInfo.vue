<template>
    <div>
    <x-header :left-options="{backText: ''}">修改个人信息</x-header>
    <div :class="$style.container">
        <div :class="$style['tips-container']">
        <span :class="$style.tips">{{ tips }}</span>
        </div>
        <input :class="$style.input" type="password" placeholder="请输入原密码" v-model="oldPwd" autofocus>
        <input :class="$style.input" type="password" placeholder="请输入新密码" v-model="newPwd">
        <input :class="$style.input" type="password" placeholder="请确认新密码" v-model="newPwd2" v-on:keyup.enter="login">

        <div :class="$style.buttons">
          <XButton
            text="确定" 
            type="primary"
            @click.native="reset" 
          >
        </XButton>
        </div>

        <div v-transfer-dom>
        <loading :show="loading" text="修改中"></loading>
        </div>
        <toast v-model="loginOK">修改成功</toast>
    </div>
    </div>
</template>

<script>
import util from "../../util/util.js";
// import qs from "qs";

import {
  Toast,
  XButton,
  Loading,
  XHeader,
  TransferDomDirective as TransferDom
} from "vux";

export default {
  name: "Login",
  directives: {
    TransferDom
  },
  data() {
    return {
      loading: false,
      loginOK: false,
      clicked: false,
      tips: "",
      oldPwd: "",
      newPwd: "",
      newPwd2: ""
    };
  },
  components: {
    XButton,
    Loading,
    Toast,
    XHeader
  },
  methods: {
    reset() {
      const { oldPwd, newPwd, newPwd2 } = this;

      if (!oldPwd || !newPwd || !newPwd2) {
        this.tips = "请填写完整";
        return;
      }
      this.loading = true;

      let url = "/sys/login";
      const data = { username, password };
      const options = {
        url,
        method: "POST",
        // headers: { "content-type": "application/x-www-form-urlencoded" },
        // data: qs.stringify(data)
      };

      axios(options)
        .then(resp => {
          this.loading = false;
          if (resp.data.code == 0) {
            this.loginOK = true;

            const userinfo = resp.data.data || {};
            this.$store.commit("setUserInfo", userinfo);
            this.$store.commit("login", true);

            this.$router.push({ path: "/home" });
          } else {
            this.tips = "用户名或密码错误";
          }
        });
    }
  }
};
</script>

<style module>
@import "../../assets/css/base.css";

.container {
  text-align: center;
  padding: 40px;
  letter-spacing: 1px;
}
.tips-container {
  height: 20px;
  line-height: 20px;
  text-align: left;
  color: red;
  margin-bottom: 5px;
}

.input {
  margin-bottom: 30px;
  padding: 4px 11px;
}
.input {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-radius: 0;
  box-shadow:none;
}
.input:focus {
  box-shadow:none;
}
</style>