<template>
    <div class="">
      <Header></Header>
      <Content></Content>
      <Footer></Footer>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

import { XButton } from "vux";
export default {
  data() {
    return {
    };
  },
  components: {
    Header,
    Content,
    Footer,
    XButton
  },
  methods: {
  }
};
</script>
<style>

</style>
