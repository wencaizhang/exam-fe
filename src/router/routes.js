import Footer from "../components/Footer"

import Exam from '../pages/Exam/Container'
import Success from "../pages/Exam/Success"
import WaitForExam from "../pages/Exam/WaitForExam"

import History from "../pages/Exam/History"

import Home from "../pages/Home/Home"
import Train from "../pages/Train/Train"
import User from '../pages/User/User'

import Section from "../pages/Train/Section"
import QuestionTypes from "../pages/Train/QuestionTypes"
import TrainQuestion from "../pages/Train/Question"

import Register from '../pages/User/Register'
import Login from '../pages/User/Login'
import Forget from '../pages/User/Forget'
import ResetPwd from '../pages/User/ResetPwd'
import ChangeUserInfo from '../pages/User/ChangeUserInfo'


export default [
    {
        path: '/home/:data',
        name: 'home2',
        components: {
            default: Home,
            footer: Footer
        },
        meta: {
            title: '首页'
        }
    },
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
        path: '/train',
        name: 'train',
        components: {
            default: Train,
            footer: Footer
        },
        meta: {
            title: '练兵'
        }
    },
    {
        path: '/section/:majorid',
        name: 'section',
        components: {
            default: Section,
        },
        meta: {
            title: '选择章节'
        }
    },
    {
        path: '/questiontypes/:majorid/:sectionid',
        name: 'questiontypes',
        components: {
            default: QuestionTypes,
        },
        meta: {
            title: '选择题型'
        }
    },
    {
        path: '/trainquestion',
        name: 'trainquestion',
        components: {
            default: TrainQuestion,
        },
        meta: {
            title: '选择题型'
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
        path: '/history',
        name: 'history',
        components: {
            default: History,
        },
        meta: {
            title: '我的成绩',
        }
    },
    {
        path: '/changeuserinfo',
        name: 'changeuserinfo',
        component: ChangeUserInfo,
        meta: {
            title: '修改个人信息',
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
            title: '注册',
            notCheckLogin: true,
        }
    },
    {
        path: '/success',
        name: 'success',
        components: {
            default: Success,
        },
        meta: {
            title: '试卷已成功提交'
        }
    },
    {
        path: '/exam/',
        name: 'exam',
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
        },
        meta: {
            title: '准备考试'
        }
    },
    {
        path: '*',
        redirect: '/home'
    },
];
