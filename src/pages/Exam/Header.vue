<template>

  <div>
    <x-header 
      :left-options="{preventGoBack: true}" 
      @on-click-back="backHandler"
    >
      {{ time }}
      <a v-if="!analysis" slot="right" @click="togglePause">{{ buttonText }}</a>
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
      return this.analysis ? '考试答案分析' : this.$store.getters.getRemainingTime;
    },
    buttonText () {
      return this.$store.state.exam.isPaused ? '继续' : '暂停';
    },
    analysis () {
      return this.$store.state.exam.analysis;
    }
  },
  methods: {
    togglePause () {
      this.$store.commit('togglePause');
      
      if (this.$store.state.exam.isPaused) {
        this.$store.dispatch('clearTimer') 
        this.$vux.toast.text('已暂停')
      } else {
        this.$store.dispatch('createTimer');
        this.$vux.toast.text('请继续答题')
      }
    },
    backHandler () {
      if (this.analysis) {
        this.$store.commit('toggleAnalysis');
        this.$router.push( { name: 'waitforexam' });
      } else {
        this.showModal = true;
      }
    },
    onConfirm () {
      this.$store.dispatch('resetState')

      this.$router.push( { name: 'waitforexam' });
    }
  },
  mounted () {
    if (!this.analysis) {
      this.$store.dispatch('createTimer')
    }
  }
};
</script>
<style>

</style>
