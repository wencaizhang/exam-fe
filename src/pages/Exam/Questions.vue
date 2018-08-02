<template>
  <div v-if="showQuestion" class="question-container">
    <p class="question-type">{{ getType }}</p>
    <checklist
      v-model="model"
      :title="question.content" 
      :options="question.optionList" 
      :max="max"
      :disabled="disabled"
      @on-change="change"
      label-position="right"
    ></checklist>
  </div>
</template>

<script>
import { Checklist } from "vux";

export default {
  data() {
    return {
      // model: null,
      questionTypes: [
        { val: '001', type: "单选题：", max: 1 },
        { val: '002', type: "多选题：", max: 100 },
        { val: '003', type: "判断题：", max: 1 }
      ]
    };
  },
  components: {
    Checklist
  },
  computed: {
    model: {
      get() {
        return this.$store.state.exam.anwsers[this.$store.state.exam.index];
      },
      set(value) {
        this.$store.commit({
          type: "setAnwser",
          index: this.$store.state.exam.index,
          value,
        });
      }
    },
    showQuestion () {
      return this.$store.state.exam.showQuestion;
    },
    index() {
      return this.$store.state.exam.index;
    },
    question() {
      console.log('xxxxxxxxxxxxxx', this.$store.getters.question)
      return this.$store.getters.question;
    },
    disabled() {
      return this.$store.state.exam.isPaused;
    },
    max() {
      const vm = this;
      return vm.questionTypes.filter(item => item.val === vm.question.typeId)[0][
        "max"
      ];
    },
    getType() {
      const vm = this;
      return vm.questionTypes.filter(item => item.val === vm.question.typeId)[0][
        "type"
      ];
    }
  },
  methods: {
    change(value, label) {
      console.log("选中的 key 和 value 分别是:", value, label);
      // console.log("当前index:", this.index);
      console.log(this.$store.state.exam.anwsers);
      // this.$store.commit({
      //   type: "setAnwser",
      //   index: this.index,
      //   value
      // });
    }
  },
  mounted () {
    // this.$store.commit('toggleShowQuestion', true);
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
</style>
