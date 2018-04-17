<template>
    <div class="">
      <Header></Header>
      <Question :questions="questions"></Question>
      <Footer @toggleQuestion="toggleQuestion"
        :currIndex="currIndex"
        :length="questions.length"
      ></Footer>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Header from "./Header";
import Question from "./Question";
import Footer from "./Footer";

export default {
  data() {
    return {
      currIndex: 0,
      questions: [
        {
          type: 1,
          title: '你最爱的国家是：',
          options: [
            {key:'America', value:'A:',inlineDesc:'超级大国美国'},
            {key:'Japan',   value:'B:',inlineDesc:'小日本儿'},
            {key:'China',   value:'C:',inlineDesc:'大中国'}
          ],
        },
        {
          type: 2,
          title: '你最爱的游戏是：',
          options: [
            {key:'LoL', value:'A:', inlineDesc:'英雄联盟'},
            {key:'WOW', value:'B:', inlineDesc:'魔兽世界'},
            {key:'tank', value:'C:', inlineDesc:'坦克大战'},
            {key:'xyz', value:'D:', inlineDesc:'其他'}
          ],
        },
        {
          type: 3,
          title: '我猜你是个小仙女：',
          options: [
            {key:'true', value:'A:', inlineDesc:'正确'},
            {key:'false', value:'B:', inlineDesc:'错误'},
          ],
        }
      ],
    };
  },
  components: {
    Header,
    Question,
    Footer,
  },
  methods: {
    toggleQuestion (v) {
      let newIndex = this.currIndex + v;
      console.log(newIndex)
      console.log(this.currIndex)
      if (newIndex >= 0 && newIndex < length) {
        this.currIndex = newIndex;
      }
      console.log(this.currIndex)
    }
  }
};
</script>
<style>

</style>
