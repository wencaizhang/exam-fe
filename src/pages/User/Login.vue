<template>
  <div :class="$style.container">

    <img :class="$style.logo" src="../../assets/images/logo.png" alt="logo">
    <!-- <p style="text-align: left;">{{ loginByPhone ? ' 手机号登录' : ' 身份证号登录' }}
      <span :class="$style.tips">{{ tips }}</span>
    </p> -->
    <div :class="$style['tips-container']">
      <span :class="$style.tips">{{ tips }}</span>
    </div>
    
    <template>
      <div :class="$style.input_wrap">
        <input :type="loginByPhone ? 'number' : 'text'" :placeholder="loginByPhone ? '请输入手机号' : '请输入身份证号'" autofocus
          :class="$style.input" 
          v-model="username" 
          v-on:input="inputHandler"
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
          v-on:input="inputHandler"
          ref="password" 
          v-on:keyup.enter="submitHandle"
        >
        <span :class="[$style.icon_wrap, $style.eye]" v-show="password && showPwd" @click="toggleShowPwd"></span>
        <span :class="[$style.icon_wrap, $style.eye2]" v-show="password && !showPwd" @click="toggleShowPwd"></span>
      </div>
    </template>

    <div :class="$style.buttons">
      <XButton
        text="登 录" 
        type="primary"
        @click.native="submitHandle" 
      >
      </XButton>
      <p :class="$style['other-handler']">
        <router-link :to="{ name: 'register'}" class="fl">注册</router-link>
        <router-link :to="{ name: 'forget'}" class="fr">忘记密码</router-link>
      </p>
    </div>

    <div :class="$style.bottom_box" v-show="isOriginHei">
      <p :class="$style.login_type_btn" @click="changeLoginType">{{ loginByPhone ? '身份证号登录' : '手机号登录' }}</p>
      <p :class="$style.copyright">&copy;京ICP备17059190号-1</p>
    </div>
  </div>
</template>

<script>
import util from "../../util/util.js";
import API from "../../util/api.js";

import axios from 'axios'
import { XButton } from "vux";
export default {
  name: "Login",
  data() {
    return {
      tips: "",
      showPwd: false,

      username: "",
      password: "",

      loginByPhone: true,

        isOriginHei: true,
        screenHeight: document.documentElement.clientHeight,        //此处也可能是其他获取方法
        originHeight: document.documentElement.clientHeight,
    };
  },
  components: {
    XButton,
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
    changeLoginType () {
      this.loginByPhone = !this.loginByPhone;
      this.tips = '';
    },
    submitHandle () {

      const { loginByPhone, username, password } = this;

      if (!username) {
        this.tips = loginByPhone ? '手机号不能为空' : '身份证号不能为空';
        return;
      }
      if (!password) {
        this.tips = '密码不能为空';
        return;
      }
      if (username && password) {
        this.loginByAction();
      } 
    },

    loginByAction () {
      
      const { loginByPhone, username, password } = this;
      const data = { password };
      loginByPhone ? data.phone = username : data.idcards = username;

      this.$store.dispatch('login', data);

    },
    inputHandler () {
      this.tips = '';
    }
  },
  watch: {
    screenHeight (val) {
      if(this.originHeight > val + 100) {        //加100为了兼容华为的返回键
        this.isOriginHei = false;
      }else{
        this.isOriginHei = true;
      }
    }
  },
  mounted () {
    window.onresize = () => {
        return (() => {
            this.screenHeight = document.documentElement.clientHeight;
        })()
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
  position: absolute;
  box-sizing: border-box;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  padding-top: 20px;
  height: 100%;
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
.tips {
  color: red;
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

.bottom_box {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}

.login_type_btn {
  color: #1AAD19;
  margin-bottom: 10px;
}

.copyright {
  color: #ccc;
}
</style>