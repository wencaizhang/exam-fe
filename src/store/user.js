import axios from "axios";
import Vue from 'vue';
import api from "../util/api";
import router from '../router';

const state = {
    name: '用户名',
    userId: '',
    login: false,
    userInfo: {},
}

const getters = {
}

const mutations = {
    setUserId: (state, id) => {
        state.userId = id;
    },
    setUserInfo: (state, payload) => {
        state.name = payload.name;
        Object.assign(state.userInfo, payload, { saved: true });
    },
    changeLoginStat: (state, bool) => {
        state.login = bool;
    }
}

const actions = {
    login (context, payload) {
        api.login(payload)
        .then(function(resp) {
          if (resp.data.code == 0) {

            Vue.prototype.$storage.setItem('token', resp.data.token);
            Vue.prototype.$storage.setItem('userId', resp.data.userId);

            context.commit("setUserId", resp.data.userId);
            context.commit("changeLoginStat", true);
            router.push({ path: "/home" });

          }
        })
    },
    logout (context, payload) {
        
        api.logout({ userId: (context.state.userId || Vue.prototype.$storage.getItem('userId')) + '' })
        .then(function(resp) {
          if (resp.data.code == 0) {

            axios.defaults.headers.token = '';
            Vue.prototype.$storage.clear();

            context.commit("changeLoginStat", false);
            router.push({ path: "/login" });

          }
        })
    },

    getUserInfo (context, payload) {

        api.getUserInfo({ userId: (context.state.userId || Vue.prototype.$storage.getItem('userId')) + '' })
        .then(function(resp) {
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
}

export default {
    state,
    getters,
    mutations,
    actions
}