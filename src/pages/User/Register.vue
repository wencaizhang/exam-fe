<template>
  <div>
    <form class="form-box" autocomplete="off" @submit.prevent="register">
      <div class="logoBox"><img class="logo" src="../../assets/images/logo.png" alt="logo"></div>
      <div v-transfer-dom>
        <popup v-model="showPopup">
          <div class="popup-box">
            <p class="popup-buttons">
              <span class="cancel" @click="popupCancelHandle">取消</span>
              <span class="select">请选择</span>
              <span class="success" @click="popupSuccessHandle">确定</span>
            </p>
            <picker :data='deptList' :columns=4 v-model='danweiValue'></picker>
          </div>
        </popup>
      </div>
      <div v-for="input in textInputs" v-bind:key="input.name" class="infoBox">
        <label v-bind:for="input.name" v-html="input.text"></label>
        <div class="infoInput">
          <input v-bind:readonly="input.name == 'dept'"
            v-bind:placeholder="input.placeholder"
            v-bind:id="input.name"
            v-bind:type="input.type"
            v-model="input.value"
            v-on:input="inputHandler(input.name)"
            v-on:blur="blurHandler(input.name)"
            v-on:click="showPic(input.name)"
          >
          <span class="icon-placeholder">
            <icon v-bind:type="input.icon"></icon>
          </span>
        </div>
      </div>
    </form>
    <div class="buttons">
      <XButton
        text="注册"
        type="primary"
        @click.native="register"
      >
      </XButton>
      <p class="other-handler clearfix">
        <router-link :to="{ name: 'login'}" class="fl">返回登录</router-link>
        <router-link :to="{ name: 'login'}" class="fr">忘记密码</router-link>
      </p>
    </div>
    <toast v-model="showToast" type="warn">请正确填写</toast>
  </div>
</template>

