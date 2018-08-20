<template>
  <div>
    <template v-if="!showMsg">
      <form :class="$style['form-box']" autocomplete="off" @submit.prevent="1">
        <div :class="$style.logoBox"><img :class="$style.logo" src="../../assets/images/logo.png" alt="logo"></div>
        <div v-transfer-dom>
          <popup v-model="showPopup">
            <div :class="$style['popup-box']">
              <p :class="$style['popup-buttons']">
                <span :class="$style.cancel" @click="popupCancelHandle">取消</span>
                <span :class="$style.select">请选择</span>
                <span :class="$style.success" @click="popupSuccessHandle">确定</span>
              </p>
              <picker :data='deptList' :columns=4 v-model='danweiValue'></picker>
            </div>
          </popup>
        </div>
        <div v-for="input in textInputs" v-bind:key="input.name" :class="$style.infoBox">
          <div :class="$style.infoInput">
            <input v-bind:readonly="input.name == 'dept'"
              v-bind:placeholder="input.placeholder"
              v-bind:id="input.name"
              v-bind:type="getType(input.type, input.name)"
              v-model="input.value"
              v-on:input="inputHandler(input.name)"
              v-on:blur="blurHandler(input.name)"
              v-on:click="showPic(input.name)"
              v-bind:ref="input.name" 
            >
            <template v-if="input.name == 'checkCode'">
              <XButton :class="$style.code_btn" :disabled="btnDisabled" :text="btnText" @click.native="sendCode"></XButton>
            </template>
            <template v-if="input.name == 'password'">
              <span :class="[$style.icon_wrap, $style.eye]" v-show="input.value && showPwd" @click="toggleShowPwd"></span>
              <span :class="[$style.icon_wrap, $style.eye2]" v-show="input.value && !showPwd" @click="toggleShowPwd"></span>
            </template>
            <template v-if="input.name == 'confirmPwd'">
              <span :class="[$style.icon_wrap, $style.eye]" v-show="input.value && showPwd2" @click="toggleShowPwd2"></span>
              <span :class="[$style.icon_wrap, $style.eye2]" v-show="input.value && !showPwd2" @click="toggleShowPwd2"></span>
            </template>
            <span :class="$style['icon-placeholder']" v-bind:style="{ right: input.name == 'checkCode' ? '90px' : '0' }">
              <icon v-bind:type="input.icon"></icon>
            </span>
          </div>
        </div>
      </form>
      <div :class="$style.buttons">
        <XButton
          text="注册"
          type="primary"
          @click.native="register"
        >
        </XButton>
        <p :class="$style['other-handler']">
          <router-link :to="{ name: 'login'}" class="fl">返回登录</router-link>
          <router-link :to="{ name: 'forget'}" class="fr">忘记密码</router-link>
        </p>
      </div>
      <toast v-model="showToast" type="warn">请正确填写注册信息</toast>
    </template>
    <msg v-if="showMsg" title="恭喜您注册成功！" :buttons="buttons" icon="success"></msg>
  </div>
</template>

<script>
import axios from 'axios'
import {
  Picker,
  Popup,
  Group,
  GroupTitle,
  Toast,
  XButton,
  Loading,
  Icon,
  Msg,
  TransferDomDirective as TransferDom
} from "vux";

