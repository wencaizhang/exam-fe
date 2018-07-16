<template>
    <div>
    <x-header :left-options="{backText: ''}">修改个人信息</x-header>
    <div class="login-container">
        <div class="tips-container">
        <span class="tips">{{ tips }}</span>
        </div>
        <input type="password" placeholder="请输入原密码" v-model="oldPwd" autofocus>
        <input type="password" placeholder="请输入新密码" v-model="newPwd">
        <input type="password" placeholder="请确认新密码" v-model="newPwd2" v-on:keyup.enter="login">

        <div class="buttons">
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
import qs from "qs";

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
      const vm = this;
      const { oldPwd, newPwd, newPwd2 } = vm;

      if (!oldPwd || !newPwd || !newPwd2) {
        vm.tips = "请填写完整";
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

.login-container input {
  margin-bottom: 30px;
  padding: 4px 11px;
}
</style>