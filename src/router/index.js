import Vue from 'vue'
import vueRouter from "vue-router"
import routes from "./routes.js"
import VueWechatTitle from 'vue-wechat-title'

Vue.use(VueWechatTitle)
Vue.use(vueRouter)

export default new vueRouter({
    //mode: 'history', //切换路径模式，去掉#；刷新当前页面后，报404错。
    scrollBehavior: () => ({ y: 0 }), //滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
    routes
});