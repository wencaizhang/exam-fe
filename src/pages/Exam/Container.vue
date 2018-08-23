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

      const idList = this.$store.state.exam.idList;
      if (!idList.length) {
        this.$router.push({ name: 'waitforexam' })
        return;
      };

      const question = idList[index]['question'];

      if (question) {
        // 如果题目已经被缓存，就不需要重新请求
        this.$store.commit('changeIndex', index);
        this.$store.commit('changeId', question.id);
        this.$store.commit('toggleShowQuestion', true);

        return;
      };

      const data = {
        ids: [ idList[index]['id'] ]
      }

      let url = '/sage/exam/equestionmanagement/getByIds';
      const options = {
        url,
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: data,
      };
      
      axios((options))
        .then(resp => {
          if (resp.data.code == 0) {
            this.loading = false;
            const data = {}
            const list = resp.data.list;

            this.$store.commit('pushQuestion', list);
            // id 和 index 同时改变
            this.$store.commit('changeIndex', index);
            this.$store.commit('changeId', list[0].id);
            this.$store.commit('toggleShowQuestion', true);
          }
        });
    },
    getIndexByRoute () {
      let index = this.$route.params.index || 0;
      this.getQuestionById(index);
    }
  },
  watch: {
    '$route': (to, from) => {
      if (to.name == 'exam' && from.name == 'exam') {

      }

      this.getQuestionById(to.params.index);
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
