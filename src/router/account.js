
import Register from '../components/Register'
import Login from '../components/Login'
import Forget from '../components/Forget'

export default [
    {
        path: '/user-login',
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
        path: '/register',
        name: 'registers',
        components: {
            default: Register,
        },
        meta: {
            title: '个人中心',
            notCheckLogin: true,
        }
    },
];