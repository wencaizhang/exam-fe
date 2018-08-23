import api from "../util/api";

const state = {
    loading: false,  // 请求中
    isPaused: false,  // 暂停
    done: false,  // 完成
    showQuestion: false,  // 是否显示题目
    showAll: false,  // 显示所有题目编号
    showModal: false,  // 交卷提示框

    duringSeconds: 0,
    startTime: 0,
    endTime: 0,

    paper: '',

    // ---------以上为状态类 state
    data: '',
    index: 0,  // 当前题目的索引
    id: 0,
    marked: false,
    markedNum: 0,
    idList: [],  // 所有题目的 id 
    answerNum: 0,  // 已经完成的题目数量
    totalScore: 0,  // 总分
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
    question: state => {
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
            const myAnswer = item.myAnswer || [];

            let isRight = JSON.stringify(answer.sort()) === JSON.stringify(myAnswer.sort())
            item.isRight = isRight;

            score += isRight ? item.score : 0;
        });

        return score;
    },

    getTrueAnswer: state => {
        return state.idList.map(item => {
            return {
                id: item.id,
                answer: item.question && item.question.answerId || ''
            } 
        })
    },
    getMyAnswer: state => {
        return state.idList.map(item => {
            return {
                id: item.id,
                answer: (item.myAnswer || []).join(',')
            } 
        })
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

}

const mutations = {

    setExamData: (state, payload) => {
        state.data = payload;
    },

    setPaper: (state, payload) => {
        state.paper = payload;
    },

    addDuringSeconds: (state, value) => {

        state.duringSeconds += value;
    },
    setStartTime: (state, timestamp) => {
        state.startTime = timestamp;
    },
    setEndTime: (state, timestamp) => {
        state.endTime = timestamp;
    },

    // 在切换题目时，有一个先隐藏，后展示题目模块的步骤，暂时不完善
    toggleShowQuestion: (state) => { state.showQuestion = !state.showQuestion; },

    // 保存用户的答案
    setAnwser: (state, payload) => {
        state.idList[state.index].myAnswer = payload.value;
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
    changeIndex: (state, value) => {
        state.index = value;
        const list = state.idList.filter(item => item.id == state.id);
        state.marked = list.length ? list[0]['marked'] : false;
    },

    // 从所有题目中随机挑一个题目回答时，获取该题目的 index
    changeId: (state, value) => {
        state.id = value;
        const list = state.idList.filter(item => item.id == state.id);
        state.marked = list.length ? list[0]['marked'] : false;
    },

    changeMarkStatus: state => {
        const list = state.idList.filter(item => item.id == state.id);
        state.marked = list.length ? list[0]['marked'] : false;
    },

    // 切换上一题下一题
    toPrev: state => {
        --state.index;
        state.id = state.idList[state.index].id
    },
    toNext: state => {
        ++state.index;
        state.id = state.idList[state.index].id
    },

    // 保存 ids
    setIdList: (state, list) => {
        state.idList = list;
    },

    // 保存题目信息
    pushQuestion: (state, payload) => {
        
        payload.forEach(item => {
            
            // 若后台数据无选项，则补充一个提示
            item.optionList = item.optionList || [
                {content: '本道题无选项', flag: 'X', id: '000'}
            ]

            // 排序
            item.optionList.sort( (a, b) => {
                let s = a.flag.toLowerCase();
                let t = b.flag.toLowerCase();
                if(s < t) return -1;
                if(s > t) return 1;
            });

            // 映射，给选项补充一个 ABCD 的标识
            item.optionList = item.optionList.map(item => {
                return {
                    key: item.flag,
                    value: item.flag,
                    inlineDesc: item.flag + '：' + item.content
                }
            });

            // 保存
            state.idList.forEach((item2, index) => {
                if (item2.id == item.id) {
                    item.score = item2.score;
                    item.content = `第${index + 1}题: ` + item.content;  // 测试用
                    item2.question = item;
                }
            })

        });

    },

    // 完成的题目数量
    setAnswerNum: state => {
        const filter = state.idList.filter(item => {
            return item.myAnswer && item.myAnswer.length;
        });
        state.answerNum = filter.length;
    },

    // 评分
    marking: state => {
        // 需要重置为 0 ，否则会叠加上次执行此函数的结果
        state.totalScore = 0;

        state.idList.forEach(item => {

            if (!item.question) {
                return;
            }

            const answer = item.question.answerId.split(',')
            const myAnswer = item.myAnswer || [];

            let isRight = JSON.stringify(answer.sort()) === JSON.stringify(myAnswer.sort())
            item.isRight = isRight;
            
            state.totalScore += isRight ? item.score : 0;
        });
    },
    saveExamInfo: (state, payload) => {
        state.examInfo = payload;
    },

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
        // 提交答案
        return api.insertScore(payload)
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}