<template>
	<div v-transfer-dom>
		<popup v-model="showAll" class="checker-popup">
			<div style="padding:10px 10px 40px 10px;">
				<p style="padding: 5px 5px 5px 2px;color:#888;">全部题目：</p>
				<checker
					:value="index"
					@on-change="change"
					default-item-class="checker-item"
					selected-item-class="checker-item-selected"
					disabled-item-class="checker-item-disabled">
					<checker-item v-for="item in list" :value="item" :key="item">{{ item + 1 }}</checker-item>
				</checker>
			</div>
		</popup>
	</div>
</template>
<script>
import { Checker, CheckerItem, Divider, Popup, TransferDom } from "vux";
export default {
  directives: {
    TransferDom
  },
  components: {
    Checker,
    CheckerItem,
    Divider,
    Popup
  },
  data() {
    return {};
  },
  computed: {
    showAll: {
      get() {
        return this.$store.state.showAll;
      },
      set(value) {
        this.$store.commit("showAll", value);
      }
    },
    index() {
      return this.$store.state.index;
    },
    list() {
      let length = this.$store.getters.length;
      return [...Array(length).keys()];
    }
  },
  methods: {
    change(value) {
      this.$store.commit("showAll", false);
      this.$store.commit("changeIndex", value);
    }
  }
};
</script>

<style scoped>
.box {
  padding: 0 15px;
}
.checker-item {
  background-color: #ddd;
  color: #222;
  font-size: 14px;
  padding: 5px 10px;
  margin-right: 10px;
  margin-bottom: 6px;
  line-height: 18px;
  border-radius: 15px;
}
.checker-item-selected {
  background-color: #ff3b3b;
  color: #fff;
}
.checker-item-disabled {
  color: #999;
}
</style>
