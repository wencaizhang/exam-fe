<template>

  <div>
    <x-header 
      :left-options="{preventGoBack: true}" 
      @on-click-back="backHandler"
    >
      {{ time }}
      <a v-if="pausedAble" slot="right" @click="togglePause">{{ buttonText }}</a>
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
  Alert,
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
    Confirm,
    Alert
  },
  computed: {
    time () {
      return this.analysis ? '考试答案分析' : this.$store.getters.getRemainingTime;
    },
    buttonText () {
      return this.$store.state.exam.isPaused ? '继续' : '暂停';
    },
    analysis () {
      // 试卷解析
      return this.$store.state.exam.analysis;
    },
    practice () {
      // 练习模式
      return this.$store.state.exam.practice;
    },
    pausedAble () {
      // 是否提供暂停功能
      // 只有练习模式有暂停功能

      return this.practice && !this.analysis
    }
  },
  methods: {
    togglePause () {
      const vm = this;
      this.$store.commit('togglePause');
      
      if (this.$store.state.exam.isPaused) {
        this.$store.dispatch('clearTimer');

        this.$vux.alert.show({
          title: '注意',
          content: '已暂停考试',
          onHide () {
            vm.togglePause();
          }
        })

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
    },
    visibilityStateListener () {
      if ( this.pausedAble && !this.$store.state.exam.isPaused && document.visibilityState == 'hidden' ) {
        this.togglePause();
      }
    }
  },
  mounted () {
    if (this.pausedAble) {
      this.$store.dispatch('createTimer')
    }
    document.addEventListener("visibilitychange", this.visibilityStateListener);
  },
  beforeDestroy () {
    document.removeEventListener('visibilitychange', this.visibilityStateListener)
  }
};
</script>
<style>

</style>
