
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
                    'no':/\d{7}/,
                    "name": "@cname",
                    "type":'@pick(["注册量","付费量"])',
                    "term":Mock.Random.date('yyyy-MM-dd hh:mm:ss')+'-'+Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                    "quotaNum": /\d{1,2}/,
                    "doneNum": /\d{1,2}/,
                    "state":'@pick(["已取消","已完成","未完成"])',
                    "quotaNum": /\d{1,2}/,
                    "quotaNum": /\d{1,2}/,
                    "distributeName": "@cname",
                    "distributeTime":Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                    "desc":/(任务描述)(\d{2})/,
                    "otherList|1-5": [
                        {
                            "name": "@cname",
                            'phone':/\d{7}/,
                            "time":Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                        }
                    ]
                }
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}