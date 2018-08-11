
import axios from "axios";

const postData = ( data=null, url='', callback=null ) => {
    const options = {
        url,
        method: "POST",
        data,
    };

    axios(options)
    .then( resp => {
        if (resp.data.code == 0) {
            callback && callback(resp.data)
        } else {
            alert(resp.data.msg);
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}

const getData = ( data=null, url='', callback=null ) => {
    const options = {
        url,
        method: "GET",
        data,
    };

    axios(options)
    .then( resp => {
        if (resp.data.code == 0) {
            callback && callback(resp.data)
        } else {
            alert(resp.data.msg);
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}

const api = {
    login: (data=null, callback) => {
        let url = "/sys/login";
        postData(data, url, callback);
    },
    logout: (data=null, callback) => {
        let url = '/logout';
        getData(data, url, callback);
    },
};

export default api;