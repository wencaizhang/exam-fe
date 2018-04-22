import BackHeader from "../components/BackHeader"

import Exam from '../pages/Exam/Container'
import Success from "../pages/Exam/Success"

export default [
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
    }
];