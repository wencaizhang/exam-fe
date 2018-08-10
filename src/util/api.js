
import axios from "axios";

const postData = ( data=null, url='', callback=null ) => {
    const options = {
        url,
        method: "POST",
        data,
        headers: { "content-type": "application/x-www-form-urlencoded" },
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
        headers: { "content-type": "application/x-www-form-urlencoded" },
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
    logout: (data=null, callback) => {
        let url = '/logout';

        getData(null, url, callback)
    },
};

export default api;