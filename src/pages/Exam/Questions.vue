<template>
  <div class="question-container">
    <p class="question-type">{{ getType }}</p>
    <checklist
      v-model="model"
      :title="question.content" 
      :options="question.optionList || []" 
      :max="max"
      :disabled="disabled"
      @on-change="change"
      label-position="right"
    ></checklist>
    <div v-if="analysis" style="padding: 30px; border: 1px solid #f2f2f2;">
      <p>正确答案：{{ question.answerId }}</p>
      <p>回答情况：{{ question.isRight ? '正确' : '错误' }}</p>
    </div>
  </div>
</template>

<script>
import { Checklist } from "vux";

export default {
  data() {
    return {
    };
  },
  components: {
    Checklist
  },
  computed: {
    questionTypes () {
      return this.$store.state.exam.questionTypes;
    },
    model: {
      get() {
        return this.$store.getters.currQuestion.myAnswer || [];
      },
      set(value) {
        this.$store.commit({
          type: "setAnwser",
          value,
        });
      }
    },
    question() {
      return this.$store.getters.currQuestion || {};
    },
    disabled() {
      return this.analysis ? true : this.$store.state.exam.isPaused;
    },
    analysis () {
      return this.$store.state.exam.analysis;
    },
    max() {
      let { typeId='001' } = this.question || {};
      const filter = this.questionTypes.filter(item => item.val === typeId)
      return filter.length ? filter[0]["max"] : 10;
    },
    getType() {
      let { typeId='001', score=0 } = this.question || {};

      const filter = this.questionTypes.filter( item => item.val === typeId );
      return filter.length ? filter[0]["type"] + score + '分' : '没有题目';
    }
  },
  methods: {
    change(value, label) {
      // console.log("选中的 key 和 value 分别是:", value, label);
    }
  },
  mounted () {
  }
};
</script>
<style>
.question-container {
  margin-top: 40px;
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
</style>
