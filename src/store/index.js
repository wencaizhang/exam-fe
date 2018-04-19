import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import exam_store from '../pages/Exam/store.js'

export default new vuex.Store({
    modules: {
      exam_store
    }
})