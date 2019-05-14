export default {
  // 对象浅拷贝
  simpleClone: function (data) {
    var obj = {}
    obj = JSON.parse(JSON.stringify(data))
    return obj
  },
  // 查询条件过滤设值操作
  filterParam: function (queryParam, filterColumn) {
    for (let name in queryParam) {
      if (name) {
        let filterValue = filterColumn[name]
        if (filterValue && filterValue instanceof Array) {
          queryParam[name] = filterValue.join(',')
        }
      }
    }
  },
  // 排序设值操作
  sortParam: function (orderColumn) {
    let sort = orderColumn.prop
    let order = orderColumn.order
    let result = {}
    if (sort) {
      result = {
        sortField: sort,
        sortBy: order
      }
    }
    return result
  },
  dateTimeFormat: function (time, fmt) {
    if (!time) return ''
    let date = new Date(time)
    let o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  },
  // 比较日起大小
  compareDate(d1, d2) {
    return ((new Date(d1.replace(/-/g, "\/"))) >= (new Date(d2.replace(/-/g, "\/"))))
  },
  // 获取N天后的日期
  getNdayDate: function (startDay, days) {
    var d = startDay
    var year = d.getFullYear()
    var mon = d.getMonth() + 1
    var day = d.getDate()
    if (day <= days) {
      if (mon > 1) {
        mon = mon - 1
      } else {
        year = year - 1
        mon = 12
      }
    }
    d.setDate(d.getDate() + days)
    year = d.getFullYear()
    mon = d.getMonth() + 1
    day = d.getDate()

    return year + '/' + (mon < 10 ? ('0' + mon) : mon) + '/' + (day < 10 ? ('0' + day) : day)
  },
  // 获取N天后的日期+时间
  getNdayDateTime: function (startDay, days) {
    var d = startDay
    var year = d.getFullYear()
    var mon = d.getMonth() + 1
    var day = d.getDate()
    if (day <= days) {
      if (mon > 1) {
        mon = mon - 1
      } else {
        year = year - 1
        mon = 12
      }
    }
    d.setDate(d.getDate() + days)
    year = d.getFullYear()
    mon = d.getMonth() + 1
    day = d.getDate()
    var h = d.getHours() // 小时
    var m = d.getMinutes() // 分
    var s = d.getSeconds() // 秒
    return year + '/' + (mon < 10 ? ('0' + mon) : mon) + '/' + (day < 10 ? ('0' + day) : day) + ' ' + (h < 10 ? ('0' + h) : h) + ':' + (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s)
  },
  // 获取当前日期是周几
  getWeek: function (date) {
    var week
    if (date.getDay() === 0) week = '周日'
    if (date.getDay() === 1) week = '周一'
    if (date.getDay() === 2) week = '周二'
    if (date.getDay() === 3) week = '周三'
    if (date.getDay() === 4) week = '周四'
    if (date.getDay() === 5) week = '周五'
    if (date.getDay() === 6) week = '周六'
    return week
  },
  formatDate: function (date, format) {
    if (!date) {
      return
    }
    if (!format) {
      format = 'yyyy-MM-dd HH:mm:ss'
    }
    switch (typeof date) {
      case 'string':
        date = new Date(date.replace(/-/, '/'))
        break
      case 'number':
        date = new Date(date)
        break
    }
    if (!(date instanceof Date)) {
      return
    }
    var dict = {
      'yyyy': date.getFullYear(),
      'M': date.getMonth() + 1,
      'd': date.getDate(),
      'H': date.getHours(),
      'm': date.getMinutes(),
      's': date.getSeconds(),
      'MM': ('' + (date.getMonth() + 101)).substr(1),
      'dd': ('' + (date.getDate() + 100)).substr(1),
      'HH': ('' + (date.getHours() + 100)).substr(1),
      'mm': ('' + (date.getMinutes() + 100)).substr(1),
      'ss': ('' + (date.getSeconds() + 100)).substr(1)
    }
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
      return dict[arguments[0]]
    })
  },
  getStrByNum: function (str, count) {
    var str1 = str.length < count ? str : str.substring(0, count - 1) + '···'
    return str1
  },
  isEmpty: function (obj) {
    if (obj === null || obj === undefined || obj === '') {
      return true
    }
    return false
  },
  removeByValue: function (obj, val) {
    for (var i = 0; i < obj.length; i++) {
      if (obj[i] === val) {
        obj.splice(i, 1)
        break
      }
    }
  },
  encode: function (input) {
    var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    var output = ''
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4
    var i = 0
    input = this.utf8Encode(input)
    while (i < input.length) {
      chr1 = input.charCodeAt(i++)
      chr2 = input.charCodeAt(i++)
      chr3 = input.charCodeAt(i++)
      enc1 = chr1 >> 2
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      enc4 = chr3 & 63
      if (isNaN(chr2)) {
        enc3 = enc4 = 64
      } else if (isNaN(chr3)) {
        enc4 = 64
      }
      output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
    }
    return output
  },
  utf8Encode: function (string) {
    string = string.replace(/\r\n/g, '\n')
    var utftext = ''
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n)
      if (c < 128) {
        utftext += String.fromCharCode(c)
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192)
        utftext += String.fromCharCode((c & 63) | 128)
      } else {
        utftext += String.fromCharCode((c >> 12) | 224)
        utftext += String.fromCharCode(((c >> 6) & 63) | 128)
        utftext += String.fromCharCode((c & 63) | 128)
      }
    }
    return utftext
  },
  // 检查日期时间数据是否正确
  checkDateNull: function (value) {
    var callBack = false
    if (!this.isEmpty(value)) {
      value += ''
      var obj = value.split(',')
      for (let item in obj) {
        if (this.isEmpty(obj[item])) {
          callBack = true
        }
      }
    }
    return callBack
  },

  /**
   *  金额格式化
   *  参数说明：
   *  s：要格式化的数字
   *  n：保留几位小数
   */
  currency: function (s, n) {
    if (s === null || s === '') return ''
    n = n > 0 && n <= 20 ? n : 2
    s = parseFloat((s + '').replace(/[^\d.]/g, '')).toFixed(n) + ''
    var l = s.split('.')[0].split('').reverse(),
      r = s.split('.')[1]
    var t = ''
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
    }
    return t.split('').reverse().join('') + '.' + r
  }
}
