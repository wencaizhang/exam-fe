<template>
	<div class="question-container">
		<p class="question-type">{{ getType }}</p>
		<checklist
      v-model="model"
			:title="question.title" 
			:options="question.options" 
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
      questionTypes: [
        { val: 1, type: "单选题：", max: 1 },
        { val: 2, type: "多选题：", max: 100 },
        { val: 3, type: "判断题：", max: 1 }
      ]
    };
  },
  components: {
    Checklist
  },
  computed: {
    model: {
      get() {
        console.log('get anwser:', this.$store.state.anwsers[this.$store.state.index])
        return this.$store.state.anwsers[this.$store.state.index];
      },
      set(value) {
        console.log('=============')
        console.log('anwsers: ', this.$store.state.anwsers)
        console.log(value)
        console.log('=============')
        this.$store.commit({
          type: "setAnwser",
          index: this.$store.state.index,
          value,
        });
      }
    },
    index() {
      return this.$store.state.index;
    },
    question() {
      return this.$store.getters.question;
    },
    disabled() {
      return this.$store.state.isPaused;
    },
    max() {
      const vm = this;
      return vm.questionTypes.filter(item => item.val === vm.question.type)[0][
        "max"
      ];
    },
    getType() {
      const vm = this;
      return vm.questionTypes.filter(item => item.val === vm.question.type)[0][
        "type"
      ];
    }
  },
  methods: {
    change(value, label) {
      console.log("选中的 key 和 value 分别是:", value, label);
      // console.log("当前index:", this.index);
      // console.log(this.$store.state.anwsers);
      // this.$store.commit({
      //   type: "setAnwser",
      //   index: this.index,
      //   value
      // });
    }
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
