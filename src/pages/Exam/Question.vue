<template>
    <div class="question-container">
      <p class="question-type">{{ questionType }}</p>
      <checklist
        :title="currQuestion.title" 
        :options="currQuestion.options" 
        :max="max"
        v-model="radioValue" 
        @on-change="change"
        label-position="right"
      ></checklist>
    </div>
</template>

<script>
import { Checklist } from 'vux'

export default {
  props: [ 'questions', 'currIndex' ],
  data() {
    return {
      currQuestionIndex: 1,
      questionTypes: [
        { val: 1, type: '单选题：', max: 1   },
        { val: 2, type: '多选题：', max: 100 },
        { val: 3, type: '判断题：', max: 1   },
      ]
    };
  },
  components: {
    Checklist
  },
  computed: {
    currQuestion () {
      return this.questions[this.currQuestionIndex];
    },
    max () {
      const vm = this;
      return vm.questionTypes.filter(item => item.val === vm.currQuestion.type)[0]['max'];
    },
    questionType () {
      const vm = this;
      return vm.questionTypes.filter(item => item.val === vm.currQuestion.type)[0]['type'];
    }
  },
  methods: {
    change (value, label) {
      console.log('选中的 key 和 value 分别是:', value, label)
      this.value = value;
    }
  }
};
</script>
<style>
.question-container {
  margin: 40px 0;
}
.question-type {
  padding-left: 15px;
  padding-right: 15px;
}
</style>
