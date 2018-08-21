<template>
  <div>
    <form v-if="!showMsg" :class="$style.container">
      <img :class="$style.logo" src="../../assets/images/logo.png" alt="logo">
      <div :class="$style['tips-container']">
        <span :class="$style.tips">{{ tips }}</span>
      </div>
      <template v-if="!validate">
        <input :class="$style.input" type="number" placeholder="手机号" v-model="phone" autofocus>
        
        <div :class="$style.input_wrap">
          <input :class="$style.input" type="text" placeholder="验证码" v-model="checkCode">
          <XButton :class="$style.code_btn" :disabled="btnDisabled" :text="btnText" @click.native="sendCode"></XButton>
        </div>
        <XButton
          text="下一步" 
          type="primary"
          :disabled="nextDisabled"
          @click.native="next" 
        >
        </XButton>
      </template>
      <template v-else>
        <div :class="$style.input_wrap">
          <input :class="$style.input" type="password" placeholder="新密码" v-model="password" autofocus>
        </div>
        
        <div :class="$style.input_wrap">
          <input :class="$style.input" type="password" placeholder="确认新密码" v-model="newPassword">
        </div>
        <XButton
          text="确认" 
          type="primary"
          @click.native="submit" 
        >
        </XButton>
        <XButton
          text="返回上一步" 
          plain
          @click.native="prev" 
        >
        </XButton>
      </template>
    </form>
    <msg v-if="showMsg" title="恭喜密码重置成功！" :buttons="buttons" icon="success"></msg>
  </div>
</template>

<script>
import {
  XButton,
  Msg
} from "vux";
import { setInterval, clearInterval } from 'timers';

export default {
  name: "Forget",
  data() {
    return {
      tips: "",
      phone: "",
      checkCode: "",

      showMsg: false,
      buttons: [{
        type: 'primary',
        text: '立即登录',
        onClick: this.toLogin.bind(this)
      }],

      validate: false, // 是否通过验证码验证

      password: '',
      newPassword: '',

      btnText: '获取验证码',
      btnDisabled: false,
    };
  },
  components: {
    XButton,
    Msg
  },
  computed: {
    nextDisabled () {
      if (this.phone.length === 11 && this.checkCode.length === 6) {
        return true;
      }
      return false;
    }
  },
  methods: {
    sendCode () {
      let phone = this.phone;
      if (phone === "") {
        this.$vux.toast.show({
          text: '请先输入手机号',
          type: 'warn'
        });
        return;
      } 
      if (phone.length != 11) {
        this.$vux.toast.show({
          text: '请输入正确的手机号',
          type: 'warn'
        });
        return;
      }
      this.$store.dispatch('sendCodeBack', { phone }).then( resp => {
        console.log(resp)
        if (resp.data.code == 0) {
          this.countDown();
          this.$vux.toast.show({
            text: '已发送',
            type: 'text'
          });
        }
      })
    },

    next () {
      let { phone, checkCode } = this;
      if (phone === "") {
        this.$vux.toast.show({
          text: '请先输入手机号',
          type: 'warn'
        });
        return;
      }
      if (checkCode === "") {
        this.$vux.toast.show({
          text: '请先输入验证码',
          type: 'warn'
        });
        return;
      }
      this.$store.dispatch('validateCodeBack', { phone, checkCode }).then( resp => {
        if (resp.data.code == 0) {
          // this.$vux.toast.show({
          //   text: '验证成功'
          // });
          this.validate = true;
        }
      })
    },
    prev () {
      this.validate = false;
    },
    countDown () {
      // 发送验证码后开始倒计时
      let count = 120;
      const timer = setInterval( () => {
        if (count > 0) {
          this.btnDisabled = true;
          this.btnText = `${count}秒`
          count--;
        } else {
          this.btnDisabled = false;
          this.btnText = '获取验证码';
          clearInterval(timer);
        }
      }, 1000)
    },
    submit() {
      const vm = this;
      const { phone, password, newPassword } = vm;

      if (!password || !newPassword) {
        this.$vux.toast.show({
          text: '密码不能为空',
          type: 'warn'
        });
        return;
      }
      if (password != newPassword) {
        this.$vux.toast.show({
          text: '两次密码输入不同',
          type: 'warn'
        });
        return;
      }
      this.$store.dispatch('updatePassword', { phone, password, newPassword }).then( resp => {
        if (resp.data.code == 0) {
          this.$vux.toast.show({
            text: resp.data.msg
          });
          this.showMsg = true;
        }
      })
      
    },
    toLogin () {
      this.$router.push({ path: "/login" });
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

.input_wrap {
  position: relative;
}

.code_btn {
  position: absolute!important;
  right: 0px!important;
  top: 0px!important;
  height: 30px!important;
  line-height: 30px!important;
  padding: 0 5px!important;
  background: #fff!important;
  width: auto!important;
  font-size: 16px!important;
  color: #1AAD19!important;
  width: 90px!important;
}
.code_btn[disabled] {
  color: rgba(0, 0, 0, 0.3)!important;
  background-color: #F7F7F7!important;
}
.code_btn::after {
  border: 0!important;
}
</style>