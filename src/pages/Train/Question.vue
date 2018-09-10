<template>
    <section>
        <x-header>答题模式</x-header>
        <div class="question-container">
            <p class="question-type">{{ getType }}{{ count }}</p>
            <!-- <Type :typeId="question.typeId"/> -->
            <checklist
              v-model="model"
              :title="question.content" 
              :options="optionList || []" 
              :max="max"
              :disabled="disabled"
              label-position="right"
            >
            </checklist>
            <!-- <div v-if="analysis" style="padding: 30px; border: 1px solid #f2f2f2;">
                <p>正确答案：{{ question.answerId }}</p>
                <p>回答情况：{{ question.isRight ? '正确' : '错误' }}</p>
            </div> -->
        </div>
        <footer class="footer">
          <flexbox justify="space-between" class="flexboxWrap">
            <flexbox-item class="flexboxItem" :class="isFirst ? 'disabled' : ''" @click.native="toPrev">上一题</flexbox-item>
            <flexbox-item class="flexboxItem" >答题卡</flexbox-item>
            <flexbox-item class="flexboxItem" >收藏</flexbox-item>
            <flexbox-item class="flexboxItem" :class="isLast ? 'disabled' : ''" @click.native="toNext">下一题</flexbox-item>
          </flexbox>
        </footer>
    </section>
</template>

<script>
import { Checklist, XHeader, Flexbox, FlexboxItem } from "vux";

import Type from '../../components/QuestionType'

export default {
  data() {
    return {};
  },
  components: {
    Checklist,
    XHeader,
    Type,
    Flexbox,
    FlexboxItem
  },
  computed: {
    model: {
      get() {
        return this.question.myAnswer || [];
      },
      set(value) {
        this.$store.commit("setTrainQuestionAnwser", value);
      }
    },
    optionList() {
      return this.question.optionList.map(item => {
        return {
          key: item.flag,
          value: item.flag,
          inlineDesc: item.flag + ': ' + item.content
        };
      });
    },
    question() {
      return this.$store.state.section.questionList[
        this.$store.state.section.questionIndex
      ];
    },
    disabled() {
      return false;
      //   return this.analysis ? true : this.$store.state.exam.isPaused;
    },
    // analysis () {
    //   return this.$store.state.exam.analysis;
    // },
    max() {
      const questionTypes = [
        { val: "001", type: "单选题：", max: 1 },
        { val: "002", type: "多选题：", max: 100 },
        { val: "003", type: "判断题：", max: 1 }
      ];
      let { typeId = "001" } = this.question || {};
      const filter = questionTypes.filter(item => item.val === typeId);
      return filter.length ? filter[0]["max"] : 10;
    },
    getType () {
      const questionTypes = [
        { val: "001", type: "单选题：", max: 1 },
        { val: "002", type: "多选题：", max: 100 },
        { val: "003", type: "判断题：", max: 1 }
      ];
      let { typeId='001', score=0 } = this.question || {};

      const filter = questionTypes.filter( item => item.val === typeId );
      return filter.length ? filter[0]["type"]  : '没有题目';
    },
    isFirst () {
      return this.$store.state.section.questionIndex <= 0
    },
    isLast () {
      let length = Object.keys(this.$store.state.section.questionList).length
      return this.$store.state.section.questionIndex + 1 >= length
    },
    count () {
      let length = Object.keys(this.$store.state.section.questionList).length
      let index = this.$store.state.section.questionIndex
      return index + 1 + '/' + length
    }
  },
  methods: {
    toPrev() {
      if (this.isFirst) return;
      this.$store.commit("changeQuestionIndex", this.$store.state.section.questionIndex - 1);
    },
    toNext() {
      if (this.isLast) return;
      this.$store.commit("changeQuestionIndex", this.$store.state.section.questionIndex + 1);
    },
    finish() {
      this.$store.commit('setAnswerNum');
      this.$store.commit("showModal", true);
    },
    showAll() {
      this.$store.commit("showAll", true);
    },
    markHandler() {
      if (this.analysis) { return }
      this.$store.commit('marked');
      this.$store.commit('changeMarkStatus');
    },
  },
  mounted() {}
};
</script>

<style>
.question-container {
  margin-top: 40px;
  padding-bottom: 110px;
}
.question-type {
  padding-left: 15px;
  padding-right: 15px;
}
.question-container .weui-cell__bd p {
  display: none;
}
.question-container .weui-cells__title {
  margin-bottom: 20px;
  color: #000;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.flexboxWrap {
  border-top: 1px solid #f2f2f2;
}
.flexboxItem {
  text-align: center;
  padding: 8px 0;
  margin: 0!important;
  border-left: 1px solid #f2f2f2;
}
.flexboxItem:first {
  border: 0;
}
.flexboxItem.disabled {
  color: #ccc;
}
</style>

