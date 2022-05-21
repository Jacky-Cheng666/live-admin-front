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

/**添加管理员账号  */
export function addManager (data) {
    const { username, password } = data
    return request({
        url: '/api/web/v1/admin/add',
        method: 'post',
        data: { username, password }
    })
}
/**
 * 获取单个管理员详情
 * @param {Object} data 
 * @returns {Promise}
 */
export function getManagerInfo (data) {
    const { id } = data
    return request({
        url: `/api/web/v1/admin/${id}`,
        method: 'get',
    })
}
/**
 * 修改管理员信息
 * @param {Object} data 
 * @returns {Promise}
 */
export function editManager (data) {
    const { id, username, password } = data
    return request({
        url: '/api/web/v1/admin',
        method: 'put',
        data: { id, username, password }
    })
}
/**
 * 删除管理员
 * @param {Object} data 
 * @returns {Promise}
 */
export function deleteManager (data) {
    const { id } = data
    return request({
        url: `/api/web/v1/admin/${id}`,
        method: 'delete'
    })
}