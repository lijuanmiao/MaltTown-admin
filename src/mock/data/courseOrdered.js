
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
                    'courseName':/(课程)(\d{2})/,
                    'storeName':/(门店)(\d{2})/,
                    "coach":"@cname",
                    "setUser":"@cname",
                    "memberNo":/\d{7}/,
                    "memberName":"@cname",
                    "courseType": '@pick(["一对一","一对多"])',
                    "state": '@pick(["未开始","上课中","缺课","已完成","已取消"])',
                    "dateTime":Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                    "dateTime1":Mock.Random.date('yyyy-MM-dd hh:mm:ss')+'-'+Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                    "num1":/\d{2}/,
                    "num2":/\d{1}/,
                }
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}