<template>
  <div><h1>忘记密码</h1></div>
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
      
    }
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
