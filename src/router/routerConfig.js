import Home from "../pages/Home"
import Login from '../components/Login'
import User from '../components/User'
import Footer from "../components/Footer"
import BackHeader from "../components/BackHeader"

import examRouters from './exam'

const routers = [
    {
        path: '/home',
        name: 'home',
        components: {
            default: Home,
            header: BackHeader,
            footer: Footer
        },
        meta: {
            title: '首页'
        }
    },
    {
        path: '/user',
        name: 'user',
        components: {
            default: User,
            footer: Footer
        },
        meta: {
            title: '个人中心'
        }
    },
    {
        path: '/user-login',
        name: 'Login',
        component: Login,
        meta: {
            title: '已有账号？请登录'
        }
    },
    {
        path: '*',
        redirect: '/home'
    }
];


export default [
    ...examRouters,
    ...routers
]