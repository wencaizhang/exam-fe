<template>
  <div class="">
    <template v-if="loading">
      <spinner :class="$style.spinner" type="bubbles" size="100px"></spinner>
    </template>
    <template v-else>
      <Header></Header>
      <Questions></Questions>
      <Footer></Footer>
      <PopupChecker></PopupChecker>
      <Modal></Modal>
    </template>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { Spinner } from "vux";

import Header from "./Header";
import Questions from "./Questions";
import Footer from "./Footer";
import PopupChecker from "./PopupChecker";
import Modal from "./Modal";

import util from "../../util/util.js";
import qs from "qs";
import { debug } from 'util';
export default {
  data() {
    return {
      loading: true,
    };
  },
  components: {
    Spinner,
    Header,
    Questions,
    Footer,
    PopupChecker,
    Modal
  },
  methods: {
    getQuestionById (index) {
      const vm = this;

      const idList = vm.$store.state.exam.idList;
      if (!idList.length) {
        vm.$router.push({ name: 'waitforexam' })
        return;
      };

      const question = idList[index]['question'];

      if (question) {
        // 如果题目已经被缓存，就不需要重新请求
        vm.$store.commit('changeIndex', index);
        vm.$store.commit('changeId', question.id);
        vm.$store.commit('toggleShowQuestion', true);

        return;
      };

      const data = {
        ids: [ idList[index]['id'] ]
      }


      let url = '/exam/equestionmanagement/getByIds';
      const options = {
        url,
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: data,
        // headers: { 'content-type': 'application/x-www-form-urlencoded' },
        // data: qs.stringify(data),
      };
      
      this.$http((options))
        .then(function(resp) {
          if (resp.data.code == 0) {
            vm.loading = false;
            const data = {}
            const list = resp.data.list;

            vm.$store.commit('pushQuestion', list);
            vm.$store.commit('changeIndex', index);
            vm.$store.commit('changeId', list[0].id);
            vm.$store.commit('toggleShowQuestion', true);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getIndexByRoute () {
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
    this.getIndexByRoute();

    let timestamp = Date.parse( new Date());
    this.$store.commit('setStartTime', timestamp);
  }
};
</script>
<style module>
.spinner {
  display: block!important;
  margin: 100px auto;
}

</style>
