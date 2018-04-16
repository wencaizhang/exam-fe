<template>
    <div class="container">
      <x-button @click.native="toggleQuestion(0)" mini plain type="primary">上一题</x-button>
      <x-button @click.native="toggleQuestion(1)" mini plain type="primary">下一题</x-button>
      <div>
        <x-button @click.native="finish" mini plain type="primary">交卷</x-button>
        <span>{{ currNum }} / {{ totalNum }}</span>
        <x-button @click.native="showAll" mini plain type="primary">所有题目</x-button>
      </div>
    </div>
</template>

<script>
import Vue from "vue";

import { XButton } from "vux";
export default {
  props: [],
  data() {
    return {
      currNum: 1,
      totalNum: 10
    };
  },
  components: {
    XButton
  },
  methods: {
    toggleQuestion (value) {
      if (value === 0) {

      }
    },
    finish () {

    },
    showAll() {
      
    }
  },
  mounted () {
    this.restart();
  }
};
</script>
<style>

</style>
