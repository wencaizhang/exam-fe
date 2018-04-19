<template>
  <div>
    <group>
      <x-switch title="交卷" v-model="show"></x-switch>
    </group>
    <div v-transfer-dom>
      <confirm v-model="show"
      :title="confirmTitle"
      :confirm-text="confirmText"
      :cancel-text="cancelText"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow"
      @on-hide="onHide">
        <p style="text-align:center;">{{ contentText }}</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Confirm,
  Group,
  XSwitch,
  XButton,
  TransferDomDirective as TransferDom
} from "vux";
export default {
  directives: {
    TransferDom
  },
  components: {
    Confirm,
    Group,
    XSwitch,
    XButton
  },
  data() {
    return {
      show: false,
      confirmTitle: "成绩合格",
      confirmText: "现在交卷",
      cancelText: "继续答题",
      contentText: "您还有 2 道题未做"
    };
  },
  methods: {
    onCancel() {
      console.log("on cancel");
    },
    onConfirm(msg) {
      console.log("on confirm");
      if (msg) {
        alert(msg);
      }
    },
    onHide() {
      console.log("on hide");
    },
    onShow() {
      console.log("on show");
    }
  }
};
</script>