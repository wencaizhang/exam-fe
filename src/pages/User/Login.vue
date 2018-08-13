<template>
  <div :class="$style.container">
    <img :class="$style.logo" src="../../assets/images/logo.png" alt="logo">
    <div :class="$style['tips-container']">
      <span :class="$style.tips">{{ tips }}</span>
    </div>
    
    <div :class="$style.input_wrap">
      <input type="text" placeholder="请输入用户名" autofocus
        :class="$style.input" 
        v-model="username" 
        ref="username"
      >
      <!-- <span :class="$style.icon_wrap" v-show="username" @click="clearValue('username')">
        <x-icon type="ios-close-empty" size="20"></x-icon>
      </span> -->
    </div>
    <div :class="$style.input_wrap">
      <input :type="showPwd ? 'text' : 'password'" placeholder="请输入密码" 
        :class="$style.input" 
        v-model="password" 
        ref="password" 
        v-on:keyup.enter="clickHandle"
      >
      <span :class="[$style.icon_wrap, $style.eye]" v-show="password && showPwd" @click="toggleShowPwd"></span>
      <span :class="[$style.icon_wrap, $style.eye2]" v-show="password && !showPwd" @click="toggleShowPwd"></span>
    </div>

    <div :class="$style.buttons">
      <XButton
        text="登 录" 
        type="primary"
        @click.native="clickHandle" 
      >
      </XButton>
      <p :class="$style['other-handler']">
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
import API from "../../util/api.js";

import axios from 'axios'
import {
  Toast,
  XButton,
  Loading,
  TransferDomDirective as TransferDom
} from "vux";
import { cookie } from 'vux'
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
      password: "",
      showPwd: false,
    };
  },
  components: {
    XButton,
    Loading,
    Toast
  },
  methods: {
    // clearValue(model) {
    //   this[model] = "";
    //   this.$refs[model].focus();
    // },
    toggleShowPwd () {
      this.showPwd = !this.showPwd;
      this.$refs.password.focus();
    },
    clickHandle () {

      const vm = this;
      const { username, password } = vm;

      if (username && password) {
        // vm.login();
        vm.loginByAction();
      } else {
        
        vm.tips = "用户名或密码不能为空";
      }
    },

    loginByAction () {
      
      const { username, password } = this;
      const data = { username, password };
      this.$store.dispatch('login', data);

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
.other-handler {
  margin: 10px 0;
  color: #555;
  padding: 0 2px;
}
.tips-container {
  height: 20px;
  line-height: 20px;
  text-align: left;
  color: red;
  margin-bottom: 5px;
}

.buttons {
  margin: 0 auto;
  /* width: 80%; */
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
  box-shadow: none;
}
.input:focus {
  box-shadow: none;
}

.input_wrap {
  position: relative;
}
.icon_wrap {
  position: absolute;
  right: 4px;
  top: 2px;
  display: inline-block;
  border-radius: 50%;
  background: #f2f2f2;
  width: 20px;
  height: 20px;
}
.vux-x-icon {
  fill: #f70968;
}

.eye {
  background: url(../../assets/images/eye.png);
  background-size: cover;
}
.eye2 {
  background: url(../../assets/images/eye2.png);
  background-size: cover;
}
</style>