/**
 * 菜单相关api
 */
import request from '../utils/request';

/**
 * 获取菜单接口
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getMenu(data = {}){
    return request.post('/menu/select', data, {
        withoutToken: true
    });
}
