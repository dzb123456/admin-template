import axios from 'axios';
import  { baseInfo, isProduction } from '../config/index';
import { cryptoEncrypt } from './crypto';

const request = axios.create({
    baseURL: baseInfo.baseURL,
    timeout: 20000,
});

// 添加请求拦截器
request.interceptors.request.use(function (config) {

    const { data, withoutToken, isCryptoEncrypt = isProduction } = config;

    const token = sessionStorage.getItem('user-token');

    if(withoutToken && token){

        //给header添加token
        config.headers["Authorization"] = token;
    }

    //生产环境对数据参数加密、对登录信息进行加密
    if(isCryptoEncrypt && data){
        config.data = { encryptedData: cryptoEncrypt(JSON.stringify(data)) };
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    if (response.data) {
        const result = response.data;

        //判断状态码,重定向页面
        if(result.status === 401){

        }else if(result.status === 404){

        }

        return result.data;
    }

    return response;
}, function (error) {
    return Promise.reject(error);
});

export default request;
