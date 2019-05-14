
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
                    'nickName':'@first',
                    "phoneNum": /\d{11}/,
                    'idCard':/\d{18}/,
                    "state":'@pick(["在职","离职","停薪留职"])',
                    "createTime":Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                    "store": /(分店)(\d{2})/,
                    "dept": "@cname",
                    "roles": '@pick(["教练主管","会籍顾问","会籍主管"])',
                }
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}