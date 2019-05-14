const mobile = /^(1)(3|4|5|6|7|8|9)\d{9}$/
const numAndEn = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{1,}$/
const Z = /^-?\d+$/
const Zz = /^\+?[1-9][0-9]*$/
const Zz0 = /^([1-9]\d*|[0]{1,1})$/
const number = /^[0-9]*$/
// 整数或小数
const floatNum = /^[0-9]+([.]{1}[0-9]+){0,1}$/
const money = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
// 大于0的金额
const rechargemoney = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^[0-9]\.[0-9]([0-9])?$)/
const bankCard = /^(\d{16}|\d{19})$/
//0-100的整数，不含小数点
const zeroToHundred=/^100$|^(\d|[1-9]\d)$/

export default {
  // 手机号码判断
  mobile: function (rule, value, callback) {
    if (!mobile.test(value)) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  },
  // 验证是否是数字+字母组合
  checkNumAndEn: (rule, value, callback) => {
    if (!numAndEn.test(value)) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  },
  // 坐标校验
  checkLongLat: (rule, value, callback) => {
    var reg = /^[-\+]?\d+(\.\d+)\,[-\+]?\d+(\.\d+)$/
    if (!reg.test(value)) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  },
  // 正整数校验
  checkZz: (rule, value, callback) => {
    if (!Zz.test(value)) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  },
  // 正整数校验（包含0）
  checkZz0: (rule, value, callback) => {
    if (!Zz0.test(value)) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  },
  // 整数校验
  checkZ: (rule, value, callback) => {
    if (!Z.test(value)) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  },
  // 数字校验
  checkNumber: (rule, value, callback) => {
    if (!number.test(value)) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  },
  // 浮点数校验
  checkFloatNumber: (rule, value, callback) => {
    if (!floatNum.test(value)) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  },
  // 金额校验
  checkMoney: (rule, value, callback) => {
    if (!money.test(value)) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  },
  // 金额校验 大于0  小数整数均可
  checkMoney1: (rule, value, callback) => {
    if (!rechargemoney.test(value)) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  },

  // 银行卡号校验
  checkBankCard: (rule, value, callback) => {
    value = value.replace(/\s/g, '')
    if (!bankCard.test(value)) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  },
  checkZeroToHundred: (rule, value, callback) => {
    if (!zeroToHundred.test(value)) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  }
}