export default {
  name: "Register",
  directives: {
    TransferDom
  },
  components: {
    Picker,
    Group,
    GroupTitle,
    Popup,
    XButton,
    Loading,
    Icon,
    Msg,
    Toast
  },
  data() {
    return {
      buttons: [{
        type: 'primary',
        text: '立即登录',
        onClick: this.toLogin.bind(this)
      }],
      showMsg: false,
      btnText: '获取验证码',
      btnDisabled: false,

      deptList: [],
      danweiValue: [],
      showPopup: false,
      showToast: false,
      formPass: false,

      showPwd: false,
      showPwd2: false,

      deptId: "", // 部门
      deptNumber: '',
      textInputs: [
        {
          value: "",
          icon: "",
          type: "text",
          name: "dept",
          placeholder: "请选择所属单位"
        },
        {
          value: "",
          icon: "",
          type: "text",
          name: "name",
          placeholder: "真实姓名"
        },
        {
          value: "",
          icon: "",
          type: "text",
          name: "username",
          placeholder: "用户名"
        },
        {
          value: "",
          icon: "",
          type: "text",
          name: "idcards",
          placeholder: "身份证"
        },
        {
          value: "",
          icon: "",
          type: "tel",
          name: "phone",
          placeholder: "手机号码"
        },
        {
          value: "",
          icon: "",
          type: "text",
          name: "checkCode",
          placeholder: "验证码"
        },
        {
          value: "",
          icon: "",
          type: "password",
          name: "password",
          placeholder: "密码最少 6 位"
        },
        {
          value: "",
          icon: "",
          type: "password",
          name: "confirmPwd",
          placeholder: "请确认密码"
        }
      ]
    };
  },
  created() {
    this._getDeptList();
  },
  methods: {

    sendCode () {
      let name = 'phone'
      const { textInputs } = this;
      textInputs.forEach(input => {
        if (input.name === name) {
          let phone = input.value.trim();
          if (phone === "") {
            input.icon = "warn";
            this.$vux.toast.show({
              text: '请先输入手机号',
              type: 'warn'
            });
          } else if (phone.length != 11) {
            input.icon = "warn";
            this.$vux.toast.show({
              text: '请输入正确的手机号',
              type: 'warn'
            });
          } else {
            input.icon = "";
            this.$store.dispatch('sendCode', { phone }).then( resp => {
              if (resp.code == 0) {
                this.countDown();
                this.$vux.toast.show({
                  text: '已发送'
                });
              }
            })
          }
        }
      });
    },

    next () {
      this.validate = true;
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


    getType(type, name) {
      if (type === 'password') {
        if (name === 'password') {
          return this.showPwd ? 'text' : 'password';
        } else {
          return this.showPwd2 ? 'text' : 'password';
        }
      }
      return type;
    },
    toggleShowPwd () {
      this.showPwd = !this.showPwd;
      this.$refs.password.focus();
    },
    toggleShowPwd2 () {
      this.showPwd2 = !this.showPwd2;
      this.$refs.confirmPwd.focus();
    },
    show () {
      this.showMsg = true;
      this.toLogin();
    },
    toLogin () {
      this.$router.push({ path: "/login" });
    },
    _getDeptList() {
      // 获取所属单位列表数据
      this.$store.commit('setLoadText', '正在请求单位列表')
      let url = "/sys/dept/list";
      const options = {
        url,
        method: "GET",
        // headers: { "content-type": "application/x-www-form-urlencoded" }
      };
      axios(options)
        .then(resp => {
          this.loading = false;
          if (resp.data.code == 0) {
            this.loginOK = true;
            this.deptList = resp.data.deptList.map(item => {
              // 数字转成字符串，否则会出问题
              return {
                value: item.deptId + '',
                name: item.name,
                parent: item.parentId + '',
                deptNumber: item.deptNo
              }
            });
          } else {
            this.tips = "用户名或密码错误";
          }
        })
    },
    _getData() {
      // 获取页面表单数据
      const { textInputs } = this;
      const data = {};
      textInputs.forEach(input => {
        if (input.name === "confirmPwd") {
          return false;
        }
        data[input.name] = input.value;
      });
      delete data.dept;
      data.deptId = this.deptId;
      data.deptNumber = this.deptNumber;
      return data;
    },
    _isEmpty4Item(name) {
      // 判断指定表单是否为空
      const { textInputs } = this;
      textInputs.forEach(input => {
        if (input.name === name) {
          if (input.value.trim() === "") {
            input.icon = "warn";
            this.formPass = false;
          } else {
            input.icon = "";
          }
        }
      });
    },
    _isEmpty4All() {
      // 判断所有表单是否存在空
      const { textInputs } = this;

      textInputs.forEach(input => {
        if (input.value.trim() === "") {
          input.icon = "warn";
          this.formPass = false;
        }
      });

      this.formPass = !textInputs.some(input => input.value.trim() === "");
    },
    _confirmPwd() {
      // 确认两次密码输入是否相同
      const { textInputs } = this;
      let userPwdInput, confirmPwdInput;

      textInputs.forEach(input => {
        if (input.name === "password") {
          userPwdInput = input;
        }
        if (input.name === "confirmPwd") {
          confirmPwdInput = input;
        }
      });
      if (userPwdInput.value) {
        if (userPwdInput.value === confirmPwdInput.value) {
          confirmPwdInput.icon = "success";
        } else {
          confirmPwdInput.icon = "warn";
          this.formPass = false;
        }
      }
    },
    blurHandler(name) {
      // 失去焦点时进行校验
      const { textInputs } = this;
      const input = textInputs.filter(input => input.name === name)[0];

      // 判断手机号正好 11 位数字
      if (name === "phone") {
        let reg = /^\d{11}$/;
        let isNum = reg.test(input.value);
        if (!isNum) {
          input.icon = "warn";
          this.formPass = false;
          return;
        } else if (isNum && input.icon === "warn") {
          input.icon = "";
        }
      }

      // 判断手机号正好 11 位数字
      if (name === "userPwd") {
        if (input.value.trim().length < 6) {
          input.icon = "warn";
          this.formPass = false;
          return;
        }
      }
    },
    inputHandler(name) {
      // 用户输入时进行校验
      const { textInputs } = this;
      const input = textInputs.filter(input => input.name === name)[0];

      // 判断是否为空
      if (input.value.trim() === "") {
        input.icon = "warn";
        this.formPass = false;
        return;
      } else if (input.value.trim() != "" && input.icon === "warn") {
        input.icon = "";
      }

      // 判断手机号 0 - 11 位数字
      if (name === "phone") {
        let reg = /^\d{0,11}$/;
        let isNum = reg.test(input.value);
        if (!isNum) {
          input.icon = "warn";
          this.formPass = false;
          return;
        } else if (isNum && input.icon === "warn") {
          input.icon = "";
        }
      }
    },
    register() {
      this.formPass = true;
      // 点击注册按钮时触发
      this._isEmpty4All();
      this._confirmPwd();
      if (!this.formPass) {
        this.showToast = !this.formPass;
        return;
      }

      const data = this._getData();
      this.loading = true;

      let url = "/api/register";
      const options = {
        url,
        method: "POST",
        data
      };
      axios(options)
        .then(resp => {
          this.loading = false;
          if (resp.data.code == 0) {
            this.loginOK = true;
            this.showMsg = true;
          } else {
            // this.tips = resp.data.message;
          }
        })
    },
    setCompanyName() {
      const { deptList, danweiValue, textInputs } = this;
      let name = "";
      let id = (this.deptId = danweiValue.reverse()[0]);

      deptList.forEach(item => {
        if (item.value == id) {
          this.deptNumber = item.deptNumber;
          name += item.name;
        }
      });

      textInputs.forEach(item => {
        if (item.name === "dept") {
          item.value = name.trim();
        }
      });
      this._isEmpty4Item("dept");
    },
    showPic(name) {
      this.showPopup = name === "dept";
    },
    popupCancelHandle() {
      this.showPopup = false;
    },
    popupSuccessHandle() {
      this.showPopup = false;
      this.setCompanyName();
    }
  }
};
</script>

<style module>
@import "../../assets/css/base.css";

body {
  background-color: #fff;
}

.logoBox {
  text-align: center;
  margin-top: 10px;
}

.infoBox {
  margin-bottom: 20px;
  padding: 0 20px;
}

.user_name {
  letter-spacing: 5px;
}

.companyInfo {
  height: 40px;
  line-height: 1.5;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}
.form-box {
  padding: 0;
  text-align: center;
}

label {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}

.infoInput {
  position: relative;
  display: inline-block;
  width: 100%;
}
.icon-placeholder {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 30px;
  width: 34px;
}
input {
  /* text-indent: 10px; */
  width: 100%;
}

.required {
  color: red;
}
.buttons {
  margin: 0 auto;
  width: 80%;
}
.buttons p {
  margin-top: 5px;
}

.popup-buttons {
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-size: 16px;
  padding: 0 10px;
  background-color: #fbf9fe;
}
.cancel {
  float: left;
  color: #ccc;
}
.select {
  color: #000;
}
.success {
  float: right;
  color: #f90;
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
}

.icon_wrap {
  position: absolute;
  right: 34px;
  top: 2px;
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
