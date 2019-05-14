
import Mock from 'mockjs'

export default {
    getInfo: (id) => {
        return Mock.mock({
            "resCode": "0000",
            "resultModel": {
                "id": id == -1 ? null : id,
                "roleName": id == -1 ? null : '角色 @id',
                "roleDesc": id == -1 ? null : '角色 @id ，描述',
                "merchantId": null, "isDefaultAllocate": null, "menuIds": "", "isSelected": false,
                "sysMenuList": [
                    {
                        "id": 1, "menuCode": "I0000", "menuUpCode": "0000", "menuName": "工作台", "menuDesc": "工作台", "children": [
                            { "id": 2, "menuCode": "I0100", "menuUpCode": "I0000", "menuName": "首页", "menuDesc": "首页", "children": [], "isSelected": false }], "isSelected": false
                    },
                    {
                        "id": 3, "menuCode": "S0000", "menuUpCode": "0000", "menuName": "管理中心", "menuDesc": "管理中心", "children": [
                            {
                                "id": 4, "menuCode": "S0200", "menuUpCode": "S0000", "menuName": "个人中心", "menuDesc": "个人中心", "children": [
                                    { "id": 5, "menuCode": "S0201", "menuUpCode": "S0200", "menuName": "个人信息修改", "menuDesc": "个人信息修改", "children": [], "isSelected": false },
                                    { "id": 6, "menuCode": "S0202", "menuUpCode": "S0200", "menuName": "密码修改", "menuDesc": "密码修改", "children": [], "isSelected": false }], "isSelected": false
                            },
                            {
                                "id": 7, "menuCode": "S0300", "menuUpCode": "S0000", "menuName": "系统管理", "menuDesc": "系统管理", "children": [
                                    {
                                        "id": 8, "menuCode": "S0310", "menuUpCode": "S0300", "menuName": "操作员管理", "menuDesc": "操作员管理", "children": [
                                            { "id": 9, "menuCode": "S0311", "menuUpCode": "S0310", "menuName": "新增操作员", "menuDesc": "新增操作员", "children": [], "isSelected": false },
                                            { "id": 10, "menuCode": "S0312", "menuUpCode": "S0310", "menuName": "修改操作员", "menuDesc": "修改操作员", "children": [], "isSelected": false },
                                            { "id": 11, "menuCode": "S0313", "menuUpCode": "S0310", "menuName": "删除操作员", "menuDesc": "删除操作员", "children": [], "isSelected": false },
                                            { "id": 12, "menuCode": "S0314", "menuUpCode": "S0310", "menuName": "重置密码", "menuDesc": "重置密码", "children": [], "isSelected": false }
                                        ], "isSelected": false
                                    },
                                    {
                                        "id": 13, "menuCode": "S0320", "menuUpCode": "S0300", "menuName": "角色管理", "menuDesc": "角色管理", "children": [
                                            { "id": 14, "menuCode": "S0321", "menuUpCode": "S0320", "menuName": "新增角色", "menuDesc": "新增角色", "children": [], "isSelected": false },
                                            { "id": 15, "menuCode": "S0322", "menuUpCode": "S0320", "menuName": "修改角色", "menuDesc": "修改角色", "children": [], "isSelected": false },
                                            { "id": 16, "menuCode": "S0323", "menuUpCode": "S0320", "menuName": "删除角色", "menuDesc": "删除角色", "children": [], "isSelected": false }], "isSelected": false
                                    },
                                    {
                                        "id": 17, "menuCode": "S0330", "menuUpCode": "S0300", "menuName": "参数设置", "menuDesc": "参数设置", "children": [
                                            { "id": 18, "menuCode": "S0331", "menuUpCode": "S0330", "menuName": "保存", "menuDesc": "参数设置-保存", "children": [], "isSelected": false },
                                            { "id": 19, "menuCode": "S0332", "menuUpCode": "S0330", "menuName": "设置默认", "menuDesc": "参数设置-设置默认", "children": [], "isSelected": false }], "isSelected": false
                                    },
                                    { "id": 20, "menuCode": "S0340", "menuUpCode": "S0300", "menuName": "日志查询", "menuDesc": "日志查询", "children": [], "isSelected": false },
                                    {
                                        "id": 37, "menuCode": "S0350", "menuUpCode": "S0300", "menuName": "缓存管理", "menuDesc": "缓存管理", "children": [
                                            { "id": 38, "menuCode": "S0351", "menuUpCode": "S0350", "menuName": "清空", "menuDesc": "缓存管理-清空", "children": [], "isSelected": false }], "isSelected": false
                                    }], "isSelected": false
                            }], "isSelected": false
                    },
                ]
            }, "resDesc": null
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
                    "roleName": "角色 @id ",
                    "roleDesc": "角色 @id 描述",
                    "isDefaultAllocate": "1",
                    "isActive": "0",
                    "menuIds": null,
                    "isSelected": false,
                    "sysMenuList": []
                },
            ],
            "resultList1|10-20": [
                {
                    "id": /\d{7}/,
                    "name": /(名字)(\d{7})/,
                    "url": /(http:\/\/shangyingTy\/active\/)(\d{7})/,
                    "orderby": /\d{1,2}/,
                    "state": '@pick(["已使用","未使用"])',
                },
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}