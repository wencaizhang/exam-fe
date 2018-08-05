<template>
  <x-header  :left-options="{preventGoBack: true}" @on-click-back="backHandler">{{ time }}<a slot="right" @click="togglePause">{{ buttonText }}</a></x-header>
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
      return this.$store.getters.getDuringTime;
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
      this.$store.commit('togglePause', true); // 暂停
      clearInterval(this.timer);
    },
    restart () {
      const vm = this;
      this.$store.commit('togglePause', false);  // 开始
      vm.timer = setInterval(() => {
        if (!this.$store.state.exam.isPaused || this.$store.state.exam.showModal) {
          this.$store.commit('addDuringSeconds', 1);
        }
      }, 1000);

    },
    backHandler () {
      this.$router.push( { name: 'waitforexam' })
    }
  },
  mounted () {
    this.restart();
  }
};
</script>
<style>

</style>
