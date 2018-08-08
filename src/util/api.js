
import axios from "axios";

const api = {
    logout: (data=null, callback) => {
        let url = '/logout';

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
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    },
};

export default api;