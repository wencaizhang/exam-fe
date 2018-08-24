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
          this.$store.commit("changeQuestionByIndex", 0);
        }
      })
    },
  },
  created() {
    this.$store.dispatch('resetState')

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
