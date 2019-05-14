
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
                    "coach":"@cname",
                    "no": /\d{7}/,
                    'course':/(课程)(\d{2})/,
                    "phoneNum": /\d{11}/,
                    'tNumCount':/\d{2,3}/,
                    'sNumCount':/\d{2,3}/,
                    'tNumM':/(\d{1})(-)(\d{1})/,
                    'sNumM':/(\d{1})(-)(\d{1})/,
                    'tNumW':/(\d{1})(-)(\d{1})/,
                    'sNumW':/(\d{1})(-)(\d{1})/,
                    "orderedatime":Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                    "orderedList|0-10": [
                        {
                            "id": /\d{7}/,
                            "no": /\d{7}/,
                            'branch':/(分店)(\d{2})/,
                            'type':'@pick(["私教课程","团体课程"])',
                            "coach":"@cname",
                            "setUser":"@cname",
                            "state": '@pick(["未开始","进行中","爽约","已完成"])',
                            "orderedatime":Mock.Random.date('yyyy-MM-dd hh:mm:ss')+'-'+Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                            "overallScore":'@pick(["1","2","3","4","5"])',
                            "branchScore":'@pick(["1","2","3","4","5"])',
                            "coachScore":'@pick(["1","2","3","4","5"])',
                            "rate":'@pick(["不满意","一般","满意"])',
                            "rateDesc":'满意度描述满意度描述满意度描述满意度描述满意度描述', 
                        }
                    ],
                }
            ],
            "resultList1|10-12": [
                {
                    'userNo':/\d{7}/,
                    "name": "@cname",
                    "phoneNum": /\d{11}/,
                    'course':/(课程)(\d{2})/,
                    'courseType':'@pick(["私教课程","团体课程"])',
                    "coach":"@cname",
                    "no": /\d{7}/,
                    'store':/(门店)(\d{2})/,
                    "time1":Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                    "time2":Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                    "storeRemark":'@pick(["1","2","3","4","5"])',
                    "courseRemark":'@pick(["1","2","3","4","5"])',
                    "coachRemark":'@pick(["1","2","3","4","5"])',
                    "rateDesc":'满意度描述满意度描述满意度描述满意度描述满意度描述', 
                }
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}