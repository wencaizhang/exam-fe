<template>
    <div class="container">
      <flexbox justify="space-between">
        <flexbox-item>
          <x-button mini plain type="primary"
            @click.native="toggleQuestion(-1)"
            :disabled="isAblePrev"
          >
          上一题
          </x-button>
        </flexbox-item>
        <flexbox-item class="text-align-right">
          <x-button mini plain type="primary"
            @click.native="toggleQuestion(1)"
            :disabled="isAbleNext"
          >
          下一题
          </x-button>
        </flexbox-item>
      </flexbox>

      <flexbox>
        <flexbox-item>
          <x-button @click.native="finish" mini plain type="primary">交卷</x-button>
        </flexbox-item>
        <flexbox-item class="text-align-center">
          <span class="question-num">{{ currIndex + 1 }}/{{ length }}</span>
        </flexbox-item>
        <flexbox-item class="text-align-right">
          <x-button @click.native="showAll" mini plain type="primary">所有题目</x-button>
        </flexbox-item>
      </flexbox>
    </div>
</template>

<script>
import Vue from "vue";
import { XButton, Flexbox, FlexboxItem } from "vux";

export default {
  props: ['currIndex', 'length'],
  data() {
    return {
      is: false
    };
  },
  computed: {
    isAblePrev () {
      return this.currIndex <= 0;
    },
    isAbleNext () {
      return this.currIndex >= this.length;
    }
  },
  components: {
    XButton,
    Flexbox,
    FlexboxItem
  },
  methods: {
    toggleQuestion (value) {
      this.$emit('toggleQuestion', value);
      if (value === -1) {
        console.log('上一题')
      } else {
        console.log('下一题')
      }
      console.log(this.currIndex, this.length)
    },
    finish () {

    },
    showAll() {
      console.log(this.currIndex, this.length)
    }
  },
  mounted () {
    this.restart();
  }
};
</script>
<style>
.text-align-right {
  text-align: right;
}
.text-align-center {
  text-align: center;
}
</style>
