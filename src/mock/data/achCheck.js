
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
                    "name1": /\d{7}/,
                    'name2':"@cname",
                    'name3': /(\d{4})/,
                    "name4": /(\d{2})/,
                    "name5":/(门店)(\d{2})/,
                    'name6': /(\d{4})(\/)(\d{3})/,
                }
            ],
            "resultList1|8-12": [
                {
                    "id": /\d{7}/,
                    "name1": /\d{7}/,
                    'name2':"@cname",
                    'name3': /(\d{4})(\/)(\d{3})/,
                }
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}