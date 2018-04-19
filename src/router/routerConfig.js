import Home from "../components/Home"
import Login from '../components/Login'
import User from '../components/User'
import Exam from '../pages/Exam/Container'
import Modal from "../pages/Exam/Modal"
import Success from "../pages/Exam/Success"
import Footer from "../components/Footer"

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
        path: '/modal',
        name: 'modal',
        components: {
            default: Modal,
        }
    },
    {
        path: '/success',
        name: 'success',
        components: {
            default: Success,
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
