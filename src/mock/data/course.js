
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
                    'name':/(课程)(\d{2})/,
                    "aname": "@cname",
                    "coach":"@cname",
                    "type": '@pick(["私教课程","团体课程"])',
                    "state": '@pick(["未开售","已开售","已下架"])',
                    "state1": '@pick(["未审核","已通过","已驳回"])',
                    "branch": /(分店)(\d{2})/,
                    "price":/\d{3}/,
                    "num":/\d{1}/,
                    "num1": '@pick(["20","30","-"])',
                    "discount":/\d{1}/,
                    "isNo":'@pick(["已推荐","-"])',
                    "desc":  /(课程描述)(\d{2})/,
                    "timeLimit": '@pick(["0.5","1","6",,"12"])',
                    "plan":  '课程规划课程规划课程规划课程规划课程规划课程规划课程规划课程规划课程规划课程规划课程规划课程规划课程规划课程规划课程规划课程规划课程规划课程规划课程规划课程规划课程规划课程规划课程规划课程规划课程规划',
                }
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}