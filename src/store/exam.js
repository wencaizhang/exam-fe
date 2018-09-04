import api from "../util/api";

const state = {
    isPaused: false,  // 暂停
    showAll: false,  // 显示所有题目编号

    showModal: false,  // 交卷提示框
    showTimeOutModal: false,  // 时间结束交卷提示框

    duringSeconds: 0,
    startTime: 0,
    endTime: 0,

    examInfo: { examination: {} },
    paper: '',
    questionTypes: [
      { val: '001', type: "单选题：", max: 1 },
      { val: '002', type: "多选题：", max: 100 },
      { val: '003', type: "判断题：", max: 1 }
    ],

    // ---------以上为状态类 state
    data: '',
    index: 0,  // 当前题目的索引
    id: 0,
    marked: false,
    markedNum: 0,
    idList: [],  // 所有题目的 id 
    answerNum: 0,  // 已经完成的题目数量
    totalScore: 0,  // 总分

    // --- 考试分析
    analysis: false,

    // true 为模拟测试，false 为真实考试
    practice: false,
}

const getters = {
    // 题目总数量
    length: state => state.idList.length,  

    // 已经完成的题目数量
    anwsersLength: state => {
        return 0;
        // return state.idList.length -state.anwsers.filter(item => item).length
    },
    // 当前题目 
    currQuestion: state => {
        // 不能使用 index 获取题目
        // return state.idList[state.index]['question'] || {};

        const list = state.idList.filter(item => item.id == state.id);
        return list.length ? list[0]['question'] : {};
    },

    getScoreByType: state => (typeId='all') => {
        let score = 0;

        const filterList = state.idList.filter(item => {
            if (typeId == 'all') {
                return true;
            }
            return item.question && item.question.typeId === typeId;
        });

        filterList.forEach(item => {
            if (!item.question) {
                return;
            }

            const answer = item.question.answerId.split(',')
            const myAnswer = item.question.myAnswer || [];

            let isRight = JSON.stringify(answer.sort()) === JSON.stringify(myAnswer.sort())
            item.isRight = isRight;

            score += isRight ? item.score : 0;
        });

        return score;
    },

    getDuringTime: (state) => {      
        let seconds = state.duringSeconds;
        let time = '';
        const points = [
          { value: 60 * 60, suffix: '小时', max: 1 },
          { value: 60, suffix: '分钟', max: 1 },
          { value: 1, suffix: '秒', max: 1 }
        ];

        for (let i = 0; i < points.length; i++) {
          let mode = Math.floor(seconds / points[i].value);
          if (mode >= 1) {
            seconds -= points[i].value * mode
            time += Math.max(mode, points[i].max) + points[i].suffix;
          }
        }
        return time || '0秒';
    },

    // 考试剩余时长，秒
    getRemainingTime: state => {
        if (!state.examInfo) {
            return 0;
        }
        let allTheTime = state.examInfo.examination.examinationTimeLong * 60;
        // allTheTime = 60;
        let seconds =  allTheTime - state.duringSeconds >= 0 ? allTheTime - state.duringSeconds : 0;

        // seconds 为 0 时，倒计时结束，强制交卷
        if (seconds <= 0) {
            state.isPaused = true;
            state.showModal = false;
            state.showTimeOutModal = true;
            return '0秒'
        } else {
            let time = '';
            const points = [
              { value: 60 * 60, suffix: '小时', max: 1 },
              { value: 60, suffix: '分钟', max: 1 },
              { value: 1, suffix: '秒', max: 1 }
            ];
      
            for (let i = 0; i < points.length; i++) {
              let mode = Math.floor(seconds / points[i].value);
              if (mode >= 1) {
                seconds -= points[i].value * mode
                time += Math.max(mode, points[i].max) + points[i].suffix;
              }
            }
            return time || '0秒';
        }
    }

}

