import axios from 'axios';
const qs = require('querystring');

const env = process.env.NODE_ENV;
const BASE_URL = env === 'development' ? "http://localhost:9003" : "http://115.159.92.156:9003";

const caiAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': "application/json;charset=utf-8"
    },
});


// 拦截响应， 如果没有权限访问后端接口，就直接跳转到login。或者提示没有权限访问该接口
caiAxios.interceptors.response.use((config: any) => {
    // 440表示后端验证时， token校验错误。返回的状态码 440；
    // if (config.headers.code === "440") {
    //     const tip = "无权访问该接口";
    //     window.location.href = "#/";
    //     Cookie.set("isLogin", "");
    //     Cookie.set("userName", "");
    //     Cookie.set('userId', "");
    //     Cookie.set('token', "");
    // return tip;
    // }
    console.log(config);
    return config;
}, err => {
    return Promise.reject(err);
});


const CaiPost = (url: string, payload: object, headers = {}) => {
    return caiAxios.post(`${url}`, payload, headers);
}
const CaiGet = (url: string, queryObj = {}) => {
    let queryStr = "";
    if (queryObj) {
        const query = qs.stringify(queryObj);
        queryStr += `?${query}`;
    }
    return caiAxios.get(`${url}${queryStr}`);
}
const uploadImg = (uid: string, imgFile: any) => {
    const formData = new FormData();
    formData.append("file", imgFile);
    formData.append("uid", uid);
    return CaiPost("/uploadImg", formData, {
        "Content-Type": "multipart/form-data"
    });
}

interface INetworkData {
    code: number;
    msg: string;
    data?: object
}

export {
    CaiPost, CaiGet, INetworkData, uploadImg, BASE_URL
}