import Vue from 'vue'
import vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import createLogger from 'vuex/dist/logger'

Vue.use(vuex);

import exam from './exam'
import user from './user'

const index = {
    state: {
        initStateString: '',
    },
    mutations: {
        initState: (state, str) => {
            state.initStateString = str;
        },
    },
    actions: {
        resetState (context) {
            const initial = JSON.parse(context.rootState.index.initStateString);
            Object.keys(initial).forEach(key => { 
                context.commit('reset' + key, initial[key])
            })
        },
    }
}

const modules = {
    index,
    exam,
    user
}

Object.keys(modules).forEach( key => {
    // 为每个 module 创建一个重置为处置初始状态的 mutations
	modules[key]['mutations'][ 'reset' + key ] = (state, initState) => {
        Object.assign( state, initState );
    }

})

export default new vuex.Store({
    
    plugins: [
        createPersistedState({ storage: window.sessionStorage }),
        // createLogger({
        //     collapsed: false, // 自动展开记录的 mutation
        //     filter (mutation, stateBefore, stateAfter) {
        //       // 若 mutation 需要被记录，就让它返回 true 即可
        //       // 顺便，`mutation` 是个 { type, payload } 对象
        //       return mutation.type !== "aBlacklistedMutation"
        //     },
        //     transformer (state) {
        //       // 在开始记录之前转换状态
        //       // 例如，只返回指定的子树
        //       return state.subTree
        //     },
        //     mutationTransformer (mutation) {
        //       // mutation 按照 { type, payload } 格式记录
        //       // 我们可以按任意方式格式化
        //       return mutation.type
        //     },
        //     logger: console, // 自定义 console 实现，默认为 `console`
        // })
    ],
    // modules: {
    //     index,
    //     exam,
    //     user
    // }
    modules,
})
