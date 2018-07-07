import axios from "axios";
const state = {
    name: '张文才',
    login: false
}

const getters = {
    
}

const mutations = {
    setUserInfo: (state, payload) => {
        Object.assign(state, payload);
    },
    login: (state, bool) => {
        Object.assign(state, { login: bool } )
    }
}

const actions = {
    login (context, payload) {
        return axios.post("/login", payload)
        // return axios.post("/session", payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}