<template>
  <div v-transfer-dom>
    <confirm v-model="showModal"
    :title="confirmTitle"
    :confirm-text="confirmText"
    :cancel-text="cancelText"
    @on-confirm="onConfirm">
      <p style="text-align:center;">您还有 {{ num }} 道题未做</p>
    </confirm>
  </div>
</template>

<script>
import {
  Confirm,
  TransferDomDirective as TransferDom
} from "vux";
export default {
  directives: {
    TransferDom
  },
  components: {
    Confirm
  },
  data() {
    return {
      confirmTitle: "提示：",
      confirmText: "现在交卷",
      cancelText: "继续答题"
    };
  },
  computed: {
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
    }
  },
  methods: {
    onConfirm(msg) {
      this.showModal = false;

      let timestamp = Date.parse( new Date());
      this.$store.commit('setEndTime', timestamp);

      this.$store.commit('marking');
      this.$router.push({ path: '/success'});
    }
  }
};
</script>