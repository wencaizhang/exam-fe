import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import exam_store from '../pages/Exam/store.js'

const state = {
  index: 0,
	loading: false,
	pause: false,
	done: false,
  anwsers: [],
	questions: [
		{
			type: 1,
			title: '第一个题：你最爱的国家是：',
			options: [
				{key:'America', value:'A:',inlineDesc:'超级大国美国'},
				{key:'Japan',   value:'B:',inlineDesc:'小日本儿'},
				{key:'China',   value:'C:',inlineDesc:'大中国'}
			],
		},
		{
			type: 2,
			title: '第二题：你最爱的游戏是：',
			options: [
				{key:'LoL', value:'A:', inlineDesc:'英雄联盟'},
				{key:'WOW', value:'B:', inlineDesc:'魔兽世界'},
				{key:'tank', value:'C:', inlineDesc:'坦克大战'},
				{key:'xyz', value:'D:', inlineDesc:'其他'}
			],
		},
		{
			type: 3,
			title: '第三题：我猜你是个超人：',
			options: [
				{key:'true', value:'A:', inlineDesc:'正确'},
				{key:'false', value:'B:', inlineDesc:'错误'},
			],
		}
	],

}

const getters = {
	length: state => state.questions.length,
	question: state => state.questions[state.index],
	value: state => { console.log(state.index); state.anwsers[state.index]},
}
const mutations = {
	setAnwser: (state, value) => state.anwsers[state.index] = value,
  toPrev: state => --state.index,
  toNext: state => ++state.index
}

export default new vuex.Store({
//    modules: {
//      exam_store
//    }
	state,
	getters,
  mutations

})
