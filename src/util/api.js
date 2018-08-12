
import axios from "axios";

const user = {

    login: (data=null) => {
        let url = "/sys/login";
        return axios.post(url, data);
    },
    logout: (data=null) => {
        let url = '/sys/logout';
        return axios.post(url, data);
    },
    register: (data=null) => {
        let url = "/api/register";
        return axios.post(url, data);
    },
    getDeptList: (data=null) => {
        let url = "/sys/dept/list";
        return axios.get(url, { params: data });
    },

    resetPwd: (data=null) => {
        let url = "/student/student/password";
        return axios.get(url, { params: data });
    },
    forgetPwd: (data=null) => {
        let url = "";
        return axios.get(url, { params: data });
    },
    ChangeUserInfo: (data=null) => {
        let url = "";
        return axios.get(url, { params: data });
    },
    getUserInfo: (data=null) => {
        let url = "/sage/student/student/getStudentByUserId";
        return axios.post(url, data);
    },

};

const exam = {

    getExamInfo: (data=null) => {
        let url = "/sage/exam/examination/info";
        return axios.post(url, data);
    },
    getIds: (data=null) => {
        let url = "/sage/exam/paperProduce/produce";
        return axios.post(url, data);
    },
    getByIds: (data=null) => {
        let url = "/sage/exam/equestionmanagement/getByIds";
        return axios.post(url, data);
    },
    insertScore: (data=null) => {
        // 提交答案
        let url = "/exam/score/insertScore";
        return axios.post(url, data);
    },

}

const api = Object.assign(
    {},
    user,
    exam,
);

export default api;