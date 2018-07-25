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

import util from "../../util/util.js";
import qs from "qs";
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
  methods: {
    getIds () {
      const vm = this;
      const data = util.getPaperData()
      let url = '/exam/paperProduce/produce';
      const options = {
        url,
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
      };
      
      this.$http((options))
        .then(function(resp) {
          if (resp.data.code == 0) {
            util.setQuestionIds(JSON.parse(resp.data.paperDuce.details));
            vm.getQuestion();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getQuestion () {
      const ids = util.getQuestionIds()
      // let id = JSON.parse(ids[0]['ids'])[0];  
      let id = 175618
      console.log('ids', ids);

      const vm = this;
      const data = { id: id }
      console.log('data', data);

      let url = '/exam/equestionmanagement/selectOne';
      const options = {
        url,
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
      };
      
      this.$http((options))
        .then(function(resp) {
          if (resp.data.code == 0) {
            console.log(resp.data)
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.getIds();
  }
};
</script>
<style>

</style>
