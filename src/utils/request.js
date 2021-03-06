import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom errcode
   * Here is just an example
   * You can also judge the status by HTTP Status errcode
   */
  response => {
    return response.data
  },
  /**http请求状态码不是200，都会经过这里 */
  error => {
    console.log('err', error.response.data) // for debug
    const res = error.response.data
    if (res.errcode !== '0') {
      Message({
        message: res.errmsg || '响应错误',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.errcode === '50003' || res.errcode === '50001' || res.errcode === '50002') {
        // to re-login
        MessageBox.confirm('您的登陆身份已过期，请重新登陆！', '提示', {
          confirmButtonText: '重新登陆',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.errmsg || 'Error'))
    }
    return Promise.reject(error)
  }
)

export default service
