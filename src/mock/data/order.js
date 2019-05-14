
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
                    "no": /\d{7}/,
                    "orderId": /\d{7}/,
                    "cname":'@pick(["课程名","教练***"])',
                    "ctype":'@pick(["私教课","团体课"])',
                    "type":'@pick(["跑步机","淋浴器","储物柜","功能饮料"])',
                    "price":/\d{2,4}/,
                    "time":Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                    "state":'@pick(["未支付","已支付","已取消"])',
                    "paytype":'@pick(["线下现金","线下刷卡","线下转账","线上APP"])',
                }
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}