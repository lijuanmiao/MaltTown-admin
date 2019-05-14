
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
                    "type":'@pick(["更衣柜","跑步机","椭圆机","台阶器","淋浴器","门禁"])',
                    "state":'@pick(["正常","维修中","报废","使用中","预约中"])',
                    'branch':/(分店)(\d{2})/,
                    "name":  /(器材名称)(\d{2})/,
                    "desc":  /(描述)(\d{2})/,
                    "date":Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                }
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}