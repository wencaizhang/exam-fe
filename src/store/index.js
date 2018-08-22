import Vue from 'vue'
import vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import createLogger from 'vuex/dist/logger'

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
    
    plugins: [
        createPersistedState({ storage: window.sessionStorage }),
        createLogger({
            collapsed: false, // 自动展开记录的 mutation
            filter (mutation, stateBefore, stateAfter) {
              // 若 mutation 需要被记录，就让它返回 true 即可
              // 顺便，`mutation` 是个 { type, payload } 对象
              return mutation.type !== "aBlacklistedMutation"
            },
            transformer (state) {
              // 在开始记录之前转换状态
              // 例如，只返回指定的子树
              return state.subTree
            },
            mutationTransformer (mutation) {
              // mutation 按照 { type, payload } 格式记录
              // 我们可以按任意方式格式化
              return mutation.type
            },
            logger: console, // 自定义 console 实现，默认为 `console`
        })
    ],
    modules: {
        index,
        exam,
        user
    }
})
