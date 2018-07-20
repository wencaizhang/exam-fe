<template>
  <x-header>{{ time }}<a slot="right" @click="togglePause">{{ buttonText }}</a></x-header>
</template>

<script>
import { XHeader  } from "vux";
export default {
  data() {
    return {
      seconds: 0
    };
  },
  components: {
    XHeader,
  },
  computed: {
    time () {
      var seconds = this.seconds;
      var time = '';
      var points = [
        { value: 60 * 60, suffix: '小时', max: 1 },
        { value: 60, suffix: '分钟', max: 1 },
        { value: 1, suffix: '秒', max: 1 }
      ];

      for (var i = 0; i < points.length; i++) {
        var mode = Math.floor(seconds / points[i].value);
        if (mode >= 1) {
          seconds -= points[i].value * mode
          time += Math.max(mode, points[i].max) + points[i].suffix;
        }
      }
      return time || '0秒';
    },
    buttonText () {
      return this.$store.state.exam.isPaused ? '继续' : '暂停';
    }
  },
  methods: {
    togglePause () {
      this.$store.state.exam.isPaused ? this.restart() : this.pause();
    },
    pause () {
      this.$store.commit('togglePause', true)
      clearInterval(this.timer);
    },
    restart () {
      const vm = this;
      this.$store.commit('togglePause', false)
      vm.timer = setInterval(() => {
        vm.seconds += 1;
      }, 1000);
    },

  },
  mounted () {
    this.restart();
  }
};
</script>
<style>

</style>
