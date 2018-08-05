<template>
  <div>
    
    <p :class="$style.msg">得分：{{ score }}</p>
    <p :class="$style.msg">用时：{{ score }}</p>

    <div :class="$style.btns">
      <XButton :class="$style.btn" type="primary" text="查看答案及解析" link="/answer"></XButton>
      <XButton :class="$style.btn" type="" text="重新开始考试" link="/waitforexam"></XButton>
    </div>
  </div>
</template>

<script>
import {  Icon } from 'vux'
import { XButton } from "vux";
export default {
  components: {
    Icon,
    XButton
  },
  data () {
    return {

    }
  },
  computed: {
    score () {
      return this.$store.state.exam.totalScore;
    },
  },
  methods: {

  },
}
</script>

<style module>

</style>
