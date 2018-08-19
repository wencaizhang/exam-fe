import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import './assets/css/base.css'

import router from './router/index.js'
import util from "./util/util.js"
import store from './store'

// require('./mock.js');

import  { ToastPlugin, LoadingPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

Vue.prototype.$storage = {
    setItem: (key, value) => {
        // 需要转化成字符串之后储存
        window.sessionStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key) => {
        // sessionStorage 中以字符串存储，获取之后转为 JSON 格式
        return JSON.parse(window.sessionStorage.getItem(key)) || null;
    },
    removeItem: (key) => {
        window.localStorage.removeItem(key);
    },
    clear: (key) => {
        window.localStorage.clear();
    },
};


//添加请求拦截器
// 发送请求时显示 loading，完成时关闭 loading
// 如果返回数据有问题，直接提示
axios.interceptors.request.use(config => {
    //在发送请求之前做某事

    config.headers.token = Vue.$storage.getItem('token');

    // 这个接口用于请求题目，频繁出现 loading 太乱，跳过这个接口
    if (config.url !== '/sage/exam/equestionmanagement/getByIds') {
        // store.commit('toggleShowLoading', true);
        Vue.$vux.loading.show({
            text: 'Loading'
        })
    } 

    return config;
  }, error => {
    //请求错误时做些事
    Vue.$vux.loading.hide()
    return Promise.reject(error);
  });

//添加响应拦截器
axios.interceptors.response.use( response => {
    Vue.$vux.loading.hide()
    //对响应数据做些事
    if (response.data.code != 0) {
        Vue.$vux.toast.show({
            type: 'warn',
            width: '10em',
            text: response.data.msg
        })
        return response;
    } else {
        return response;
    }
  }, error => {
    //请求错误时做些事
    Vue.$vux.loading.hide()
    return Promise.reject(error);
  });

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});


// 每次路由跳转都对登录状态进行检测
router.beforeEach((to, from, next) => {
    let notCheckLogin = to.matched.some( record => record.meta.notCheckLogin )

    // 未登录,且需要检测登录状态的路由
    if (!Vue.$storage.getItem('token') && !notCheckLogin){
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
