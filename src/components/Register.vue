<template>
    <form action="">
        <div class="logoBox"><img class="logo" src="../assets/images/logo.png" alt="logo"></div>
        <div class="tips-container">
          <span class="tips">{{ tips }}</span>
        </div>
        <div class="clearfix infoBox">
            <label for="" class="name">所属单位:</label>
            <div class="infoInput companyInfo">
                <div @click="showPic">
                    <group-title class="selectInput">{{companyName}}</group-title>
                </div>
                <picker :data="danwei" :columns="3" :show="showPicker" v-model="companyName"></picker>
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
    </form>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { Picker, GroupTitle } from "vux";

export default {
  name: "Register",
  data() {
    return {
      tips: "",
      showPicker: false,
      danwei: [
        {
          name: "中国",
          value: "china",
          parent: 0
        },
        {
          name: "美国",
          value: "USA",
          parent: 0
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
          value: "gz",
          parent: "china002"
        },
        {
          name: "广西002",
          value: "sz",
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
      companyName: null,
    };
  },
  components: {
    Picker,
    GroupTitle
  },
  methods: {
    showPic() {
        this.showPicker = !this.showPicker;
    }
  }
};
</script>

<style lang="">
@import "../assets/css/base.css";
@import "../assets/css/register.css";
</style>
