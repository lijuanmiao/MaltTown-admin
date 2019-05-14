
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
                    "name": /(分店)(\d{2})/,
                    "address": /(宜山路)(\d{4})(号)/,
                    "tel": /\d{7,10}/,
                    "shopOwner": "@cname",
                    "deptNum": /\d{1,2}/,
                    "personnelNum":/\d{2,3}/,
                    "memberNum": /\d{2,4}/,
                    "state": '@pick(["正常","停业"])',
                    "time": '09:00-22:00',
                }
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}