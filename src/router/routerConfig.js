import Home from "../pages/Home"
import Login from '../components/Login'
import User from '../components/User'
import Footer from "../components/Footer"
import BackHeader from "../components/BackHeader"

import Exam from '../pages/Exam/Container'
import Modal from "../pages/Exam/Modal"
import PopupChecker from "../pages/Exam/PopupChecker"
import Success from "../pages/Exam/Success"

export default [
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
        path: '/success',
        name: 'success',
        components: {
            default: Success,
            header: BackHeader,
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
            title: '已有账号，请登录'
        }
    },
    {
        path: '/exam',
        name: 'Exam',
        component: Exam,
        meta: {
            title: '考试中心'
        }
    },
    {
        path: '*',
        redirect: '/home'
    }
];
