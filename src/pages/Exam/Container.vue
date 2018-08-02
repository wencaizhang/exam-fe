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
            const data = JSON.parse(resp.data.paperDuce.details);
            util.setQuestionIds(data);

            console.log(util.getQuestionIds())

            const idList = []
            data.forEach(item => {
              const list = JSON.parse(item.ids);
              list.forEach((id) => {
                idList.push( { id, score: item.score } );
              })
            });

            vm.$store.commit('setIdList', idList);
            

            vm.getQuestionById(idList[0]['id']);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getQuestionById (id) {
      // const ids = util.getQuestionIds()
      // let id = JSON.parse(ids[0]['ids'])[0];  
      // let id = 175618
      // console.log('ids', ids);

      const vm = this;
      const data = { id: id };

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
            const data = {}
            Object.assign(data, { optionList: resp.data.optionList }, resp.data.questionManagementEntity);

            const list = [
              {flag: "D", managementId: 175618, id: "0326bbad-2082-4688-b35e-a8f8dfc5297b", content: "发发发冠福股份"},
              {flag: "A", managementId: 175618, id: "0745ed36-3327-4558-b86b-0482fdfa6ebc", content: "1"},
              {flag: "B", managementId: 175618, id: "1679052d0d65408881077609592a9e72", content: " 电压三角形 "},
              {flag: "C", managementId: 175618, id: "231db938-b40e-42ad-aa53-4830f3b7ccbd", content: "玉桃园"},
            ];

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
            vm.$store.commit('changeId', data.id);
            vm.$store.commit('toggleShowQuestion', true);

            console.log(vm.$store.state.exam.idList)
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getCurrentIdByRoute () {
      let id = this.$route.params.id;
      
      if (id) {
        // this.getQuestionById(id);
      } else {
        // 
      }
    }
  },
  created() {
    this.getIds();
    // this.getCurrentIdByRoute();
  }
};
</script>
<style>

</style>
