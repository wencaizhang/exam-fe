import axios from "axios";
import api from "../util/api";
import router from '../router'
import { userInfo } from "os";

const state = {
    name: '',
    userId: '',
    login: false,
    userInfo: {}
}

const getters = {
    
}

const mutations = {
    setUserId: (state, id) => {
        state.userId = id;
    },
    setUserInfo: (state, payload) => {
        Object.assign(state.userInfo, payload);
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

            axios.defaults.headers.token = resp.data.token;

            context.commit("setUserId", resp.data.userId);
            context.commit("changeLoginStat", true);
            router.push({ path: "/home" });

          } else {
            alert(resp.data.msg)
          }
        })
    },
    logout (context, payload) {
        
        api.logout({ userId: context.state.userId })
        .then(function(resp) {
          if (resp.data.code == 0) {

            axios.defaults.headers.token = '';

            context.commit("changeLoginStat", false);
            router.push({ path: "/login" });

          } else {
            alert(resp.data.msg)
          }
        })
    },

    getUserInfo (context, payload) {
        
        api.getUserInfo({ userId: context.state.userId })
        .then(function(resp) {
          if (resp.data.code == 0) {

            context.commit("setUserInfo", resp.data.data);

          } else {
            alert(resp.data.msg)
          }
        })
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}