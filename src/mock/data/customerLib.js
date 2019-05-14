
import Mock from 'mockjs'

export default {

    getList: (pageSize) => {
        return Mock.mock({
            "resCode": "0000",
            "pageCount": 1,
            "currentPage": 1,
            "resultList|8-12": [
                {
                    "id": /\d{7}/,
                    'userNo':/\d{7}/,
                    "name": "@cname",
                    "phoneNum": /\d{11}/,
                    'type':'@pick(["一级客户","二级客户"])',
                    'state':'@pick(["新客户","已放弃"])',
                    "sex":'@pick(["男","女"])',
                    "shipName": '@pick(["-","-","***"])',
                    "time":Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                }
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}