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
    fetchAllQuestions () {
      const ids = this.$store.state.exam.idList.map(item => item.id)
      const data = { ids: ids }

      let url = '/sage/exam/equestionmanagement/getByIds';
      
      axios.post(url, data).then(resp => {
        if (resp.data.code == 0) {
          this.loading = false
          this.$store.commit('pushQuestion', resp.data.list);

          // id 和 index 同时改变
          this.$store.commit('changeIndex', 0);
          this.$store.commit('changeId', resp.data.list[0].id);
        }
      })
    },
    // getQuestionById (index=0) {

    //   const idList = this.$store.state.exam.idList;
    //   if (!idList.length) {
    //     this.$router.push({ name: 'waitforexam' })
    //     return;
    //   };

    //   const question = idList[index]['question'];

    //   if (question) {
    //     // 如果题目已经被缓存，就不需要重新请求
    //     this.$store.commit('changeIndex', index);
    //     this.$store.commit('changeId', question.id);

    //     return;
    //   };

    //   const data = {
    //     ids: [ idList[index]['id'] ]
    //   }

    //   let url = '/sage/exam/equestionmanagement/getByIds';
    //   const options = {
    //     url,
    //     method: 'POST',
    //     headers: { 'content-type': 'application/json' },
    //     data: data,
    //   };
      
    //   axios((options))
    //     .then(resp => {
    //       if (resp.data.code == 0) {
    //         this.loading = false;
    //         const data = {}
    //         const list = resp.data.list;

    //         this.$store.commit('pushQuestion', list);
    //         // id 和 index 同时改变
    //         this.$store.commit('changeIndex', index);
    //         this.$store.commit('changeId', list[0].id);
    //       }
    //     });
    // },
    // getIndexByRoute () {
    //   let index = this.$route.params.index || 0;
    //   this.getQuestionById(index);
    // }
  },
  created() {
    // this.getIndexByRoute();

    this.fetchAllQuestions();

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
