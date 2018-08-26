<template>
  <div>
    <x-header v-if="!showMsg"  :left-options="{backText: ''}">重置密码</x-header>
    <form v-if="!showMsg" :class="$style.container">
      <div :class="$style.input_wrap">
        <span :class="[$style.icon_wrap, $style.eye]" v-show="password && showpassword" @click="toggleShowPwd('password')"></span>
        <span :class="[$style.icon_wrap, $style.eye2]" v-show="password && !showpassword" @click="toggleShowPwd('password')"></span>
        <input :class="$style.input" :type="showpassword ? 'text' : 'password'" placeholder="原密码" v-model="password" autofocus ref="password">
      </div>
      <div :class="$style.input_wrap">
        <input :class="$style.input" :type="shownewpassword1 ? 'text' : 'password'" placeholder="新密码" v-model="newPassword1" ref="newpassword1">
        <span :class="[$style.icon_wrap, $style.eye]" v-show="newPassword1 && shownewpassword1" @click="toggleShowPwd('newpassword1')"></span>
        <span :class="[$style.icon_wrap, $style.eye2]" v-show="newPassword1 && !shownewpassword1" @click="toggleShowPwd('newpassword1')"></span>
      </div>
      <div :class="$style.input_wrap">
        <input :class="$style.input" :type="shownewpassword2 ? 'text' : 'password'" placeholder="确认新密码" v-model="newPassword2" ref="newpassword2">
        <span :class="[$style.icon_wrap, $style.eye]" v-show="newPassword2 && shownewpassword2" @click="toggleShowPwd('newpassword2')"></span>
        <span :class="[$style.icon_wrap, $style.eye2]" v-show="newPassword2 && !shownewpassword2" @click="toggleShowPwd('newpassword2')"></span>
      </div>
      <XButton
        text="重置密码" 
        type="primary"
        @click.native="submit" 
      >
      </XButton>
    </form>
    <msg v-if="showMsg" title="恭喜密码重置成功！" :buttons="buttons" icon="success"></msg>
  </div>
</template>

<script>
import { XHeader, XButton, Msg } from 'vux'
export default {
  name: "",
  data() {
    return {
      password: '',
      newPassword1: '',
      newPassword2: '',

      showpassword: false,
      shownewpassword1: false,
      shownewpassword2: false,
      
      showMsg: false,
      buttons: [{
        type: 'primary',
        text: '重新登录',
        onClick: this.toLogin.bind(this)
      }],
    };
  },
  components: {
    XHeader,
    XButton,
    Msg
  },
  methods: {
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    toggleShowPwd (ref) {
      console.log('ref', ref)
      this['show' + ref] = !this['show' + ref];
      this.$refs[ref].focus();
    },
    submit() {
      const { password, newPassword1, newPassword2 } = this;

      if (!password || !newPassword1 || !newPassword2) {
        this.$vux.toast.show({
          text: '请填写完整',
          type: 'warn'
        });
        return;
      }
      if (newPassword1 != newPassword2) {
        this.$vux.toast.show({
          text: '两次密码输入不同',
          type: 'warn'
        });
        return;
      }
      this.$store.dispatch('resetPassword', { userPwd: password, newUserPwd: newPassword1, resetPwd: newPassword2 }).then( resp => {
        if (resp.data.code == 0) {
          this.$vux.toast.show({
            text: resp.data.msg
          });
          this.$store.dispatch('logout').then(resp => {
            if (resp.data.code == 0) {
              this.$store.dispatch('resetAllState')
            }
          });
          this.showMsg = true;
        }
      })
    },
  },
};
</script>

<style module>
.container {
  text-align: center;
  padding-top: 20px;
  letter-spacing: 1px;
  width: 80%;
  /* 垂直居中 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.input_wrap {
  position: relative;
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

.icon_wrap {
  position: absolute;
  right: 4px;
  top: 2px;
  z-index: 10000;
  display: inline-block;
  border-radius: 50%;
  background: #f2f2f2;
  width: 20px;
  height: 20px;
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