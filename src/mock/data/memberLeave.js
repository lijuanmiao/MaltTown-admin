
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
                    "phone":/\d{11}/,
                    "leaveDesc": '@pick(["调休","家中有事","看病就医","离家近，方便工作"])',
                    "leaveTime":Mock.Random.date('yyyy-MM-dd hh:mm:ss')+'-'+Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                }
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}