import Footer from "../components/Footer"
import BackHeader from "../components/BackHeader"

import Exam from '../pages/Exam/Container'
import Success from "../pages/Exam/Success"
import WaitForExam from "../pages/WaitForExam"

import Home from "../pages/Home/Home"
import Rank from "../pages/Rank/Rank"
import User from '../pages/User/User'

import Register from '../pages/User/Register'
import Login from '../pages/User/Login'
import Forget from '../pages/User/Forget'
import ResetPwd from '../pages/User/ResetPwd'
import ChangeUserInfo from '../pages/User/ChangeUserInfo'


export default [
    {
        path: '/home',
        name: 'home',
        components: {
            default: Home,
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
        path: '/rank',
        name: 'rank',
        components: {
            default: Rank,
            footer: Footer
        },
        meta: {
            title: '个人中心'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: '已有账号？请登录',
            notCheckLogin: true,
        }
    },
    {
        path: '/forget',
        name: 'forget',
        component: Forget,
        meta: {
            title: '找回密码',
            notCheckLogin: true,
        }
    },
    {
        path: '/reset',
        name: 'reset',
        component: ResetPwd,
        meta: {
            title: '重置密码',
            notCheckLogin: true,
        }
    },
    {
        path: '/changeuserinfo',
        name: 'changeuserinfo',
        component: ChangeUserInfo,
        meta: {
            title: '重置密码',
            notCheckLogin: true,
        }
    },
    {
        path: '/register',
        name: 'register',
        components: {
            default: Register,
        },
        meta: {
            title: '个人中心',
            notCheckLogin: true,
        }
    },
    {
        path: '/success',
        name: 'success',
        components: {
            default: Success,
            header: BackHeader,
        },
        meta: {
            title: '试卷已成功提交'
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
        path: '/waitforexam',
        name: 'waitforexam',
        components: {
            default: WaitForExam,
            header: BackHeader,
        },
        meta: {
            title: '候考页面'
        }
    },
    {
        path: '*',
        redirect: '/home'
    },
];
