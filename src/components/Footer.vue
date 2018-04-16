<template>
    <footer class="footer">
    <tabbar>
      <tabbar-item link="/home">
	<span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item show-dot link="user-login">
	<span slot="label">登录</span>
	<!-- <span slot="label">排行榜</span> -->
      </tabbar-item>
      <tabbar-item selected link="/component/demo">
	<span slot="label">成绩查询</span>
      </tabbar-item>
      <tabbar-item badge="2" link="/user">
	<span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
</footer>
</template>

<script>
import Vue from "vue";

import { Tabbar, TabbarItem } from "vux";
export default {
  data() {
    return {
    };
  },
  components: {
    Tabbar,
    TabbarItem
  },
  methods: {
  }
};
</script>
<style>

</style>
