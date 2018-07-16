const util = {};

util.getUserinfo = () => {
    return JSON.parse(window.sessionStorage.getItem('userInfo')) || null;
}

util.setUserinfo = (userInfo) => {
    window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
}

export default util;
