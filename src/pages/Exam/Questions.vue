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
        return this.$store.state.exam.idList[this.$store.state.exam.index]['myAnswer'] || [];
      },
      set(value) {
        this.$store.commit({
          type: "setAnwser",
          value,
        });
      }
    },
    question() {
      return this.$store.getters.question || {};
    },
    disabled() {
      return this.$store.state.exam.isPaused;
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
