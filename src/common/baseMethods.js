import axios from 'axios'
import NProgress from 'nprogress'
import util from './util'
import * as constants from '../store/constant'
import dictApi from '../store/dict'
import {SUCCESS_CODE} from '../config/config'
import opInfo from './opInfo'
import {Loading} from 'element-ui'

// let LOCK_LIST = false

export default class baseMethods {
  // 过滤列表查询
  filterList = function (filters) {
    util.filterParam(this[constants.QUERY_FORM], filters)
    this.pageList()
  }
  // 排序列表查询
  sortList = function (sort) {
    if (sort.column) {
      this[constants.QUERY_SORT] = util.sortParam(sort)
      this.pageList()
    }
  }
  // 分页列表查询
  pageList = function (page = 1, arg = {}) {
    this.baseUrl(arg)
    this[constants.LOADING] = true  // loading
    // if (!LOCK_LIST) {
    // LOCK_LIST = true
    let json = {}
    json.page = page
    if (!util.isEmpty(arg)) {
      json.customAct = arg.customAct
    }
    this.list(json).then((result) => {
      let _result = result.data
      this[constants.RESULT_DATA] = _result
      if (_result.resCode === SUCCESS_CODE) {
        // 若需要单独处理返回的数据，需使用callback  可参照commission.vue
        if (!util.isEmpty(arg.callback)) {
          this[constants.CALLBACK].callback = arg.callback
          this[constants.CALLBACK].data = result.data
          this[constants.CALLBACKTAG] = Math.random() * Math.random()
        }
      } else if (_result.resCode === '60003') {
        this.$message({
          message: _result.resDesc,
          type: 'error'
        })
        opInfo.clearOpInfo() // 清空 操作员信息
        this.$router.push(process.env.PATH_ROUTER + '/login')  // 去登录
      } else {
        this.$message({
          message: _result.resDesc,
          type: 'error'
        })
      }
      // setTimeout(() => {
      this[constants.LOADING] = false
      //   LOCK_LIST = false
      // }, LIST_LOAD_TIME)
    }).catch(() => {
      this[constants.LOADING] = false
    })
    // }
  }
  // 检索列表
  list = function (arg) {
    let page = arg.page
    // 当vue组件中QUERY_FORM={}时 默认检索全部 QUERY_FORM={id:10}  检索id=10的数据列表
    let queryParam = this[constants.QUERY_FORM]
    // 排序
    let sort = this[constants.QUERY_SORT]
    // 整合参数
    let param = {
      page: page,
      pageSize: this.$store.state.pagination.pageSize,
      search: queryParam, // 检索参数
      ...sort
    }
    //param = Object.assign(param,queryParam)
    // 拼接路径
    let url = !util.isEmpty(arg.customAct) ? this.getUrl(arg.customAct) + '/list' : this.getUrl('list') + '/list'
    return this.$http.get(url, {params: param})
  }
  // 获取详情函数 一般用于编辑的时候，获取填充表单的数据信息等
  detail = function (arg) {
    this.baseUrl(arg)
    let loading = Loading.service({fullscreen: true})
    let url = !util.isEmpty(arg.customAct) ? `${this.getUrl(arg.customAct)}/${arg.id}/detail` : `${this.getUrl('detail')}/${arg.id}/detail`
    this.$http.get(url, {}).then((result) => {
      let _result = result.data
      let callback = arg.callback
      loading.close()
      if (_result.resCode === SUCCESS_CODE) {
        if (!util.isEmpty(callback)) {
          this[constants.CALLBACK].callback = callback
          this[constants.CALLBACKTAG] = Math.random() * Math.random()
        }
      } else if (_result.resCode === '60003') {
        this.$message({
          message: _result.resDesc,
          type: 'error'
        })
        opInfo.clearOpInfo()
        this.$router.push(process.env.PATH_ROUTER + '/login')
      } else {
        this.$message({
          message: _result.resDesc,
          type: 'error'
        })
      }
      this.simpleDetail({obj: _result.model})
    }).catch(() => {

    })
  }
  // 新增按钮操作函数
  add = function (arg = {}) {
    let title = arg.title
    if (!title) title = this.$t('lang.dialog.addTitle')
    let obj = JSON.parse(JSON.stringify(this[constants.EMPTY_FORM]))
    this[constants.DIALOG_TITLE] = title
    this[constants.OPEN_DIALOG_FLAG] = true
    this[constants.DIALOG_FORM] = obj
    this[constants.CURRENT_ACT] = constants.ADD
  }
  // 新增按钮操作函数,调用获取详情来获取信息合并输出
  addBack = function (arg = {id: -1}) {
    this.$http.get(`${this.getUrl('detail')}/${arg.id}`, {}).then((result) => {
      let title = arg.title
      if (!title) title = this.$t('lang.dialog.addTitle')
      this[constants.DIALOG_TITLE] = title
      this[constants.OPEN_DIALOG_FLAG] = true
      this[constants.DIALOG_FORM] = (result.data).resultModel
      this[constants.CURRENT_ACT] = constants.ADD
    })
  }
  // 修改按钮操作函数
  simpleDetail = function (arg) {
    let obj = JSON.parse(JSON.stringify(arg.obj))
    let title = arg.title
    if (!title) title = this.$t('lang.dialog.editTitle')
    this[constants.DIALOG_TITLE] = title
    this[constants.OPEN_DIALOG_FLAG] = true
    this[constants.DIALOG_FORM] = obj
    this[constants.CURRENT_ACT] = constants.EDIT
  }
  // 删除按钮操作函数
  del = function (arg) {
    let objName = arg.objName
    let objId = arg.id
    this.$confirm(this.$t('lang.del.confirm', {msg: objName}), this.$t('lang.common.title'), {}).then(() => {
      this.baseUrl(arg)
      let url = !util.isEmpty(arg.customAct) ? this.getUrl(arg.customAct) + '/' + objId : this.getUrl('del') + '/' + objId
      let loading = Loading.service({fullscreen: true})
      if (arg.methods === 'delete') {
        this.$http.delete(url, {}).then((result) => {
          loading.close()
          this.delCallback(arg, result)
        }).catch(() => {

        })
      } else {
        this.$http.get(url, {}).then((result) => {
          loading.close()
          this.delCallback(arg, result)
        }).catch(() => {

        })
      }
    }).catch(() => {

    })
  }
  delCallback = function (arg, result) {
    let _result = result.data
    if (_result.resCode === SUCCESS_CODE) {
      this.$message({
        message: this.$t('lang.del.success'),
        type: 'success'
      })
      let callback = arg.callback
      if (!util.isEmpty(callback)) {
        this[constants.CALLBACK].callback = callback
        this[constants.CALLBACKTAG] = Math.random() * Math.random()
      } else {
        if (!util.isEmpty(arg.page)) {
          if (arg.page.currentPage === arg.page.pageCount && (arg.page.resultCount - arg.page.pageSize) === 1) {
            if (!util.isEmpty(arg.baseUrl)) {
              this.pageList(arg.page.currentPage - 1, {baseUrl: arg.baseUrl})
            } else {
              this.pageList(arg.page.currentPage - 1)
            }
          } else {
            if (!util.isEmpty(arg.baseUrl)) {
              this.pageList(arg.page.currentPage, {baseUrl: arg.baseUrl})
            } else {
              this.pageList(arg.page.currentPage)
            }
          }
        } else {
          if (!util.isEmpty(arg.baseUrl)) {
            this.pageList(1, {baseUrl: arg.baseUrl})
          } else {
            this.pageList()
          }
        }
      }
      this[constants.OPEN_DIALOG_FLAG] = false
    } else if (_result.resCode === '60003') {
      this.$message({
        message: _result.resDesc,
        type: 'error'
      })
      opInfo.clearOpInfo()
      this.$router.push(process.env.PATH_ROUTER + '/login')
    } else {
      this.$message({
        message: _result.resDesc,
        type: 'error'
      })
    }
    NProgress.done()
    this[constants.BUTTON_LOADING] = false
  }
  // 自定义post操作函数，如果有 confirm的值，弹出对话框
  customPost = function (arg) {
    let confirmMsg = arg.confirmMsg
    if (confirmMsg) {
      this.$confirm(confirmMsg, this.$t('lang.common.title'), {}).then(() => {
        return this.customShortcutPost(arg)
      }).catch(() => {

      })
    } else {
      return this.customShortcutPost(arg)
    }
  }
  // 自定义post操作函数，快速提交
  customShortcutPost = function (arg) {
    //请求地址 变量
    let customAct = arg.customAct
    //直接写地址
    let actUrl = arg.actUrl
    //成功提示
    let message = arg.message
    //参数
    let param = arg.postParam
    let reLoad = arg.reLoad
    let callback = arg.callback
    if (reLoad !== false) reLoad = true
    if (message !== false) message = true
    this.baseUrl(arg)
    customAct = this.getUrl(customAct) + (actUrl ? '/' + actUrl : '')
    let loading = Loading.service({fullscreen: true})
    this.$http.post(customAct, param).then((result) => {
      let _result = result.data
      loading.close()
      if (_result.resCode === SUCCESS_CODE) {
        if (!util.isEmpty(callback)) {
          this[constants.CALLBACK].callback = callback
          this[constants.CALLBACK].data = _result
          this[constants.CALLBACKTAG] = Math.random() * Math.random()
        }
        if (message) {
          let message = !util.isEmpty(arg.messageValue) ? arg.messageValue : this.$t('lang.save.success')
          this.$message({
            message: message,
            type: 'success'
          })
        }
        if (reLoad) this.pageList()
        this[constants.OPEN_DIALOG_FLAG] = false
      } else if (_result.resCode === '60003') {
        this.$message({
          message: _result.resDesc,
          type: 'error'
        })
        opInfo.clearOpInfo()
        this.$router.push(process.env.PATH_ROUTER + '/login')
      } else {
        if (arg.other === true) {
          if (!util.isEmpty(callback)) {
            this[constants.CALLBACK].callback = callback
            this[constants.CALLBACK].data = _result
            this[constants.CALLBACKTAG] = Math.random() * Math.random()
          }
        }
        this.$message({
          message: _result.resDesc,
          type: 'error'
        })
      }
      NProgress.done()
      this[constants.BUTTON_LOADING] = false
    }).catch(() => {

    })
  }
  // 自定义get函数
  customGet = function (arg) {
    let customAct = arg.customAct
    let queryParam = arg.queryParam
    let callback = arg.callback
    let sort = arg.sort
    let reLoad = arg.reLoad
    let message = arg.message
    if (reLoad !== false) reLoad = true
    if (message !== false) message = true
    let page = null;
    let pageSize = null;
    if (arg.page) {
      page = arg.page;
    }
    if (arg.pageSize) {
      pageSize = arg.pageSize;
    }
    let param = {
      search: queryParam,
      page,
      pageSize,
      ...sort
    }
    this.baseUrl(arg)
    let loading = Loading.service({fullscreen: true})
    this.$http.get(this.getUrl(customAct), {params: param}).then((result) => {
      let _result = result.data
      loading.close()
      if (_result.resCode === SUCCESS_CODE) {
        if (!util.isEmpty(callback)) {
          this[constants.CALLBACK].callback = callback
          this[constants.CALLBACK].data = _result
          this[constants.CALLBACKTAG] = Math.random() * Math.random()
        }
        if (message) {
          let message = !util.isEmpty(arg.messageValue) ? arg.messageValue : this.$t('lang.save.success')
          this.$message({
            message: message,
            type: 'success'
          })
        }
        if (reLoad) this.pageList()
        this[constants.OPEN_DIALOG_FLAG] = false
      } else if (_result.resCode === '60003') {
        this.$message({
          message: _result.resDesc,
          type: 'error'
        })
        opInfo.clearOpInfo()
        this.$router.push(process.env.PATH_ROUTER + '/login')
      } else {
        this.$message({
          message: _result.resDesc,
          type: 'error'
        })
      }
      NProgress.done()
      this[constants.BUTTON_LOADING] = false
    }).catch(() => {

    })
  }
  // 保存按钮操作函数
  save = function () {
    NProgress.start()
    this.$refs[constants.DIALOG_FORM].validate((valid) => {
      if (valid) {
        this[constants.BUTTON_LOADING] = true
        let loading = Loading.service({fullscreen: true})
        switch (this[constants.CURRENT_ACT]) {
          case constants.ADD:
            this.$http.post(`${this.getUrl('add')}/add`, this[constants.DIALOG_FORM]).then((result) => {
              let _result = result.data
              loading.close()
              if (_result.resCode === SUCCESS_CODE) {
                this.$message({
                  message: this.$t('lang.save.success'),
                  type: 'success'
                })
                this.pageList()
                this[constants.OPEN_DIALOG_FLAG] = false
              } else if (_result.resCode === '60003') {
                this.$message({
                  message: _result.resDesc,
                  type: 'error'
                })
                opInfo.clearOpInfo()
                this.$router.push(process.env.PATH_ROUTER + '/login')
              } else {
                this.$message({
                  message: _result.resDesc,
                  type: 'error'
                })
              }
              NProgress.done()
              this[constants.BUTTON_LOADING] = false
            })
            break
          case constants.EDIT:
            loading.close()
            this.$http.post(`${this.getUrl('edit')}/edit`, this[constants.DIALOG_FORM]).then((result) => {
              let _result = result.data
              if (_result.resCode === SUCCESS_CODE) {
                this.$message({
                  message: this.$t('lang.save.success'),
                  type: 'success'
                })
                this.pageList()
                this[constants.OPEN_DIALOG_FLAG] = false
              } else {
                this.$message({
                  message: _result.resDesc,
                  type: 'error'
                })
              }
              NProgress.done()
              this[constants.BUTTON_LOADING] = false
            })
            break
        }
      } else {
        return false
      }
    })
  }
  // 关闭弹出框回调函数
  close = function () {
    NProgress.done()
    this[constants.OPEN_DIALOG_FLAG] = false
    this.$refs[constants.DIALOG_FORM].resetFields()
  }

