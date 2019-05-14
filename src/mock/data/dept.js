
import Mock from 'mockjs'

export default {

    getList: (pageSize) => {
        return Mock.mock({
            "resCode": "0000",
            "resultList|1-3": [
                {
                    "id":  /\d{7}/,
                    "label": /(教练)(\d{2})/,
                    "children|1-3":[
                        {
                            "id":  /\d{7}/,
                            "label": /(教练)(\d{2})/,
                            "children|1-3":[
                                {
                                    "id":  /\d{7}/,
                                    "label": /(教练)(\d{2})/
                                }
                            ]
                        }
                    ] 
                }
            ],
            "resDesc": "操作成功"
        })
    },
    getDeptList: (pageSize) => {
        return Mock.mock({
            "resCode": "0000",
            "resultList|8-10": [
                {
                    "id":  /\d{7}/,
                    "deptName": /(部门)(\d{2})/,
                    "deptDesc": /(部门描述)(\d{2})/,
                    "parentDept": /(部门)(\d{2})/,
                }
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}