<template>
  <div>
    <form action="">
      <div class="logoBox"><img class="logo" src="../../assets/images/logo.png" alt="logo"></div>
      
      <!-- <div class="tips-container">
        <span class="tips">{{ tips }}</span>
      </div> -->

      <div v-transfer-dom>
        <popup v-model="showPopup">
          <div class="popup-box">
            <p class="popup-buttons">
              <span class="cancel" @click="popupCancelHandle">取消</span>
              <span class="select">请选择</span>
              <span class="success" @click="popupSuccessHandle">确定</span>
            </p>
            <picker :data='deptList' :columns=3 v-model='danweiValue'></picker>
          </div>
        </popup>
      </div>
      <div v-for="input in textInputs" v-bind:key="input.name" class="infoBox">
        <label v-bind:for="input.name" v-html="input.text"></label>
        <div class="infoInput">
          <input v-bind:readonly="input.name == 'dept'"
            v-bind:id="input.name"
            v-bind:type="input.type"
            v-model="input.value"
            v-on:input="inputHandler(input.name)"
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
        <router-link :to="{ name: 'login'}" class="fr">返回登录</router-link>
      </p>
    </div>
    <!-- <div v-transfer-dom>
      <loading :show="loading" text="注册中"></loading>
    </div> -->
    <!-- <toast v-model="loginOK">注册成功</toast> -->
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
      deptList: [
        {
          name: "中国",
          value: "china",
          parent: "0" // 为一级时可以不写 parent，但是此时允许为数字 0、空字符串或者字符串 '0'
        },
        {
          name: "美国",
          value: "USA",
          parent: "0"
        },
        {
          name: "广东",
          value: "china001",
          parent: "china"
        },
        {
          name: "广西",
          value: "china002",
          parent: "china"
        },
        {
          name: "美国001",
          value: "usa001",
          parent: "USA"
        },
        {
          name: "美国002",
          value: "usa002",
          parent: "USA"
        },
        {
          name: "广州",
          value: "gz",
          parent: "china001"
        },
        {
          name: "深圳",
          value: "sz",
          parent: "china001"
        },
        {
          name: "广西001",
          value: "gx001",
          parent: "china002"
        },
        {
          name: "广西002",
          value: "gx002",
          parent: "china002"
        },
        {
          name: "美国001_001",
          value: "0003",
          parent: "usa001"
        },
        {
          name: "美国001_002",
          value: "0004",
          parent: "usa001"
        },
        {
          name: "美国002_001",
          value: "0005",
          parent: "usa002"
        },
        {
          name: "美国002_002",
          value: "0006",
          parent: "usa002"
        }
      ],
      danweiValue: [],
      showPopup: false,
      confirmPwdIconType: "",

      tips: {
        isEmpty: true,


      },
      deptNmuber: "", // 单位编号
      deptId: "", // 部门
      textInputs: [
        {
          value: "",
          icon: "",
          type: "text",
          name: "dept",
          text: "<span class='required'>*</span> 所属单位:"
        },
        {
          value: "",
          icon: "",
          type: "number",
          name: "id",
          text: "<span class='required'>*</span> 身份证号:"
        },
        {
          value: "",
          icon: "",
          type: "text",
          name: "name",
          text: "<span class='required'>*</span> 真实姓名:"
        },
        {
          value: "",
          icon: "",
          type: "text",
          name: "username",
          text: "<span class='required'>*</span> 姓&emsp;&emsp;名:"
        },
        {
          value: "",
          icon: "",
          type: "tel",
          name: "phone",
          text: "<span class='required'>*</span> 手机号码:"
        },
        {
          value: "",
          icon: "",
          type: "password",
          name: "userPwd",
          text: "<span class='required'>*</span> 密&emsp;&emsp;码:"
        },
        {
          value: "",
          icon: "",
          type: "password",
          name: "confirmPwd",
          text: "<span class='required'>*</span> 确认密码:"
        }
      ]
    };
  },
  methods: {
    _getData() {
      const { textInputs } = this;
      const data = {};
      textInputs.forEach(input => {
        if (input.name === "confirmPwd") {
          return false;
        }
        data[input.name] = input.value;
      });
      console.log("=======================");
      console.log(data);
      console.log("=======================");
      return data;
    },
    _isEmpty4Item(name) {
      const { textInputs } = this;
      textInputs.forEach(input => {
        if (input.name === name) {
          input.icon = input.value.trim() === "" ? "warn" : "success";
        }
      });
    },
    _isEmpty4All() {
      const { textInputs } = this;
      
      textInputs.forEach(input => {
        input.icon = input.value.trim() === "" ? "warn" : "";
      });

      this.tips.isEmpty = textInputs.some(input => input.value.trim() === "");
    },
    _confirmPwd() {
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
        confirmPwdInput.icon = userPwdInput.value === confirmPwdInput.value ? "success" : "warn";
      }
    },
    inputHandler(name) {
      const { textInputs } = this;

      const input = textInputs.filter(input => input.name === name)[0];

      // 判断是否为空
      if (input.value.trim() === "") {
        input.icon = "warn";
        return;
      } else if (input.value.trim() != "" && input.icon === "warn") {
        input.icon = "";
      }

      // 判断手机号
      if (name === "phone") {
        let reg = /^\d{0,11}$/;
        let isNum = reg.test(input.value);
        if (!isNum) {
          input.icon = "warn";
          return;
        } else if (isNum && input.icon === "warn") {
          input.icon = "";
        }
      }

      if (name === "confirmPwd") {
        this._confirmPwd();
      }
    },
    register() {
      this._isEmpty4All();
      this._confirmPwd();

      if (this.tips.isEmpty) {
        alert('请填写完整');
        return;
      }

      const vm = this;
      const data = vm._getData();
      vm.loading = true;

      console.log("=======================");
      console.log(data);
      console.log("=======================");
      let url = "/api/register";
      const options = {
        url,
        // data,
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      };
      vm
        .$http(options)
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
            // vm.tips = "用户名或密码错误";
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setCompanyName() {
      const arr = [];
      const { deptList, danweiValue, textInputs } = this;
      console.log("danweiValue", danweiValue);
      let name = "";
      danweiValue.forEach(function(item, index) {
        deptList.forEach(function(item2) {
          if (item2.value === item && index + 1 === danweiValue.length) {
            name += item2.name;
          }
        });
      });
      console.log("danweiValue", danweiValue);
      console.log("name", name);
      textInputs.forEach(item => {
        if (item.name === "dept") {
          item.value = name.trim();
          this._isEmpty4Item("dept");
        }
      });
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
.logoBox {
  text-align: center;
  margin: 20px 0;
}

.infoBox {
  margin-bottom: 20px;
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
form {
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
form input {
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
  width: 60%;
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
