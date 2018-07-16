
import Home from "../pages/Home"
import Rank from "../pages/Rank"
import User from '../components/User'
import Footer from "../components/Footer"
import BackHeader from "../components/BackHeader"

import exam from './exam'
import account from './account'
const routers = [
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
        path: '*',
        redirect: '/home'
    }
];


export default [
    ...account,
    ...exam,
    ...routers
]