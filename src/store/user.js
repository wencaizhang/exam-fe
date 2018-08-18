import axios from "axios";
import api from "../util/api";
import router from '../router';
import { cookie } from 'vux'

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

            
            cookie.set('token', resp.data.token);
            cookie.set('userId', resp.data.userId);

            context.commit("setUserId", resp.data.userId);
            context.commit("changeLoginStat", true);
            router.push({ path: "/home" });

          }
        })
    },
    logout (context, payload) {
        
        api.logout({ userId: context.state.userId || cookie.get('userId') })
        .then(function(resp) {
          if (resp.data.code == 0) {

            axios.defaults.headers.token = '';
            cookie.set('token', '');
            context.commit("changeLoginStat", false);
            router.push({ path: "/login" });

          }
        })
    },

    getUserInfo (context, payload) {
        
        api.getUserInfo({ userId: context.state.userId })
        .then(function(resp) {
          if (resp.data.code == 0) {

            context.commit("setUserInfo", resp.data.data);

          }
        })
    },

    sendCode (context, payload) {
        // api.
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}