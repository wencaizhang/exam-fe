<template>
    <div class="header">
      <x-button class="return" mini type="primary" link="BACK">返回</x-button>
      <span>{{ time }}</span>
      <x-button class="pause" @click.native="handlerButtonClick" mini type="warn">{{ buttonText }}</x-button>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";

import { XButton } from "vux";
export default {
  props: [],
  data() {
    return {
      timer: null,
      seconds: 10,
      time: '',
      isPause: false,
    };
  },
  components: {
    XButton
  },
  computed: {
    buttonText () {
      return this.isPause ? '继续' : '暂停';
    }
  },
  methods: {
    handlerButtonClick () {
      this.isPause = !this.isPause;
      this.isPause ? this.pause() : this.restart();
    },
    pause () {
      clearInterval(this.timer);
    },
    restart () {
      const vm = this;
      vm.timer = setInterval(() => {
        vm.seconds += 1;
      }, 1000);
      vm.time = vm.seconds
    }
  },
  mounted () {
    this.restart();
  }
};
</script>
<style>
.header {
  text-align: center;
}
.return {
  float: left;
}
.pause {
  float: right;
}
</style>
