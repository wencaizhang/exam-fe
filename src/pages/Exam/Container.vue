<template>
    <div class="">
      <Header></Header>
      <Question></Question>
      <Footer></Footer>
      <PopupChecker></PopupChecker>
    </div>
</template>

<script>
import Vue from "vue";
import store from '../../store/index.js'
import axios from "axios";
import Header from "./Header";
import Question from "./Question";
import Footer from "./Footer";
import PopupChecker from "./PopupChecker";

export default {
  data() {
    return {
   };
  },
  components: {
    Header,
    Question,
		PopupChecker,
    Footer,
  },
  methods: {
  }
};
</script>
<style>

</style>
