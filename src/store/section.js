import axios from "axios";
import Vue from 'vue';
import api from "../util/api";
import router from '../router';

const state = {
    majorList: [], // 专业列表
    chapterList: { },  // 章节列表
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
    
    // 每个专业对应的章节列表
    setQuestionList: (state, data) => {
        state.chapterList[data.majorid].forEach(item => {
            if (item.id == data.sectionId) {
                item.questionList = data.questionList
            }
        })
    },
}

const actions = {

}

export default {
    state,
    getters,
    mutations,
    actions
}