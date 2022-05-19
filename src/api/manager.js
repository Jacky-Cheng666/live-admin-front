import request from '@/utils/request'
/**
 * 获取管理员列表
 * @param {Object} data 
 * @returns 
 */
export function getList (data) {
    const { page, limit } = data
    return request({
        url: '/api/web/v1/admin/list',
        method: 'get',
        params: { page, limit }
    })
}

/**添加管理员账号 */
export function addManager (data) {
    const { username, password } = data
    return request({
        url: '/api/web/v1/admin/add',
        method: 'post',
        data: { username, password }
    })
}