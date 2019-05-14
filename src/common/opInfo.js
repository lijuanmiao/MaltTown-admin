import { OP_USER } from '../store/constant'

var opUserCache = {}

export default {
  // 获取 操作员信息
  getOpInfo: function () {
    if (!opUserCache || !opUserCache.token) {
      let opJson = window.localStorage.getItem(OP_USER)
      opUserCache = opJson ? JSON.parse(opJson) : {}
    }
    return opUserCache
  },
  // 设置 操作员信息
  setOpInfo: function (opUser) {
    if (opUser) {
      opUserCache = opUser
      let opJson = JSON.stringify(opUser)
      window.localStorage.setItem(OP_USER, opJson)
    }
  },
  // 清空 操作员信息
  clearOpInfo: function () {
    opUserCache = {}
    console.log('清空缓存')
    window.localStorage.removeItem(OP_USER)
    window.localStorage.removeItem('lang')
  }

}
