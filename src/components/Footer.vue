<template>
  <footer class="footer">
    <tabbar>
      <tabbar-item selected link="/home">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="/rank">
        <span slot="label">排行榜</span>
      </tabbar-item>
      <!-- <tabbar-item show-dot link="">
        <span slot="label">练习</span>
      </tabbar-item> -->
      <tabbar-item badge="2" link="/user">
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
  methods: {}
};
</script>
<style>

</style>
