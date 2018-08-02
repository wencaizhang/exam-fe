const util = {};

util.getUserinfo = () => {
    return JSON.parse(window.sessionStorage.getItem('userInfo')) || null;
}

util.setUserinfo = (userInfo) => {
    window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
}

// 获取考试题目 ids 所需要的数据
util.setPaperData = (data) => {
    window.sessionStorage.setItem('paper', JSON.stringify(data));
}
util.getPaperData = () => {
    return JSON.parse(window.sessionStorage.getItem('paper')) || null;
}

util.setQuestionIds = (data) => {
    window.sessionStorage.setItem('ids', JSON.stringify(data));
}
util.getQuestionIds = () => {
    return JSON.parse(window.sessionStorage.getItem('ids')) || null;
}
export default util;
