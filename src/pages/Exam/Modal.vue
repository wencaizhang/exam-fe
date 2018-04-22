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
      // let length = this.$store.getters.anwsersLength;
      // let anwsers = this.$store.state.exam.anwsers;
      // console.log(this.$store.getters.anwsersLength);
      // return this.$store.getters.anwsersLength
      return this.$store.state.exam.questions.length - this.$store.state.exam.anwsers.filter(item => item).length
    }
  },
  methods: {
    onConfirm(msg) {
      this.$router.push({ path: '/success'}) 
    }
  }
};
</script>