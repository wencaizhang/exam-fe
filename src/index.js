import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import './assets/css/base.css'

import router from './router/index.js'
import util from "./util/util.js"
import store from './store'

// require('./mock.js');

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

// 每次路由跳转都对登录状态进行检测
router.beforeEach((to, from, next) => {
    const userInfo = util.getUserinfo();
    let isLogin = store.state.user.login;
    let notCheckLogin = to.matched.some( record => record.meta.notCheckLogin )

    // 未登录，且需要检测登录状态的路由
    if (!userInfo && !isLogin && !notCheckLogin){
        next({ path: '/login' });
    } else {
        next();
    }

});

// 引入外部js
Vue.component('remote-script', {
    render: function(createElement) {
        var self = this;
        return createElement('script', {
            attrs: {
                type: 'text/javascript',
                src: this.src
            },
            on: {
                load: function(event) {
                    self.$emit('load', event);
                },
                error: function(event) {
                    self.$emit('error', event);
                },
                readystatechange: function(event) {
                    if (this.readyState == 'complete') {
                        self.$emit('load', event);
                    }
                }
            }
        });
    },

    props: {
        src: {
            type: String,
            required: true
        }
    }
});
