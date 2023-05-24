/**
 * 用户相关api
 */
import request from '../utils/request';

/**
 * 登录接口
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
export function login(data){
    return request.post('/user/login', data, {
        withoutToken: true,
        isCryptoEncrypt: true
    });
}
