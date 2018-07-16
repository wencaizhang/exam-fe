<template>
  <form class="login-container">
    <img class="logo" src="../../assets/images/logo.png" alt="logo">
    <div class="tips-container">
      <span class="tips">{{ tips }}</span>
    </div>
    <input type="text" placeholder="请输入用户名" v-model="username" autofocus>
    <input type="password" placeholder="请输入验证码" v-model="password">
    <XButton 
      text="确定" 
      type="primary"
      @click.native="login" 
    >
    </XButton>
    <div v-transfer-dom>
      <loading :show="loading" text="登录中"></loading>
    </div>
    <toast v-model="loginOK">登录成功</toast>
  </form>
</template>

<script>
import {
  Toast,
  XButton,
  Loading,
  TransferDomDirective as TransferDom
} from "vux";

export default {
  name: "Forget",
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

      this.$http
        .post("/login", {
          username,
          password
        })
        .then(function(resp) {
          vm.loading = false;
          if (resp.data.code == 0) {
            vm.loginOK = true;
            vm.$store.commit('setUserInfo', resp.data.data.user);
            vm.$store.commit('login', true);
            
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

.login-container input {
  margin-bottom: 30px;
  padding: 4px 11px;
}
</style>