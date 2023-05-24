import axios from 'axios';
import  { baseInfo, isProduction } from '../config/index';
import { cryptoEncrypt, cryptoDecrypt } from './crypto';

const http = axios.create({
    baseURL: baseInfo.baseURL,
    timeout: 20000,
});

// 添加请求拦截器
axios.interceptors.request.use(function (config) {

    const { data, withoutToken, isCryptoEncrypt = isProduction } = config;

    console.log('请求拦截器', config);
    const token = sessionStorage.getItem('user-token');
    if(!withoutToken && token){

        //给header添加token
        config.headers["Authorization"] = token;
    }

    //生产环境对数据参数加密、对登录信息进行加密
    if(isCryptoEncrypt && data){
        config.data = { encryptedData: cryptoEncrypt(data) };
    }

    return config;
}, function (error) {

    console.log('请求拦截器', error);
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {

    console.log('像哟ing拦截器', response);
    if (response.data) {
        const { encryptedData } = response.data;
        const result = cryptoDecrypt(encryptedData);
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

export default http;
