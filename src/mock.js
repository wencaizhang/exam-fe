const Mock = require('mockjs');

const login = function (data) {
    const json = JSON.parse(data.body);
    return {
        code: 0,
        data: {
            user: json.username,
            id: json.username + '@163.com',
            avatar: 'https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=45e1c8e71ddfa9ece22e501752d1f754/342ac65c103853434cc02dda9f13b07eca80883a.jpg'
        }
    }
}

// Mock.setup({ timeout: '1000' });
// Mock.mock('/login', 'post', login); 