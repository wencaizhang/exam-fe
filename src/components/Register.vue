<template>
    <form action="">
        <div class="logoBox"><img class="logo" src="../assets/images/logo.png" alt="logo"></div>
        <div class="tips-container">
          <span class="tips">{{ tips }}</span>
        </div>
        <div class="clearfix infoBox">
            <label for="" class="name">所属单位:</label>
            <div  @click="showPic" class="infoInput companyInfo">
                <group-title class="selectInput">{{companyName}}</group-title>
            </div>
        </div> 
        <div class="clearfix infoBox">
            <label for="" class="name user_name">用户名:</label>
            <div class="infoInput"><input type="text"></div>
        </div>
        <div class="clearfix infoBox">
            <label for="" class="name">真实姓名:</label>
            <div class="infoInput"><input type="text"></div>
        </div>
        <div class="clearfix infoBox">
            <label for="" class="name">手机号码:</label>
            <div class="infoInput"><input type="text"></div>
        </div>
        <div class="clearfix infoBox">
            <label for="" class="name">密&emsp;&emsp;码:</label>
            <div class="infoInput"><input type="text"></div>
        </div>
        <div class="clearfix infoBox">
            <label for="" class="name">确认密码:</label>
            <div class="infoInput"><input type="text"></div>
        </div>

        <div v-transfer-dom>
          <popup v-model="showPopup" @on-hide="setCompanyName">
            <div class="popup0">
              <picker :data='danwei' :columns=3 v-model='danweiValue'></picker>
            </div>
          </popup>
        </div>
    </form>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import {
  PopupPicker,
  Picker,
  Popup,
  Group,
  GroupTitle,
  TransferDom
} from "vux";

export default {
  name: "Register",
  directives: {
    TransferDom
  },
  data() {
    return {
      tips: "",
      title: "所属单位：",
      danwei: [
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
      showPicker: true,
      companyName: ''
    };
  },
  components: {
    PopupPicker,
    Picker,
    Group,
    Popup,
    GroupTitle
  },
  methods: {
    setCompanyName () {
      const arr = [];
      const { danwei, danweiValue } = this;
      let name = '';
      danweiValue.forEach(function(item, index) {
        danwei.forEach(function(item2) {
          if (item2.value === item && index + 1 === danweiValue.length) {
            name += item2.name
          }
        })
      })
      this.companyName = name.trim();
    },
    showPic() {
      this.showPopup = true;
    }
  }
};
</script>

<style lang="">
@import "../assets/css/base.css";
@import "../assets/css/register.css";
</style>
