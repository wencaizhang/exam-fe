import axios from "axios";
import Vue from 'vue';
import api from "../util/api";
import router from '../router';

const state = {
    majorList: [], // 专业列表
    chapterList: { },  // 章节列表
    questionList: []
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
        state.questionList = list;
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