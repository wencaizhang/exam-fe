<template>
  <div>
    <x-header :left-options="{backText: ''}">重置密码</x-header>
    <form v-if="!showMsg" :class="$style.container">
      <div :class="$style.input_wrap">
        <input :class="$style.input" type="password" placeholder="原密码" v-model="password" autofocus>
      </div>
      <div :class="$style.input_wrap">
        <input :class="$style.input" type="password" placeholder="新密码" v-model="newPassword1">
      </div>
      <div :class="$style.input_wrap">
        <input :class="$style.input" type="password" placeholder="确认新密码" v-model="newPassword2">
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
      
      showMsg: false,
      buttons: [{
        type: 'primary',
        text: '重新登录',
        onClick: this.logout.bind(this)
      }],
    };
  },
  components: {
    XHeader,
    XButton,
    Msg
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(resp => {
        if (resp.data.code == 0) {
          this.$store.dispatch('resetAllState')
          this.$router.push({ path: "/login" });
        }
      });
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
          this.showMsg = true;
        }
      })
    },
  }
};
</script>

<style module>
.container {
  text-align: center;
  padding: 40px;
  padding-top: 20px;
  letter-spacing: 1px;

  /* 垂直居中 */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
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
</style>