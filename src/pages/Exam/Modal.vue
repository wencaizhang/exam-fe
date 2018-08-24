<template>
  <div>
    <div v-transfer-dom>
      <confirm v-model="showModal"
        :title="confirmTitle"
        :confirm-text="confirmText"
        :cancel-text="cancelText"
        @on-confirm="onConfirm"
      >
        <p style="text-align:center;">您还有 {{ num }} 道题未做</p>
        <p style="text-align:center;">有 {{ markedNum }} 道题被标记</p>
      </confirm>
    </div>
    
    <div v-transfer-dom>
      <alert v-model="showTimeOutModal" title="考试时间结束，请交卷" @on-hide="onConfirm">
        <p style="text-align:center;">您还有 {{ num }} 道题未做</p>
        <p style="text-align:center;">有 {{ markedNum }} 道题被标记</p>
      </alert>
    </div>
  </div>
</template>

<script>
import {
  Confirm,
  Alert,
  TransferDomDirective as TransferDom
} from "vux";
export default {
  directives: {
    TransferDom
  },
  components: {
    Confirm,
    Alert
  },
  data() {
    return {
      showCancelButton: true,
      confirmTitle: "提示：",
      confirmText: "现在交卷",
      cancelText: "继续答题"
    };
  },
  computed: {
    showTimeOutModal: {
      get() {
        return this.$store.state.exam.showTimeOutModal;
      },
      set(value) {
        this.$store.commit("showTimeOutModal", value);
      }
    },
    showModal: {
      get() {
        return this.$store.state.exam.showModal;
      },
      set(value) {
        this.$store.commit("showModal", value);
      }
    },
    num () {
      return this.$store.getters.length - this.$store.state.exam.answerNum;
    },
    markedNum () {
      return this.$store.state.exam.markedNum;
    }
  },
  methods: {
    onConfirm(msg) {

      this.$store.dispatch('clearTimer');
      // this.$store.commit('togglePause');  // 暂停

      let timestamp = Date.parse( new Date());
      this.$store.commit('setEndTime', timestamp);

      this.showModal = false;

      this.$store.commit('marking');
      this.$router.push({ path: '/success'});
    }
  }
};
</script>