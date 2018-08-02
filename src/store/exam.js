
const state = {
    loading: false,  // 请求中
    isPaused: false,  // 暂停
    done: false,  // 完成
    showQuestion: false,  // 是否显示题目
    showAll: false,  // 显示所有题目编号
    showModal: false,  // 交卷提示框

    // ---------以上为状态类 state

    ids: [],  // 所有题目的 id 
    index: 0,  // 当前题目的索引
    anwsers: [],  // 答案
    questions: [  // 问题
        {
            type: 1,
            title: '你最爱的国家是：',
            options: [
                { key: 'America', value: 'A:', inlineDesc: '超级大国美国' },
                { key: 'Japan', value: 'B:', inlineDesc: '小日本儿' },
                { key: 'China', value: 'C:', inlineDesc: '大中国' }
            ],
        },
        {
            type: 2,
            title: '你最爱的游戏是：',
            options: [
                { key: 'LoL', value: 'A:', inlineDesc: '英雄联盟' },
                { key: 'WOW', value: 'B:', inlineDesc: '魔兽世界' },
                { key: 'tank', value: 'C:', inlineDesc: '坦克大战' },
                { key: 'xyz', value: 'D:', inlineDesc: '其他' }
            ],
        },
        {
            type: 3,
            title: '我猜你是个超人：',
            options: [
                { key: 'true', value: 'A:', inlineDesc: '正确' },
                { key: 'false', value: 'B:', inlineDesc: '错误' },
            ],
        }
    ],

}

const getters = {
    // 题目总数量
    length: state => state.questions.length,  

    // 已经完成的题目数量
    anwsersLength: state => state.questions.length -state.anwsers.filter(item => item).length,

    // 当前题目
    question: state => state.questions[state.index],

    // 如果用户完成当前题目，返回当前题目的答案，否则返回空数组
    value: state => state.anwsers[state.index] || [],
}

const mutations = {

    // 在切换题目时，有一个先隐藏，后展示题目模块的步骤，暂时不完善
    toggleShowQuestion: (state, bool) => {
        state.showQuestion = bool;
    },

    // 保存用户的答案
    setAnwser: (state, payload) => {
        state.anwsers[payload.index] = payload.value
    },
    
    // 展示所有题目
    showAll: (state, bool) => {
        state.showAll = bool
    },

    // 交卷时展示提示框
    showModal: (state, bool) => {
        state.showModal = bool
    },

    // 暂停和答题的状态切换
    togglePause: (state, bool) => {
        state.isPaused = bool
    },

    // 从所有题目中随机挑一个题目回答时，获取该题目的 index
    changeIndex: (state, index) => {
        state.index = index
    },

    // 切换上一题下一题
    toPrev: state => --state.index,
    toNext: state => ++state.index,

    // 保存 ids
    setIds: (state, list) => {
        state.ids = list;
    }
}


export default {
    state,
    getters,
    mutations
}