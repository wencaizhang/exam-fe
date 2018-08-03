<template>
  <div class="footer footer-container">
    <flexbox justify="space-between" class="btn-group btn-group-1">
      <flexbox-item>
        <x-button mini plain type="primary"
          @click.native="toPrev"
          :disabled="isFirst"
        >
        上一题
        </x-button>
      </flexbox-item>
      <flexbox-item class="text-align-right">
        <x-button mini plain type="primary"
          @click.native="toNext"
          :disabled="isLast"
        >
        下一题
        </x-button>
      </flexbox-item>
    </flexbox>

    <flexbox class="btn-group btn-group-2">
      <flexbox-item>
        <x-button @click.native="finish" mini plain type="primary">交卷</x-button>
      </flexbox-item>
      <flexbox-item class="text-align-center">
        <span class="question-num">{{ index + 1 }}/{{ length }}</span>
      </flexbox-item>
      <flexbox-item class="text-align-right">
        <x-button :disabled="isAbleShowAll" @click.native="showAll" mini plain type="primary">所有题目</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import Vue from "vue";
import { XButton, Flexbox, FlexboxItem } from "vux";

export default {
  data() {
    return {
      is: false
    };
  },
  computed: {
    index() {
      return this.$store.state.exam.index || 0;
    },
    length() {
      return this.$store.getters.length;
    },
    isFirst() {
      return this.index <= 0 || this.$store.state.exam.isPaused;
    },
    isLast() {
      return this.index + 1 >= this.length || this.$store.state.exam.isPaused;
    },
    isAbleShowAll () {
      return this.$store.state.exam.isPaused;
    }
  },
  components: {
    XButton,
    Flexbox,
    FlexboxItem
  },
  methods: {
    toPrev() {
      if (this.isFirst) return;
      this.$store.commit('toggleShowQuestion', false);
      this.$store.commit('toggleShowQuestion', true);
      this.$store.commit("toPrev");
    },
    toNext() {
      if (this.isLast) return;
      this.$store.commit('toggleShowQuestion', false);
      this.$store.commit('toggleShowQuestion', true);
      this.$store.commit("toNext");
    },
    finish() {
      // console.log('=============')
      // console.log(this.$store.state.exam.anwsers)
      // console.log('=============')
      this.$store.commit("showModal", true);
    },
    showAll() {
      console.info("showAll, footer");
      this.$store.commit("showAll", true);
    }
  },
  mounted() {}
};
</script>
<style>
.text-align-right {
  text-align: right;
}
.text-align-center {
  text-align: center;
}
.btn-group {
  padding: 10px;
  box-sizing: border-box;
}
.btn-group-2 {
  border-top: 1px solid #f2f2f2;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
