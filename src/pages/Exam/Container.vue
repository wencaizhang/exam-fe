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
      // const data = util.getPaperData()
      // let url = '/exam/paperProduce/produce';
      // const options = {
      //   url,
      //   method: 'POST',
      //   headers: { 'content-type': 'application/x-www-form-urlencoded' },
      //   data: qs.stringify(data),
      // };
      
      // this.$http((options))
      //   .then(function(resp) {
      //     if (resp.data.code == 0) {
      //       util.setQuestionIds(JSON.parse(resp.data.paperDuce.details));
      //       vm.getQuestionById();
      //     }
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });


      const data = [
        {
          "ids": "[120002, 2170, 229112, 189002, 113065, 67096, 206257, 101690, 137825, 115473]",
          "score": 1
        },{
          "ids": "[5166, 84193, 171470, 82457, 7973, 115224, 190846, 132305, 165520, 69885]",
          "score": 2
        },{
          "ids": "[28004, 14591, 109711, 110712, 188112, 58919, 196827, 235908, 195980, 231967, 40922, 149710, 108115, 187706, 228859, 11252, 79933, 56056, 171214, 218352]",
          "score": 2
        },{
          "ids": "[148334, 225306, 206420, 179827, 7111, 58222, 164525, 39595, 211159, 86236]",
          "score": 3
        }
      ];

      const idList = []
      data.forEach(item => {
        const list = JSON.parse(item.ids);
        list.forEach((id) => {
          idList.push( { id, score: item.score } );
        })
      });

      this.$store.commit('setIds', idList);
      console.log(this.$store.state.exam.ids)
    },
    getQuestionById (id) {
      const ids = util.getQuestionIds()
      // let id = JSON.parse(ids[0]['ids'])[0];  
      // let id = 175618
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
