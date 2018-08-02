<template>
  <footer class="footer">
    <tabbar>
      <tabbar-item :selected="$route.name === 'home'" link="/home">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item :selected="$route.name === 'rank'" link="/rank">
        <span slot="label">排行榜</span>
      </tabbar-item>
      <tabbar-item :selected="$route.name === 'user'" link="/user">
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

</style>