<script>
import Vue from "vue";
import qs from "qs";
import {
  Picker,
  Popup,
  Group,
  GroupTitle,
  Toast,
  XButton,
  Loading,
  Icon,
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
    Toast
  },
  data() {
    return {
      deptList: [],
      danweiValue: [],
      showPopup: false,
      showToast: false,
      formPass: false,

      deptId: "", // 部门
      textInputs: [
        {
          value: "",
          icon: "",
          type: "text",
          name: "dept",
          text: "<span class='required'>*</span> 所属单位:",
          placeholder: '请选择'
        },
        {
          value: "",
          icon: "",
          type: "text",
          name: "name",
          text: "<span class='required'>*</span> 真实姓名:",
          placeholder: '真实姓名'
        },
        {
          value: "",
          icon: "",
          type: "text",
          name: "userName",
          text: "<span class='required'>*</span> 姓&emsp;&emsp;名:",
          placeholder: '用户名'
        },
        {
          value: "",
          icon: "",
          type: "tel",
          name: "phone",
          text: "<span class='required'>*</span> 手机号码:",
          placeholder: '手机号码'
        },
        {
          value: "",
          icon: "",
          type: "password",
          name: "userPwd",
          text: "<span class='required'>*</span> 密&emsp;&emsp;码:",
          placeholder: '密码最少 6 位'
        },
        {
          value: "",
          icon: "",
          type: "password",
          name: "confirmPwd",
          text: "<span class='required'>*</span> 确认密码:",
          placeholder: '请再输入密码'
        }
      ]
    };
  },
  created () {
    this._getDeptList();
  },
  methods: {
    _getDeptList () {
      // 获取所属单位列表数据
      const vm = this;
      let url = '/sys/dept/list';
      const options = {
        url,
        method: "GET",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      };
      vm
        .$http(options)
        .then(function(resp) {
          vm.loading = false;

          if (resp.data.code == 0) {
            vm.loginOK = true;
            vm.deptList = resp.data.deptList.map(item => {
              return Object.assign({}, { 
                value: item.deptId,
                name: item.name,
                parent: item.parentId,
              })
            });

            console.log('deptList', JSON.parse(JSON.stringify(Object.assign({}, vm.deptList))))
            // vm.$router.push({ path: "/home" });
          } else {
            // vm.tips = "用户名或密码错误";
          }
        })
        .catch(function(error) {
          console.log(error);
        });
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
      return data;
    },
    _isEmpty4Item(name) {
      // 判断指定表单是否为空
      const vm = this;
      const { textInputs } = vm;
      textInputs.forEach(input => {
        if (input.name === name) {
          if (input.value.trim() === "") {
            input.icon = "warn";
            vm.formPass = false;
          } else {
            input.icon = "";
          }
        }
      });
    },
    _isEmpty4All() {
      // 判断所有表单是否存在空
      const vm = this;
      const { textInputs } = this;
      
      textInputs.forEach(input => {
        if (input.value.trim() === "") {
          input.icon = "warn";
          vm.formPass = false;
        }
      });

      this.formPass = !textInputs.some(input => input.value.trim() === "");
    },
    _confirmPwd() {
      // 确认两次密码输入是否相同
      const vm = this;
      const { textInputs } = this;
      let userPwdInput, confirmPwdInput;
      
      textInputs.forEach(input => {
        if (input.name === "userPwd") {
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
          vm.formPass = false;
        }
      }
    },
    blurHandler(name) {
      // 失去焦点时进行校验
      const vm = this;
      const { textInputs } = this;
      const input = textInputs.filter(input => input.name === name)[0];

      // 判断手机号正好 11 位数字
      if (name === "phone") {
        let reg = /^\d{11}$/;
        let isNum = reg.test(input.value);
        if (!isNum) {
          input.icon = "warn";
          vm.formPass = false;
          return;
        } else if (isNum && input.icon === "warn") {
          input.icon = "";
        }
      }

      // 判断手机号正好 11 位数字
      if (name === "userPwd") {
        if (input.value.trim().length < 6) {
          input.icon = "warn";
          vm.formPass = false;
          return;
        }
      }
    },
    inputHandler(name) {
      // 用户输入时进行校验
      const vm = this;
      const { textInputs } = this;
      const input = textInputs.filter(input => input.name === name)[0];

      // 判断是否为空
      if (input.value.trim() === "") {
        input.icon = "warn";
        vm.formPass = false;
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
          vm.formPass = false;
          return;
        } else if (isNum && input.icon === "warn") {
          input.icon = "";
        }
      }
    },
    register() {      
      const vm = this;
      vm.formPass = true;
      // 点击注册按钮时触发
      this._isEmpty4All();
      this._confirmPwd();
      if (!this.formPass) {
        this.showToast = !this.formPass;
        console.log(this.showToast)
        return;
      }

      const data = vm._getData();
      vm.loading = true;

      let url = "/api/register";
      const options = {
        url,
        // data,
        method: "POST",
        headers: { "content-type": 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
      };
      vm
        .$http(options)
        .then(function(resp) {
          vm.loading = false;
          if (resp.data.code == 0) {
            vm.loginOK = true;
            vm.$router.push({ path: "/home" });
          } else {
            // vm.tips = resp.data.message;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setCompanyName() {
      const { deptList, danweiValue, textInputs } = this;
      let name = "";
      let id = this.deptId = danweiValue.reverse()[0];

      deptList.forEach(function(item) {
        if (item.value === id) {
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
    },
  }
};
</script>

<style lang="">
@import "../../assets/css/base.css";

body {
  background-color: #fff;
}



.logoBox {
  text-align: center;
  margin-top: 20px;
}

.infoBox {
  margin-bottom: 6px;
  padding-left: 20px;
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
  display: inline-block;
}
.form-box input {
  text-indent: 10px;
  width: auto;
}

.icon-placeholder {
  display: inline-block;
  height: 40px;
  width: 34px;
  /* display: none; */
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
.popup-buttons .cancel {
  float: left;
  color: #ccc;
}
.popup-buttons .select {
  color: #000;
}
.popup-buttons .success {
  float: right;
  color: #f90;
}

</style>
