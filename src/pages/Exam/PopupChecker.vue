<template>
	<div v-transfer-dom>
		<popup v-model="showAll" >
			<div style="padding:10px 10px 40px 10px;">
				<p style="padding: 5px 5px 5px 2px;color:#888;">全部题目：</p>
				<checker
					:value="index"
					@on-change="change"
					default-item-class="checker-item"
					selected-item-class="checker-item-selected"
					disabled-item-class="checker-item-disabled"
        >
					<checker-item v-for="(item,index) in list" 
            v-bind:class="getClassName(item)"
            :value="index" 
            :key="item.id"
          >
            {{ index + 1 }}
          </checker-item>
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
        return this.$store.state.exam.showAll;
      },
      set(value) {
        this.$store.commit("showAll", value);
      }
    },
    index() {
      return this.$store.state.exam.index;
    },
    list() {
      return this.$store.state.exam.idList;
    },

  },
  methods: {
    getClassName (item) {
      var className = '';
      className += item.myAnswer && item.myAnswer.length ? 'check-item-answered' : '';
      className += item.marked ? ' check-item-marked' : '';
      return className;
    },
    change(value) {
      this.$store.commit("showAll", false);

      this.$store.commit("changeQuestionByIndex", value);
    }
  }
};
</script>

<style>
/* 所有题目 Checker 样式 */
.checker-item {
    text-align: center;
    width: 10%;
    margin: 1.2%;
    height: 30px;
    line-height: 30px;
    background-color: #ddd;
    color: #222;
    font-size: 14px;
    border-radius: 15px;
}
.vux-checker-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
.checker-item-selected {
    background-color: #ff3b3b;
    color: #fff;
}
.checker-item-disabled {
    color: #999;
}
.check-item-answered {
  border: 1px solid #1aad19;
}
.check-item-marked {
  border: 1px dashed red;
}
</style>
