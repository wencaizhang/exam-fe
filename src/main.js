import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import './assets/css/base.css'
import router from './router/index.js'
import util from "./js/util.js"
import store from './store'
import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

require('./mock.js')

axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults['transformRequest'] = [function(data) {
    // Do whatever you want to transform the data
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}]

Vue.prototype.$getParameterByName = util.getParameterByName;
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});


router.beforeEach((to, from, next) => {

    let isLogin = store.state.user.login;
    let notCheckLogin = to.matched.some( record => record.meta.notCheckLogin )

    // 未登录，且需要检测登录状态的路由
    if (!isLogin && !notCheckLogin){
        next({ path: '/user-login' })
    } else {
        next()
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