  // 日期时间格式化 yyyy-MM-dd hh:mm
  formatTime = function (row, column) {
    return util.dateTimeFormat(row[column.property], 'yyyy-MM-dd hh:mm')
  }

  // 获取数据字典，arg是一个对象{'dbDict':'dictArray'}
  dictLoad = function (arg) {
    for (let dbName in arg) {
      dictApi.dict(dbName).then((result) => {
        this[arg[dbName]] = result
      })
    }
  }

  // 装配url地址
  getUrl = function (act) {
    var actUrl = (this[constants.URL_PARAM])[act]
    if (!actUrl) {
      (this[constants.URL_PARAM])[act] = this[constants.URL_PARAM].common
      actUrl = (this[constants.URL_PARAM])[act]
    }
    return actUrl
  }

  baseUrl = function (arg) {
    var API_ROOT = arg.baseUrl === 'user' ? process.env.API_USER : process.env.API_ROOT
    axios.defaults.baseURL = API_ROOT + process.env.PATH_API
  }

  getToken = function (arg) {
    let opUser = opInfo.getOpInfo()
    if (opUser.token) {
      return opUser.token
    } else {
      return ''
    }
  }

  // 检索列表
  getList = function (arg) {
    // console.log("arg:", arg)
    this[constants.LOADING] = true
    let page = arg.page ? arg.page : '1'
    // 当vue组件中QUERY_FORM={}时 默认检索全部 QUERY_FORM={id:10}  检索id=10的数据列表
    let queryParam = this[constants.QUERY_FORM]
    // 排序
    let sort = this[constants.QUERY_SORT]
    // 整合参数
    let param = {
      page: page,
      pageSize: this.$store.state.pagination.pageSize,
      search: queryParam, // 检索参数
      ...sort
    }
    //param = Object.assign(param,queryParam)
    // 拼接路径
    axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API

    let url = !util.isEmpty(arg.customUrl) ? arg.customUrl : this.getUrl('list') + '/list'
    this.$http.get(url, {params: param}).then((result) => {
      let _result = result.data
      this[constants.RESULT_DATA] = _result
      // console.log("data:",this[constants.RESULT_DATA])
      if (_result.resCode === SUCCESS_CODE) {
        // 若需要单独处理返回的数据，需使用callback  可参照commission.vue
        if (!util.isEmpty(arg.callback)) {
          this[constants.CALLBACK].callback = arg.callback
          this[constants.CALLBACK].data = result.data
          this[constants.CALLBACKTAG] = Math.random() * Math.random()
        }
      } else if (_result.resCode === '60003') {
        this.$message({
          message: _result.resDesc,
          type: 'error'
        })
        opInfo.clearOpInfo() // 清空 操作员信息
        this.$router.push(process.env.PATH_ROUTER + '/login')  // 去登录
      } else {
        this.$message({
          message: _result.resDesc,
          type: 'error'
        })
      }
      // setTimeout(() => {
      this[constants.LOADING] = false
      //   LOCK_LIST = false
      // }, LIST_LOAD_TIME)
    }).catch(() => {
      this[constants.LOADING] = false
    })
  }
}
