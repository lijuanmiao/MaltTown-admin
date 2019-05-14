
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
                    "branch": /(分店)(\d{2})/,
                    'userNo':/\d{7}/,
                    'late':/\d{1}/,
                    'leave':/\d{1}/,
                    "name": "@cname",
                    'nickName':'@first',
                    "phoneNum": /\d{11}/,
                    'idCard':/\d{18}/,
                    "state":'@pick(["在岗","下班","请假"])',
                    "createTime":Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                    "otherList|1-3": [
                        {
                            "time1": Mock.Random.date('hh:mm:ss'),
                            "time2": Mock.Random.date('hh:mm:ss'),
                            "date": Mock.Random.date('yyyy-MM-dd'),
                        }
                    ]
                }
            ],
            "resultList1|8-12": [
                {
                    "time1": Mock.Random.date('hh:mm:ss'),
                    "time2": Mock.Random.date('hh:mm:ss'),
                    "date": Mock.Random.date('yyyy-MM-dd'),
                }
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}