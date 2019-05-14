
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
                    'name':/(卡种名称)(\d{2})/,
                    'type':'@pick(["月卡","年卡","次卡"])',
                    "times":/\d{1,2}/,
                    "time":Mock.Random.date('yyyy-MM-dd hh:mm:ss')+'-'+Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
                    "state": '@pick(["在售","已停售"])',
                    "range": '@pick(["全国","上海所有门店","济南所有门店","上海门店1、上海门店2"])',
                    "desc":  /(描述)(\d{2})/,
                    "price": /\d{7}/
                }
            ],
            "resultCount|21-42": 2,
            "pageSize": 20,
            "resDesc": "操作成功"
        })
    }
}