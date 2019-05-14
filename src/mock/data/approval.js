
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
                    "approvalUser":"@cname",
                    "branch": /(分店)(\d{2})/,
                    "position": /(职位)(\d{2})/,
                    "type": '@pick(["请假","晋升","调店"])',
                    "state": '@pick(["未审批","已审批","已结束","已取消"])',
                    "desc": '@pick(["调休","家中有事","看病就医"])',
                    "dateTime":Mock.Random.date('yyyy-MM-dd hh:mm:ss')+'-'+Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                }
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}