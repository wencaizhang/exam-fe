
const state = {
    loading: false,  // 请求中
    isPaused: false,  // 暂停
    done: false,  // 完成
    showQuestion: false,  // 是否显示题目
    showAll: false,  // 显示所有题目编号
    showModal: false,  // 交卷提示框

    // ---------以上为状态类 state
    index: 0,  // 当前题目的索引
    currId: 0,  // 当前题目的索引
    idList: [],  // 所有题目的 id 
    anwsers: [],  // 答案

}

const getters = {
    // 题目总数量
    length: state => state.idList.length,  

    // 已经完成的题目数量
    anwsersLength: state => state.idList.length -state.anwsers.filter(item => item).length,

    // 当前题目
    question: state => {
        const list = state.idList.filter(item => item.id == state.currId);
        return list.length ? list[0]['question'] : null;
    },

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
        state.idList[state.index].myAnswer = value;
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
    changeIndex: (state, id) => {
        state.currId = id;
    },

    // 切换上一题下一题
    toPrev: state => --state.index,
    toNext: state => ++state.index,

    // 保存 ids
    setIdList: (state, list) => {
        state.idList = list;
    },

    pushQuestion: (state, payload) => {
        state.idList.forEach(item => {
            if (item.id == payload.id) {
                payload.score = item.score;
                item.question = payload;
            }
        })
    }
}


export default {
    state,
    getters,
    mutations
}