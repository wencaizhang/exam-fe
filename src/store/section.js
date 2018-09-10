import axios from "axios";
import Vue from 'vue';
import api from "../util/api";
import router from '../router';

const state = {
    majorList: [], // 专业列表
    chapterList: {},  // 章节列表
    questionList: [],  // 题目列表
    questionIndex: 0,  // 当前题目的序号
}

const getters = {

}

const mutations = {
    // 专业列表
    setMajorList: (state, list) => {
        state.majorList = list;
    },

    // 每个专业对应的章节列表
    setChapterList: (state, data) => {
        Object.assign(state.chapterList, data)
    },
    
    // 每个章节对应的题目类型和数量
    setQuestionTypes: (state, data) => {
        state.chapterList[data.majorid].forEach(item => {
            if (item.id == data.sectionId) {
                item.questionList = data.questionList
            }
        })
    },
    
    // 保存题目
    setQuestionList: (state, list) => {
        list.forEach((item, index) => {
            // 将选项按照 ABCD 进行排序
            item.optionList.sort( (a, b) => {
                let s = a.flag.toLowerCase();
                let t = b.flag.toLowerCase();
                if(s < t) return -1;
                if(s > t) return 1;
            });
            item.content = index + 1 + '. ' + item.content;
            state.questionList[index] = item
        })
    },
    
    // 保存题目
    setTrainQuestionAnwser: (state, value) => {
        state.questionList[ state.questionIndex ].myAnswer = value
    },

    changeQuestionIndex: (state, index) => {
        state.questionIndex = index;
    }
}

const actions = {

}

export default {
    state,
    getters,
    mutations,
    actions
}