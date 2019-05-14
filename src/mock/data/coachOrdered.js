
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
                    'branch':/(分店)(\d{2})/,
                    'type':/(课程)(\d{2})/,
                    "coach":"@cname",
                    "member":"@cname",
                    "setUser":"@cname",
                    "state": '@pick(["预约中","上课中","客户爽约","已消课"])',
                    "orderedatime":Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                    "overallScore":'@pick([1,2,3,4,5])',
                    "branchScore":'@pick([1,2,3,4,5])',
                    "coachScore":'@pick([1,2,3,4,5])',
                    "rate":'@pick(["不满意","一般","满意"])',
                    "rateDesc":'满意度描述满意度描述满意度描述满意度描述满意度描述',
                    "times1": /\d{1}/,
                    "times2": /\d{1,2}/,
                }
            ],
            "resultList1": [
                {
                    "time": '09:00-09:30',
                    "info1": "@cname",
                    "info2": "-",
                    "info3": "@cname",
                    "info4": "@cname",
                    "info5": "@cname",
                    "info6": "-",
                    "info7": "@cname",
                },{
                    "time": '09:30-10:00',
                    "info1": "@cname",
                    "info2": "@cname",
                    "info3": "-",
                    "info4": "@cname",
                    "info5": "@cname",
                    "info6": "-",
                    "info7": "@cname",
                },{
                    "time": '10:00-10:30',
                    "info1": "@cname",
                    "info2": "@cname",
                    "info3": "-",
                    "info4": "@cname",
                    "info5": "@cname",
                    "info6": "@cname",
                    "info7": "@cname",
                },{
                    "time": '10:30-11:00',
                    "info1": "-",
                    "info2": "-",
                    "info3": "-",
                    "info4": "-",
                    "info5": "-",
                    "info6": "-",
                    "info7": "-",
                }
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}