let util = {};

util.getParameterByName = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};


util.checkUserThenDoAction = function(func, redirectUrl) {
    if (util.isLogined()) {
        if (typeof(func) == 'function') {
            func();
        }
    } else {
        bus.$emit('showLogin', redirectUrl);
    }
};


util.trimToNull = function(str) {
    if (str == "" || str == null) {
        return null;
    }
    return str.trim();
};

export default util;
