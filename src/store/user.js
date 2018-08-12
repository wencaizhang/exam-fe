import axios from "axios";
import api from "../util/api";
import { cookie } from 'vux';
import router from '../router'

const state = {
    name: '',
    login: false
}

const getters = {
    
}

const mutations = {
    setUserInfo: (state, payload) => {
        Object.assign(state, payload);
    },
    changeLoginStat: (state, bool) => {
        Object.assign(state, { login: bool } )
    }
}

const actions = {
    login (context, payload) {
        api.login(payload)
        .then(function(resp) {
          if (resp.data.code == 0) {

            axios.defaults.headers.token = resp.data.token;

            cookie.set('token', resp.data.token);
            context.commit("changeLoginStat", true);
            router.push({ path: "/home" });

          } else {
            alert(resp.data.msg)
          }
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}