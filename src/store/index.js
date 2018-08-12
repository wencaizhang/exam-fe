import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import exam from './exam'
import user from './user'

const index = {
    state: {
        showLoading: false,
        showWarn: false,
        warnText: '',
        loadText: '',
    },
    mutations: {
        toggleShowLoading: (state, bool) => {
            state.showWarn = false;
            state.showLoading = bool;
        },
        toggleShowWarn: (state, bool) => {
            state.showLoading = false;
            state.showWarn = bool;
        },
        setWarnText: (state, text) => {
            state.warnText = text;
        },
        setLoadText: (state, text) => {
            state.loadText = text;
        },
    }
}

export default new vuex.Store({
    modules: {
        index,
        exam,
        user
    }
})
