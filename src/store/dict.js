import api from '../config/axios-config'

let dictCache = {}

export default {
  // 获取字典列表
  dict: (pCode) => {
    return new Promise(function (resolve, reject) {
      let list = dictCache[pCode]
      if (list) {
        resolve(list)
      } else {
        api.get('dict/list', { params: {pCode: pCode} }).then((result) => {
          let _result = result.data
          if (_result.resCode === '0000') {
            let _list = _result.resultList
            list = []
            _list.forEach(({cCode, cName}) => list.push({ text: cName, value: cCode }))
            dictCache[pCode] = list
            resolve(list)
          }
        })
      }
    })
  }
}
