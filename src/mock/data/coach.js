
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
                    "coach":"@cname",
                    "member":"@cname",
                    "goodField": '@pick(["肌肉塑造、翘臀美腿、减脂塑形","减脂塑形、翘臀美腿","肌肉塑造、体能训练、减脂增肌",])',
                    "field":'@pick(["分店1、分店2、分店3","分店1、分店3","分店3",])',
                    "prize":/\d{2}/,
                    "type":'@pick(["注册教练","修改信息",])',
                    "type1":'@pick(["正式员工","外聘教练",])',
                }
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}