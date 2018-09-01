import axios from "axios";
import Vue from 'vue';
import api from "../util/api";
import router from '../router';

const state = {
    name: '用户名',
    userId: '',
    token: '',
    login: false,
    userInfo: {},

    // 注册时单位选择相关数据
    selectDept: false,
    deptList: [],
    fetchDeptList: false,
    pickerResultList: [],
}

const getters = {
}

const mutations = {
    setUserId: (state, id) => {
        state.userId = id;
    },
    setToken: (state, token) => {
        state.token = token;
    },
    setUserInfo: (state, payload) => {
        state.name = payload.name;
        Object.assign(state.userInfo, payload, { saved: true });
    },
    changeLoginStat: (state, bool) => {
        state.login = bool;
    },

    toggleSelectDept: state => state.selectDept = !state.selectDept,
    setDeptList: (state, payload) => {
        state.deptList[0] = payload
        state.fetchDeptList = true
    },
    setPickerResultList: (state, payload) => state.pickerResultList = payload,
}

const actions = {

    login (context, payload) {
        api.login(payload)
        .then(resp => {
          if (resp.data.code == 0) {

            context.commit("setToken", resp.data.token);
            context.commit("setUserId", resp.data.userId);
            context.commit("changeLoginStat", true);
            router.push({ path: "/home" });

          }
        })
    },
    logout (context, payload) {
        return api.logout({ userId: context.state.userId + '' });
    },

    getUserInfo (context, payload) {

        api.getUserInfo({ userId: context.state.userId + '' })
        .then(resp => {
          if (resp.data.code == 0) {

            context.commit("setUserInfo", resp.data.data);

          }
        })
    },

    sendCode (context, payload) {
        // 注册时发送验证
        return api.sendCode(payload)
    },
    sendCodeBack (context, payload) {
        // 忘记密码时发送验证
        return api.sendCodeBack(payload)
    },
    validateCodeBack (context, payload) {
        // 忘记密码时后台校验手机验证码
        return api.validateCodeBack(payload)
    },
    updatePassword (context, payload) {
        // 更新密码
        return api.updatePassword(payload)
    },
    resetPassword (context, payload) {
        // 重置密码
        return api.resetPassword(payload)
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}