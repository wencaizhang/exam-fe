<template>
  <div v-transfer-dom>
    <confirm v-model="showModal"
    :title="confirmTitle"
    :confirm-text="confirmText"
    :cancel-text="cancelText"
    @on-confirm="onConfirm">
      <p style="text-align:center;">{{ contentText }}</p>
    </confirm>
  </div>
</template>

<script>
import Vue from "vue";
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
        return this.$store.state.showModal;
      },
      set(value) {
        this.$store.commit("showModal", value);
      }
    },
    duringTime () {

    },
    contentText () {
      let questionslength = this.$store.getters.length;
      let anwsersLength = this.$store.state.anwsers.length;
      return `您还有 ${questionslength - anwsersLength} 道题未做`
    }
  },
  methods: {
    onConfirm(msg) {
      this.$router.push({ path: '/success'}) 
    }
  }
};
</script>