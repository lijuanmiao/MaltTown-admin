
import Mock from 'mockjs'

export default {

    opLoginUser: {
        "resCode": "0000",
        "token": "d3fb17b3-0cce-44fa-a1a9-1983bc3047af",
        "userBasic": {
            "id": -1,
            "loginName": "root",
            "userName": "超级管理员",
            "merchantId": -1,
            "menuCodes": {
                "I0000": true, "I0100": true,
                "S0000": true, "S0200": true, "S0201": true, "S0202": true, "S0300": true, "S0310": true,
                "S0311": true, "S0312": true, "S0313": true, "S0314": true, "S0320": true, "S0321": true,
                "S0322": true, "S0323": true, "S0330": true, "S0331": true, "S0332": true, "S0340": true,
                "C0000": true, "C0100": true, "C0101": true, "C0102": true, "C0103": true, "C0200": true,
                "C0201": true, "C0202": true, "C0203": true
            }
        }
    },

    getInfo: (id) => {
        return Mock.mock({
            "resCode": "0000",
            "resultModel": {
                "id": id == -1 ? null : id,
                "loginName": id == -1 ? null : "@first",
                "userName": id == -1 ? null : "@cname",
                "merchantId": -1,
                "merchantName": null,
                "userLevel|1": ["0", "1"],
                "userPhone": id == -1 ? null : /\d{7,10}/,
                "userMail": id == -1 ? null : '@email',
                "errorCount": null,
                "lockFlag": "1",
                "limitLockTime": null,
                "isActive": "0",
                "roleIds": null,
                "roleList|3-10": [
                    {
                        "id|+1": 1,
                        "roleName": "角色 @id ",
                        "roleDesc": "角色 @id 描述",
                        "merchantId": -1,
                        "isActive": "0",
                        "isSelected|1-3": false
                    }],
                "userLevelDesc": null
            }
        })
    },

    getList: (pageSize) => {
        return Mock.mock({
            "resCode": "0000",
            "pageCount": 1,
            "currentPage": 1,
            "resultList|10-20": [
                {
                    "id|+1": (pageSize - 1) * 20 + 1,
                    "loginName": '@first',
                    "userName": "@cname",
                    "merchantId": -1,
                    "merchantName": null,
                    "userLevel": "0",
                    "userPhone": /\d{7,10}/,
                    "userMail": '@email',
                    "errorCount": null,
                    "lockFlag": "1",
                    "limitLockTime": null,
                    "isActive": "0",
                    "roleIds": null,
                    "menuCodes": {},
                    "permissionMenu": {},
                    "roleList": [],
                    "userLevelDesc": '@pick(["管理员","普通操作员"])'
                }
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}