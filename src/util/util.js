const util = {};

util.getUserinfo = () => {
    return JSON.parse(window.localStorage.getItem('userInfo')) || null;
}

util.setUserinfo = (userInfo) => {
    window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

export default util;
