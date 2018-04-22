<template>
  <div class="">
    <Header></Header>
    <Questions></Questions>
    <Footer></Footer>
    <PopupChecker></PopupChecker>
    <Modal></Modal>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Header from "./Header";
import Question from "./Question";
import Questions from "./Questions";
import Footer from "./Footer";
import PopupChecker from "./PopupChecker";
import Modal from "./Modal";

export default {
  data() {
    return {};
  },
  components: {
    Header,
    Question,
    Questions,
    Footer,
    PopupChecker,
    Modal
  },
  methods: {}
};
</script>
<style>

</style>
