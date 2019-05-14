
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
                    "phoneNum": /\d{11}/,
                    'idCard':/\d{18}/,
                    "sex":'@pick(["男","女"])',
                    "shipType": '@pick(["渠道","会籍","会员","-"])',
                    "shipName": '@pick(["张**","渠道**","刘**","-"])',
                    "source": '@pick(["IOS","安卓","微信","其他"])',
                    "birthday":Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                    "createTime":Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                    "time":Mock.Random.date('yyyy-MM-dd hh:mm:ss')+'-'+Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                    'count':/\d{2,4}/,
                    'no':/(SH)(\d{7})/,
                    'no1':/(SB)(\d{7})/,
                    "name1": "刘**",
                    "equipment": '@pick(["跑步机","动感单车","其他"])',
                    'selete':/\d{1}/,
                    "channel":'@pick(["会籍开户","渠道1","渠道2"])',
                    "rechargeType":'@pick(["押金","会费","余额"])',
                    "rechargeChannel":'@pick(["支付宝","微信","其他"])',
                    "rechargeState":'@pick(["已支付","未支付"])',
                    "spendingType":'@pick(["普通消费","消费冻结","冻结撤销","冻结扣费"])',
                    "spending":'@pick(["私课1","私课2","团课1","团课2","跑步机","动感单车"])',
                    "couponType":'@pick(["代金券"])',
                    "useRange":'@pick(["不限","私课","团课"])',
                    "couponState":'@pick(["未使用","使用中","已使用","已过期"])',
                    "desc":/(获取事由)(\d{2})/,
                    'num1':/\d{2,3}/,
                    'num2':/\d{2,3}/,
                    'num3':/\d{2,3}/,
                    'num4':/\d{2,3}/,
                    'num5':/\d{2,3}/,
                    'num6':/\d{2,3}/,
                    'num7':/\d{2,3}/,
                    'num8':/\d{2,3}/,
                    'num9':/\d{2,3}/,
                    'num0':/\d{2,3}/,
                    "serviceList": [
                        {
                            "name": "余额",
                            "price":'3000',
                            "time":'永久',
                            "desc":'-',
                        },
                        {
                            "name": "开户",
                            "price":'99',
                            "time":'永久（系统可设置）',
                            "desc":'退会返还',
                        },
                        {
                            "name": "押金",
                            "price":'500',
                            "time":'永久',
                            "desc":'可退',
                        },
                        
                    ],
                    "otherList|1-2": [
                        {
                            "dateTime":Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                            'no':/(SH)(\d{7})/,
                            "event":'@pick(["发放","更换","购买"])',
                            "user": "@cname",
                            'store':/(门店)(\d{7})/,
                        },
                    ],
                }
            ],
            "infoList|10-12": [
                {
                    'no':/(SH)(\d{7})/,
                    'no1':/(PC)(\d{7})/,
                    "id": /\d{7}/,
                    "type":'@pick(["XH00001","XH00002","XH00003"])',
                    "dateTime":Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                    "state":'@pick(["库存中","已出库"])',
                    'store':/(门店)(\d{7})/,
                    'num':/\d{2,3}/,
                    "type1":'@pick(["全新手环","临时手环"])',
                    "name": "@cname",
                    "name1": "@cname",
                    "event":'@pick(["发放","购买"])',
                },
            ],
            "hisList|10-12": [
                {
                    "dateTime":Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                    'no':/(SH)(\d{7})/,
                    "event":'@pick(["租借","退还",])',
                    "user": "@cname",
                    'store':/(门店)(\d{7})/,
                    "type":'@pick(["全新手环","临时手环"])',
                    "name": "@cname",
                },
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}