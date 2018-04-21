<template>
	<div v-transfer-dom>
		<popup  :value="showStatus" @on-show="show" @on-hide="hide" class="checker-popup">
			<div style="padding:10px 10px 40px 10px;">
				<p style="padding: 5px 5px 5px 2px;color:#888;">全部题目：</p>
				<checker
				v-model="demo"
				@on-change="change"
				default-item-class="demo4-item"
				selected-item-class="demo4-item-selected"
				disabled-item-class="demo4-item-disabled">
					<checker-item v-for="item in list" :value="item" @on-item-click="onItemClick">{{ item + 1 }}</checker-item>
				</checker>
			</div>
		</popup>
	</div>
</template>
<script>
import { Checker, CheckerItem, Divider, Group, Cell, Popup, TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Checker,
    CheckerItem,
    Divider,
    Group,
    Cell,
    Popup
  },
  data () {
    return {
			showStatus: true,
			demo: null,
			length: 20,
    }
  },
	computed: {
		showAll () {
			return this.$store.state.showAll
		},
		index () {
			return this.$store.state.index
		},
		list () {
			let length = this.$store.getters.length
			return [...Array(length).keys()]
		}
	},
  methods: {
		show () {
			
		},
    onItemClick (value, disabled) {
			//this.$store.commit('changeIndex', value);
    },
		change (value) {
			console.log('changeIndex', value);
			this.$store.commit('changeIndex', value);
		}

  },
}
</script>

<style scoped>
.box {
  padding: 0 15px;
}
.demo4-item {
  background-color: #ddd;
  color: #222;
  font-size: 14px;
  padding: 5px 10px;
  margin-right: 10px;
  line-height: 18px;
  border-radius: 15px;
}
.demo4-item-selected {
  background-color: #FF3B3B;
  color: #fff;
}
.demo4-item-disabled {
  color: #999;
}
</style>
