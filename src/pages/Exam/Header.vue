<template>

  <div>
    <x-header 
      :left-options="{preventGoBack: true}" 
      @on-click-back="backHandler"
    >
      {{ time }}
      <!-- <a slot="right" @click="togglePause">{{ buttonText }}</a> -->
    </x-header>
    
    <div v-transfer-dom>
      <confirm 
        v-model="showModal"
        title="提示"
        confirm-text="确定退出"
        cancel-text="继续答题"
        @on-confirm="onConfirm"
      >
        <p style="text-align:center;">您即将放弃本次考试</p>
      </confirm>
    </div>
  </div>
  
</template>

<script>
import {
  Confirm,
  XHeader,
  TransferDomDirective as TransferDom
} from "vux";
export default {
  directives: {
    TransferDom
  },
  data() {
    return {
      seconds: 0,
      showModal: false
    };
  },
  components: {
    XHeader,
    Confirm
  },
  computed: {
    time () {
      // return this.$store.getters.getDuringTime;
      return this.$store.getters.getRemainingTime;
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
      this.$store.dispatch('createTimer');
    },
    backHandler () {
      this.showModal = true;
    },
    onConfirm () {
      this.$router.push( { name: 'waitforexam' });
    }
  },
  mounted () {
    this.$store.commit('resetexam')
    this.$store.dispatch('createTimer')
  }
};
</script>
<style>

</style>
