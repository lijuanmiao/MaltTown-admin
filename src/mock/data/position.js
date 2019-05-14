
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
                    'branch':/(分店)(\d{2})/,
                    'positionName':/(职位)(\d{2})/,
                    "positionDesc":  /(职位描述)(\d{2})/,
                }
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}