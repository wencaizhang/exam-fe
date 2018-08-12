<template>
  <form :class="$style.container">
    <img :class="$style.logo" src="../../assets/images/logo.png" alt="logo">
    <div :class="$style['tips-container']">
      <span :class="$style.tips">{{ tips }}</span>
    </div>
    <input :class="$style.input" type="text" placeholder="请输入原密码" v-model="username" autofocus>
    <input :class="$style.input" type="password" placeholder="请输入新密码" v-model="password">
    <input :class="$style.input" type="password2" placeholder="请确认新密码" v-model="password2">
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
      password: "",
      password2: "",
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

      axios
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

<style module>
@import "../../assets/css/base.css";
.logo {
  margin-top: 10px;
  margin-bottom: 20px;
}
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