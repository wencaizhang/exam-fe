<template>
    <div class="">
      <Header></Header>
      <Question></Question>
      <Footer></Footer>
    </div>
</template>

<script>
import Vue from "vue";
import store from '../../store/index.js'
import axios from "axios";
import Header from "./Header";
import Question from "./Question";
import Footer from "./Footer";

export default {
  data() {
    return {
   };
  },
  components: {
    Header,
    Question,
    Footer,
  },
  methods: {
  }
};
</script>
<style>

</style>
