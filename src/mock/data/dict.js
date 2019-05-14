
import Mock from 'mockjs'

export default {

    getList: (dictName) => {
        switch (dictName) {
            case "userLevel":
                return {
                    "resCode": "0000",
                    "pageCount": null,
                    "currentPage": null,
                    "resultList": [
                        {
                            "id": 1,
                            "pCode": "userLevel",
                            "cCode": "1",
                            "cName": "普通操作员",
                            "cAttr": null,
                            "merchantId": -1,
                            "isActive": "0"
                        },
                        {
                            "id": 2,
                            "pCode": "userLevel",
                            "cCode": "0",
                            "cName": "管理员",
                            "cAttr": null,
                            "merchantId": -1,
                            "isActive": "0"
                        }
                    ],
                    "resultCount": null,
                    "pageSize": null,
                    "resDesc": "操作成功"
                }
        }

    }
}