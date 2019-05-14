
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
                    'name':/(器材种类)(\d{2})/,
                    "desc":  /(种类描述)(\d{2})/,
                }
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}