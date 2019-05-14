import opInfo from '../common/opInfo'
import axios from 'axios'
// axios 配置
axios.defaults.timeout = 40000
// axios.defaults.withCredentials = true
axios.interceptors.request.use(
  config => {
    let opUser = opInfo.getOpInfo()
    if (opUser.token) {
      config.headers['x-auth-token'] = opUser.token
    }
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log('未登录')
          window.localStorage.clear()
          window.router.push('/login')
          break
        case 403:
          console.log('没有权限')
          window.router.push('/error/403')
          break
        case 500:
          console.log('系统错误')
          window.router.push('/error/500')
          break
        default:
          console.log('未知错误:' + error.response.status)
          window.router.push('/error/500')
      }
    }
    return Promise.reject(error.response.data)
  })

export default axios
