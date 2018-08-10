<template>
  <div class="footer footer-container">
    <flexbox justify="space-between" class="btn-group btn-group-1">
      <flexbox-item>
        <div :class="[ 'icon-wrap', 'icon-arrow', 'icon-arrow-left', { disabled: isFirst } ]" @click="toPrev">
          <x-icon type="ios-arrow-left"  size="30"></x-icon>
        </div>
      </flexbox-item>
      <flexbox-item class="text-align-center">
        <div class="icon-star" @click="markHandler">
          <x-icon v-show="isMarked" type="ios-star" size="32"></x-icon>
          <x-icon v-show="!isMarked"  type="ios-star-outline" size="32"></x-icon>
        </div>
      </flexbox-item>
      <flexbox-item class="text-align-right">
        <div :class="[ 'icon-wrap', 'icon-arrow', 'icon-arrow-left', { disabled: isLast } ]" @click="toNext">
          <x-icon type="ios-arrow-right" size="30"></x-icon>
        </div>
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
      is: false,
    };
  },
  computed: {
    index() {
      return this.$store.state.exam.index || 0;
    },
    isMarked () {
      return this.$store.state.exam.marked;
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
      this.$store.commit('setAnswerNum');
      this.$store.commit("showModal", true);
    },
    showAll() {
      this.$store.commit("showAll", true);
    },
    markHandler() {
      this.$store.commit('marked');
      this.$store.commit('changeMarkText');
    },
  },
  mounted() {
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

/* x-icon 颜色 */
.vux-x-icon {
  fill: #1aad19;
}
.icon-wrap {
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 1px solid #1aad19;
  border-radius: 50%;
}

.icon-wrap.disabled .vux-x-icon {
  fill: #ccc;
}
.icon-wrap.disabled {
  border: 1px solid #ccc;
}

</style>
