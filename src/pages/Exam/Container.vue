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
    getQuestionById (index) {
      const vm = this;
      let id = vm.$store.state.exam.idList[index]['id']
      const data = { id: id };

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
            const data = {}
            const list = resp.data.optionList;
            Object.assign(data, resp.data.questionManagementEntity);

            list.sort( (a, b) => {
              var s = a.flag.toLowerCase();
              var t = b.flag.toLowerCase();
              if(s < t) return -1;
              if(s > t) return 1;
            });

            data.optionList = list.map(item => {
              return {
                key: item.flag,
                value: item.flag,
                inlineDesc: item.content
              }
            })

            vm.$store.commit('pushQuestion', data);
            vm.$store.commit('changeIndex', data.id);
            vm.$store.commit('toggleShowQuestion', true);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getCurrentIdByRoute () {
      let index = this.$route.params.index || 0;
      this.getQuestionById(index);
    }
  },
  watch: {
    '$route': function (newV) {
      this.getQuestionById(newV.params.index);
    }
  },
  created() {
    this.getCurrentIdByRoute();
  }
};
</script>
<style>

</style>
