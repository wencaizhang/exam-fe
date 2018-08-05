<template>
  <div :class="$style.container">
    <div :class="$style['fast-entry']">
      <h3 :class="$style.h3">快速考试入口</h3>
      <p>通过已有的准考证快速参加考试，具体的准考信息请咨询相关人事。</p>
      <!-- <router-link :to="{path: '/resourceList'}">快速考试</router-link> -->
      <XButton :class="$style.btn" type="primary" text="快速进入考试" link="/waitforexam"></XButton>
    </div>
    <div :class="$style.message">
      <h3 :class="$style.h3">活动信息</h3>
      <h1>{{ id }}</h1>
      <p>好消息好消息好消息好消息好消息好消息好消息好消息好消息好消息</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";

import { XButton } from "vux";
export default {
  data() {
    return {};
  },
  components: {
    XButton
  },
  methods: {
    login() {
      const vm = this;
      const { username, password } = vm;
      axios
        .post("/login", {
          username,
          password
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  }
};
</script>
<style module>
.h3 {
  text-align: center;
  margin-bottom: 10px;
}
.message {
  padding: 10%;
}
.fast-entry {
  padding: 10%;
  border-bottom: 1px solid #ccc;
}
.btn {
  margin-top: 20px;
}
</style>
