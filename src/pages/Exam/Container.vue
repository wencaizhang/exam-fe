<template>
  <div class="">
    <Header></Header>
    <Question></Question>
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
    Footer,
    PopupChecker,
    Modal
  },
  methods: {}
};
</script>
<style>

</style>
