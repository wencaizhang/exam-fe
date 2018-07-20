<template>
  <div class="login-container">
    <img class="logo" src="../../assets/images/logo.png" alt="logo">
    <div class="tips-container">
      <span class="tips">{{ tips }}</span>
    </div>
    <input type="text" placeholder="请输入用户名" v-model="username" autofocus>
    <input type="password" placeholder="请输入密码" v-model="password" v-on:keyup.enter="login">

    <div class="buttons">
      <XButton
        text="登录" 
        type="primary"
        @click.native="login" 
      >
      </XButton>
      <p class="other-handler clearfix">
        <router-link :to="{ name: 'register'}" class="fl">注册</router-link>
        <router-link :to="{ name: 'forget'}" class="fr">忘记密码</router-link>
      </p>
    </div>

    <div v-transfer-dom>
      <loading :show="loading" text="登录中"></loading>
    </div>
    <toast v-model="loginOK">登录成功</toast>
  </div>
</template>

<script>
import util from "../../util/util.js";
import qs from "qs";

import {
  Toast,
  XButton,
  Loading,
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
      username: "",
      password: ""
    };
  },
  components: {
    XButton,
    Loading,
    Toast
  },
  methods: {
    login() {
      const vm = this;
      const { username, password } = vm;

      if (!username || !password) {
        vm.tips = "用户名或密码不能为空";
        return;
      }
      vm.loading = true;

      let url = "/sys/login";
      const data = { username, password };
      const options = {
        url,
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data)
      };

      this.$http(options)
        .then(function(resp) {
          vm.loading = false;
          if (resp.data.code == 0) {
            vm.loginOK = true;

            const userinfo = resp.data.data || {};
            util.setUserinfo(userinfo);
            vm.$store.commit("setUserInfo", userinfo);
            vm.$store.commit("login", true);

            vm.$router.push({ path: "/home" });
          } else {
            vm.tips = "用户名或密码错误";
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="">
@import "../../assets/css/base.css";
.logo {
  margin-top: 10px;
  margin-bottom: 20px;
}
.login-container {
  text-align: center;
  padding: 40px;
  letter-spacing: 1px;
}
.login-container .other-handler {
  margin: 10px 0;
  color: #555;
  padding: 0 2px;
}
.login-container .tips-container {
  height: 20px;
  line-height: 20px;
  text-align: left;
  color: red;
  margin-bottom: 5px;
}
.login-container input[type="button"] {
  background-color: rgba(24, 144, 255);
  color: #000;
}
.buttons {
  margin: 0 auto;
  /* width: 80%; */
}
.login-container input {
  margin-bottom: 30px;
  padding: 4px 11px;
}

input {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-radius: 0;
  box-shadow:none;
}
input:focus {
  box-shadow:none;
  -webkit-tap-highlight-color:transparent;
   -webkit-appearance: none;
}
</style>