const mutations = {

    setExamData: (state, payload) => state.data = payload,

    setPaper: (state, payload) => state.paper = payload,

    setExamInfo: (state, payload) => {
        state.examInfo = payload
        // 1 是真实考试，2 是模拟考试
        state.practice = payload.examType == 2 ? true : false;
    },

    // 设置答题开始和结束时间
    setStartTime: (state, timestamp) => state.startTime = timestamp,
    setEndTime:   (state, timestamp) => state.endTime   = timestamp,
    
    // 保存题目id
    setIdList: (state, list) => state.idList = list,

    // 保存用户的答案
    setAnwser: (state, payload) => state.idList[state.index].question.myAnswer = payload.value,

    addDuringSeconds: (state, value) => state.duringSeconds += value,

    // 重置答题所用的时间
    resetDuringTime: state => state.duringSeconds = 0,
    
    // 展示所有题目
    showAll: (state, bool) => state.showAll = bool,

    // 交卷时展示提示框
    showModal: (state, bool) => state.showModal = bool,
    // 时间结束交卷提示框
    showTimeOutModal: (state, bool) => state.showTimeOutModal = bool,

    // 暂停和答题的状态切换
    togglePause: state => state.isPaused = !state.isPaused,

    // 答案解析和考试的状态切换
    toggleAnalysis: state => state.analysis = !state.analysis,

    changeMarkStatus: state => {
        const list = state.idList.filter(item => item.id == state.id);
        state.marked = list.length ? list[0]['marked'] : false;
    },

    changeQuestionByIndex: (state, index) => {
        if (index < 0 || index + 1 >= state.idList.length) {
            return;
        }
        state.index  = index;
        state.id     = state.idList[index].id;
        state.marked = state.idList[index].marked;
    },

    // 保存题目信息
    pushQuestion: (state, payload) => {
        
        payload.forEach(item => {
            
            // 若后台数据无选项，则补充一个提示
            item.optionList = item.optionList.length ? item.optionList : [
                {content: '本道题无选项', flag: 'X', id: '000'}
            ]

            // 将选项按照 ABCD 进行排序
            item.optionList.sort( (a, b) => {
                let s = a.flag.toLowerCase();
                let t = b.flag.toLowerCase();
                if(s < t) return -1;
                if(s > t) return 1;
            });

            // 映射成组件需要的数据格式，并给选项的 inlineDesc 属性补充一个 ABCD 的标识
            item.optionList = item.optionList.map(option => {
                // 单选题特殊处理
                let inlineDesc;
                if (item.typeId === '003') {
                    inlineDesc = option.content === 'T' ? 'A：正确' : 'B：错误'
                } else {
                    inlineDesc = option.flag + '：' + option.content
                }
                return {
                    key: option.flag,
                    value: option.flag,
                    inlineDesc,
                }
            });

            // 根据 id 将题目信息保存到 state.idList 中
            // 给题干中增加 第x题 的字样便于识别
            state.idList.forEach((item2, index) => {
                if (item2.id == item.id) {
                    Object.assign(item2.question, item, {
                        score: item2.score,
                        content: `第${index + 1}题: ` + item.content,  // 测试用
                    });
                }
            })
            
        });

    },

    // 完成的题目数量
    setAnswerNum: state => {
        const filter = state.idList.filter(item => {
            return item.question.myAnswer && item.question.myAnswer.length;
        });
        state.answerNum = filter.length;
    },

    // 评分
    marking: state => {
        // 需要重置为 0 ，否则会叠加上次执行此函数的结果
        state.totalScore = 0;

        state.idList.forEach(item => {

            if (!item.question) { return; }

            const answer = item.question.answerId.split('');
            const myAnswer = item.question.myAnswer || [];

            let isRight = JSON.stringify(answer.sort()) === JSON.stringify(myAnswer.sort())
            item.question.isRight = isRight;
            
            // console.log('正确答案：', answer);
            // console.log('我的答案：', myAnswer);
            // console.log('是否正确：', isRight);
            
            state.totalScore += isRight ? item.score : 0;
        });
    },

    // 标记或取消标记
    marked: state => {
        const filter = state.idList.filter((item, index) => {
            return state.index == index
        });
        filter[0].marked = !filter[0].marked;

        state.markedNum = state.idList.filter( item => item.marked ).length;
    }
}

const actions = {
    insertScore (context, payload) {
        if (context.state.examInfo.examType === '1') {
            // 真实考试 提交答案
            return api.insertScore(payload)
        } else {
            // 模拟考试 提交答案
            return api.simulationscore(payload)
        }
    },

    createTimer ({ state, commit, dispatch }) {
        dispatch('clearTimer')
        state.timer = setInterval(() => {
            commit('addDuringSeconds', 1);
        }, 1000);
    },

    clearTimer ({ state, commit }) {
        clearInterval(state.timer);
    },

    resetState ( context ) {
        context.state.isPaused = false;
        context.dispatch('clearTimer')
        context.commit('resetDuringTime')
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}