<template>
  <footer class="footer">
    <tabbar>
      <tabbar-item :selected="$route.name === 'home'" link="/home">
        <img slot="icon"        src="../assets/images/home.png">
        <img slot="icon-active" src="../assets/images/home2.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item :selected="$route.name === 'rank'" link="/rank">
        <img slot="icon"        src="../assets/images/heat-map.png">
        <img slot="icon-active" src="../assets/images/heat-map2.png">
        <span slot="label">闯关</span>
      </tabbar-item>
      <tabbar-item :selected="$route.name === 'user'" link="/user">
        <img slot="icon"        src="../assets/images/user.png">
        <img slot="icon-active" src="../assets/images/user2.png">
        <span slot="label">我</span>
      </tabbar-item>
    </tabbar>
  </footer>
</template>

<script>
import Vue from "vue";

import { Tabbar, TabbarItem } from "vux";
export default {
  data() {
    return {};
  },
  components: {
    Tabbar,
    TabbarItem
  },
  methods: {},
  // watch: {
  //   '$route': function (newV) {
  //     console.log(newV)
      
  //   }
  // },
};
</script>
<style>
.footer img {
  width: 20px!important;
  height: 20px!important;
}
</style>
