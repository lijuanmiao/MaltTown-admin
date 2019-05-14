
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
                    'type':'@pick(["会籍开发","集团开发","会员介绍"])',
                    'state':'@pick(["未付费","已付费"])',
                    "sex":'@pick(["男","女"])',
                    "shipName": "@cname",
                    "time":Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                    "time1":Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                    "no": /(QD)\d{5}/,
                    "channelname": /(渠道)\d{3}/,
                    "no1": /(id)\d{5}/,
                    "developer": "@cname",
                    "phoneNum1": /\d{11}/,
                    "settleMoney": /\d{3,4}/,
                    "num1": /\d{3,4}/,
                    "num2": /\d{3,4}/,
                    "settleMonth": "2017-08",
                    "settleType": '@pick(["未结算","已结算"])',
                    "address": /(地址)\d{3}/,
                    "setname": "@cname",
                    "num3": /\d{1,2}/,
                    "num4": /\d{1,2}/,
                    'source':'@pick(["会籍开发","渠道1","渠道2"])',
                    'is':'@pick(["是","否"])',
                    'channel':'@pick(["渠道1","渠道2"])',
                }
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}