import Home from "../components/Home"
import Login from '../components/Login'
import User from '../components/User'
import Exam from '../pages/Exam/Container'

export default [
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/user',
        name: 'user',
        component: User,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/user-login',
        name: 'Login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/exam',
        name: 'Exam',
        component: Exam,
        meta: {
            title: '登录'
        }
    },
    {
        path: '*',
        redirect: '/home'
    }
];