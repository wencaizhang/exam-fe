import Home from "../components/Home"
import Login from '../components/Login'
import Register from '../components/Register'

export default [{
        path: '/home',
        name: 'home',
        component: Home,
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
        path: '/user-register',
        name: 'Register',
        component: Register,
        meta: {
            title: '注册'
        }
    },
    {
        path: '*',
        redirect: '/home'
    }
];