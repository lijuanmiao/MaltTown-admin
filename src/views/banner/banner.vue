<template>
  <section style="padding:10px 20px">
    <el-form class='form-item-block' :label-width="FORM_LABEL_WIDTH" :inline="true" :model="DIALOG_FORM"
             ref='DIALOG_FORM' :rules="editForm">
      <el-row :gutter="10" class="toolbar" type="flex">
        <el-col :span="24">
          <!--功能按钮区-->
          <el-row>
            <el-col :span="16" class="titleText">
              <Breadcrumb></Breadcrumb>
            </el-col>
            <el-col :span="8" align="right" style="height:33px">
              <el-button @click="addBanner" v-permissions="'YY010101'">新增</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-form :model="QUERY_FORM" class="demo-form-inline" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="广告名称:" style="width:300px;float:left">
              <el-input v-model="QUERY_FORM.likeBannerDesc" style="width:222px" placeholder="模糊匹配"></el-input>
            </el-form-item>
            <el-form-item label="广告状态:" prop="bannerStatus" style="float:left;width:210px">
              <el-select v-model="QUERY_FORM.bannerStatus" placeholder="请选择">
                <el-option
                  v-for="item in stateSearchOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="广告位:" prop="positionId" style="float:left;width:193px">
              <el-select v-model="QUERY_FORM.positionId" placeholder="请选择">
                <el-option
                  v-for="item in positionSearchOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
              <el-button type="primary" size="small" @click="seach" style="float:left">搜索</el-button>
              <el-button type="info" size="small" @click="queryRest" style="float:left">重置</el-button>
          </el-col>

        </el-row>
      </el-form>
      <!--列表-->
      <el-table style="margin-top:-15px;margin-bottom:53px" class='table-table' :data="RESULT_DATA.resultList" :border="true" @filter-change="filterList"
                v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
        <el-table-column prop="bannerDesc" label="广告名称" min-width="120"></el-table-column>
        <el-table-column prop="positionDesc" label="广告位" min-width="150"></el-table-column>
        <el-table-column prop="sort" label="广告位排序" min-width="100"></el-table-column>
        <el-table-column label="图片素材" min-width="280">
          <template slot-scope="props">
            <a class='link_a' @click="showImage(props.row.bannerUrl)">{{ props.row.bannerUrl}}</a>
          </template>
        </el-table-column>
        <el-table-column label="添加时间" min-width="180">
          <template slot-scope="props">
            {{ props.row.createTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column prop="statusName" label="发布状态" min-width="120"></el-table-column>
        <el-table-column label="操作"  width="130">
          <template slot-scope="scope">

            <el-button
              @click="editBanner(scope.row)"
              type="text"
              v-if="scope.row.status=='0' || scope.row.status=='2'"
              v-permissions="'YY010102'"
              size="small">
              <span>编辑</span>
            </el-button>
            <el-button
              @click="onShelf(scope.row)"
              type="text"
              v-if="scope.row.status=='0' || scope.row.status=='2'"
              v-permissions="'YY010103'"
              size="small">
              <span>上架</span>
            </el-button>
            <el-button
              @click="underShelf(scope.row)"
              type="text"
              v-if="scope.row.status=='1'"
              v-permissions="'YY010104'"
              size="small">
              <span>下架</span>
            </el-button>
            <el-button
              @click="delBanner(scope.row.id)"
              type="text"
              v-if="scope.row.status=='0' || scope.row.status=='2'"
              v-permissions="'YY010106'"
              size="small">
              <span>删除</span>
            </el-button>

          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <Pagination :pageData="RESULT_DATA" @change="pageListBanner" :param='url'></Pagination>


      <!--新增员工-->
      <el-dialog :title="isEdit?'编辑广告':'新增广告'" :visible.sync="dialogAddBanner" :close-on-click-modal='false'>
        <el-form-item label="广告名称:" prop="bannerDesc">
          <el-input v-model="DIALOG_FORM.bannerDesc" :maxlength="20"></el-input>
        </el-form-item>
        <div slot="tip" class="el-upload__tip" style='line-height:15px'>广告名称只是作为辨别多个广告条目之用，并不显示在广告中</div>
        <el-form-item label="广告位:" prop="positionId">
          <el-select v-model="DIALOG_FORM.positionId" @change="changePosition(DIALOG_FORM.positionId)"
                     placeholder="请选择">
            <el-option
              v-for="item in positionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广告位顺序:" prop="sort">
          <el-input v-model="DIALOG_FORM.sort" placeholder="广告位顺序" :maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="开始时间:" prop="startDate">
          <el-date-picker
            v-model="startDate"
            type="datetime"
            default-time="00:00:00"
            placeholder="开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:" prop="endDate">
          <el-date-picker
            v-model="endDate"
            type="datetime"
            default-time="23:59:59"
            placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <!--
         <el-form-item label="活动时间:" prop="dateTime" >
             <el-date-picker
                 v-model="dateTime"
                 type="datetimerange"
                 start-placeholder="开始日期"
                 end-placeholder="结束日期"
                 :default-time="['00:00:00', '23:59:59']"
                 :editable='true'
             >
             </el-date-picker>
         </el-form-item>

         -->
        <el-form-item label="广告图片:" class='required upload'>
          <el-upload
            class="upload-demo"
            :action="fileUrl"
            :on-success="uploadCallBack"
            :on-remove="removeFile"
            :file-list="fileList"
            :before-upload="beforeAvatarUpload"
            :headers="headers"
            list-type="picture">
            <el-button :class="fileList.length > 0 ? 'upload-dis-btn' : ''" size="small" type="primary"
                       :disabled='fileList.length>0' v-permissions="'YY010105'">点击上传
            </el-button>
            <div slot="tip" class="el-upload__tip" style='line-height:15px'>建议尺寸:750*390px，只能上传jpg/png格式文件，文件不能超过1MB</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="广告链接:" prop="redirectUrl">
          <el-input v-model="DIALOG_FORM.redirectUrl" :maxlength="280"></el-input>
        </el-form-item>
        <el-row justify="center">
          <el-col :span="24" style="text-align:center">
            <el-button @click="canel">取消</el-button>
            <el-button type="primary" @click="saveBanner">保存</el-button>
          </el-col>
        </el-row>
      </el-dialog>

      <!--显示图片-->
      <el-dialog :title="'图片展示'" :visible.sync="dialogShowImage" :close-on-click-modal='false'>
        <div style="width: 650px;height: 350px; text-align: center;">
          <img class='bigImg' :src='showBannerUrl'/>
        </div>

        </el-row>
      </el-dialog>

    </el-form>
  </section>
</template>

<script>
  import {
    DIALOG_FORM,
    DIALOG_TITLE,
    OPEN_DIALOG_FLAG,
    QUERY_FORM,
    EMPTY_FORM,
    LOADING,
    URL_PARAM,
    RESULT_DATA,
    CALLBACKTAG,
    CALLBACK
  } from '../../store/constant'
  import {SUCCESS_CODE} from '../../config/config'
  import axios from 'axios'
  import baseMethod from '../../common/baseMethods'
  import baseData from '../../common/baseData'
  import common from '../common'
  import util from '../../common/util'
  import validator from '../../common/validator'

  // 函数集合
  class method extends baseMethod {
    resetForm = function (formName) {
      this.$refs[formName].resetFields()
    }
    //取消按钮
    canel = function () {
      this.dialogAddBanner = false
    }
  }

  export default {
    data() {
      return {
        ...baseData,
        [URL_PARAM]: {
          common: 'controller/banner',
          addBanner: 'controller/banner/add',
          editBannerUrl: 'controller/banner/edit'
        },
        [QUERY_FORM]: {},
        isEdit: false,
        url: 'banner',
        dialogAddBanner: false,
        dialogShowImage: false,
        showBannerUrl: '',
        editForm: {
          bannerDesc: [{required: true, message: '请输入广告名称', trigger: 'blur'}],
          positionId: [{required: true, message: '请选择广告位', trigger: 'blur'},
            // {validator: this.checkSort2, message: '', trigger: 'change'}
          ],
          sort: [{required: true, message: '请输入广告顺序', trigger: 'blur'},
            {validator: this.checkSort, message: '', trigger: 'blur'},
            // {validator:this.checkUnique, message: '同一广告位下的排序不可重复', trigger: 'blur' }
          ],
          bannerUrl: [{required: true, message: '请上传图片', trigger: 'blur'}],
          //dateTime:[{ validator:this.checkDateTime, message: '请选择活动时间', trigger: 'blur' }],
        },
        //dateTime:'',
        startDate: '',
        endDate: '',
        fileUrl: '',//图片上传地址
        fileList: [],//上传图片列表 json
        headers: {
          //'x-auth-token': '5bf6a6b8-d571-4885-9c81-f9258abe9154'
        },
        positionId: '',//当前广告位
        sort: '',//当前排序
        positionOptions: [], //广告位置List-新增，修改
        positionSearchOptions: [{ //广告位置List-搜索
          value: '',
          label: '全部'
        }],
        stateSearchOptions: [{ //banner 搜索状态
          value: '',
          label: '全部'
        }, {
          value: 0,
          label: '已提交'
        }, {
          value: 1,
          label: '已发布'
        }, {
          value: 2,
          label: '已下架'
        }],
      };
    },
    filters: {
      formatDate(time) {
        return util.dateTimeFormat(time, 'yyyy-MM-dd');
      }
    },
    created() {
      this.positionList()
    },
    watch: {
      CALLBACKTAG: 'callBackFun'
    },
    mounted() {
      this.fileUrl = process.env.API_ROOT + '/file/upload?fileCategoryNO=1&upType=1'
      this.pageList(1, {baseUrl: 'banner'})
      //console.log('===========',this.getToken())
      this.headers = {
        'x-auth-token': this.getToken()
      }
    },
    methods: {
      ...new method(),
      callBackFun() {
        switch (this.CALLBACK.callback) {
          case 'saveBanner':
            this.dialogAddBanner = false
            this.pageList(this.RESULT_DATA.currentPage)
            break
        }
      },
      //分页list
      pageListBanner(page) {
        this.pageList(page, {baseUrl: 'banner'})
      },
      //检索
      seach() {
        this.pageList(1, {baseUrl: 'banner'})
      },
      queryRest() {
        Object.keys(this[QUERY_FORM]).forEach(element => {
          this[QUERY_FORM][element] = ""
        });
      },
      //新增
      addBanner() {
        this.positionId=''
        this.isEdit = false
        this.fileList = []
        this.resetForm('DIALOG_FORM')
        this.DIALOG_FORM = {}
        // this.bannerDesc = ''
        this.sort = ''
        this.startDate = ''
        this.endDate = ''
        // this.redirectUrl = ''
        this.dialogAddBanner = true
      },
      //上架
      onShelf(data) {
        this.$confirm('确认上架吗?', '提示', {}).then(() => {
          axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
          let json = {
            id: data.id,
            option: 1
          }
          this.$http.post(`controller/banner/putOnOff/${data.id}`, json).then((result) => {
            let _result = result.data
            if (_result.resCode === SUCCESS_CODE) {
              this.$message({
                message: '上架操作成功',
                type: 'success'
              })
              this.pageList(this.RESULT_DATA.currentPage, {baseUrl: 'banner'})
            } else {
              this.$message({
                message: _result.resDesc,
                type: 'error'
              })
            }
          })
        }).catch(() => {

        })
      },
      //下架
      underShelf(data) {
        this.$confirm('确认下架吗?', '提示', {}).then(() => {
          axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
          let json = {
            id: data.id,
            option: 2
          }
          this.$http.post(`controller/banner/putOnOff/${data.id}`, json).then((result) => {
            let _result = result.data
            if (_result.resCode === SUCCESS_CODE) {
              this.$message({
                message: '下架操作成功',
                type: 'success'
              })
              this.pageList(this.RESULT_DATA.currentPage, {baseUrl: 'banner'})
            } else {
              this.$message({
                message: _result.resDesc,
                type: 'error'
              })
            }
          })
        }).catch(() => {

        })
      },
      //编辑
      editBanner(data) {
        this.isEdit = true
        this.fileList = []
        this.DIALOG_FORM={}
        this.startDate = ''
        this.endDate = ''
        this.DIALOG_FORM = util.simpleClone(data)
        this.positionId = this.DIALOG_FORM.positionId
        this.sort = this.DIALOG_FORM.sort
        this.dialogAddBanner = true

        if (this.DIALOG_FORM.beginTime > 0) {
          this.startDate = new Date(this.DIALOG_FORM.beginTime)
        }
        if (this.DIALOG_FORM.endTime > 0) {
          this.endDate = new Date(this.DIALOG_FORM.endTime)
        }

        let json = {
          url: data.bannerUrl
        }
        this.fileList.push(json)
        this.dialogAddBanner = true

      },
      //删除
      delBanner(id) {
        // console.info("=====id=====",id)
        this.$confirm('确认删除该记录吗?', '提示', {}).then(() => {
          // axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
          this.$http.post(`controller/banner/del/` + id, {}).then((result) => {
            let _result = result.data
            if (_result.resCode === SUCCESS_CODE) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.pageList(this.RESULT_DATA.currentPage, {baseUrl: 'banner'})
            } else {
              this.$message({
                message: _result.resDesc,
                type: 'error'
              })
            }
          })
        }).catch(() => {
        })
      },
      //上传图片回调处理
      uploadCallBack(response) {
        // console.info("上传图片回调处理：",response)
        if (response.resCode === SUCCESS_CODE) {
          let json = {
            url: response.data
          }
          this.fileList.push(json)
        } else {
          this.$message({
            message: '图片上传失败',
            type: 'error'
          })
        }

      },
      //移除图片处理
      removeFile(file) {
        this.fileList = []
      },
      //上传图片前的格式及大小判断
      beforeAvatarUpload(file) {
        let isJPG = false
        if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
          this.$message({
            message: '上传图片暂时只支持jpg/png格式',
            type: 'error'
          })
          this.$emit('closeEditUpload');
        } else if (!(Math.ceil(file.size / 1024) <= 1024)) {
          this.$message({
            message: '上传图片大小不能超过1MB',
            type: 'error'
          })
          this.$emit('closeEditUpload');
        } else {
          isJPG = true
        }
        return isJPG
      },
      //保存Banner图片
      saveBanner() {
        this.$refs[DIALOG_FORM].validate((valid) => {
          if (valid) {
            if (this.fileList.length == 0) {
              this.$message({
                message: '请选Banner图片',
                type: 'error'
              })
              return
            }
            //Banner图片
            if (this.fileList.length > 0) {
              this.DIALOG_FORM.bannerUrl = this.fileList[0].url
            }

            let beginTime1='',endTime1=''
            if (this.startDate) {
              beginTime1 = util.formatDate(this.startDate, 'yyyy-MM-dd HH:mm:ss')
            }
            if (this.endDate) {
              endTime1 = util.formatDate(this.endDate + '', 'yyyy-MM-dd HH:mm:ss')
            }
            if (beginTime1 && endTime1 && endTime1 <= beginTime1) {
              this.$message({
                message: '结束时间必须大于开始时间',
                type: 'error'
              })
              return
            }
            this.DIALOG_FORM.beginTime1=beginTime1
            this.DIALOG_FORM.endTime1=endTime1
            //if(this.dateTime){
            //活动时限
            //  let dateTime=this.dateTime+''
            // let dateTimes=dateTime.split(',')
            // this.DIALOG_FORM.beginTime1=util.formatDate(dateTimes[0],'yyyy-MM-dd HH:mm:ss')
            // this.DIALOG_FORM.endTime1=util.formatDate(dateTimes[1],'yyyy-MM-dd HH:mm:ss')
            //}

            let arg = {
              postParam: this[DIALOG_FORM],
              customAct: 'addBanner',
              callback: 'saveBanner',
              reLoad: false
            }
            if (this.DIALOG_FORM.id) { //修改
              arg.customAct = 'editBannerUrl'
            }

            this.customPost(arg)
          }
        })

      },

      //获取 广告位置 列表
      positionList() {
        let json = {
          page: 1,
          pageSize: 100,
          search: {}
        }
        this.positionOptions = []
        axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
        this.$http.get('controller/banner/positionlist', {params: json}).then((result) => {
          let _result = result.data
          if (_result.resCode === SUCCESS_CODE) {
            for (let i in _result.resultList) {
              let json = {
                value: _result.resultList[i].id,
                label: _result.resultList[i].positionDesc
              }
              this.positionOptions.push(json)
              this.positionSearchOptions.push(json)
            }
            // console.info("positionOptions:",this.positionOptions)

          } else {
            this.$message({
              message: _result.resDesc,
              type: 'error'
            })
          }
        })
      },
      changePosition(id) {
        this.positionId = id
        for (let x in this.positionOptions) {
          if (this.positionOptions[x].value == id) {
            this.positionDesc = this.positionOptions[x].label
          }
        }
        if (this.sort) {
          console.info("======通过修改banner  广告位，验证 广告顺序======")
          this.repeatCheck(2, this.sort, '');
        }
      },
      //活动时间校验
      checkDateTime(rule, value, callback) {
        setTimeout(() => {
          if (util.isEmpty(this.dateTime) || util.checkDateNull(this.dateTime)) {
            // callback(new Error(rule.message))
          } else {
            callback()
          }
        }, 500)
      },
      checkSort(rule, value, callback) { // 广告位-》排序
        this.sort = value
        if (!/^-?\d{0,3}$/.test(value)) {
          callback(new Error('请输入整数,最多三位数'))
        } else {
          // callback()
          this.repeatCheck(1, value, callback)
        }
      },
      // checkSort2(rule, value, callback){ // 排序-》广告位;先填写排序，后填写广告位
      //   // console.info('---sort--------',this.sort)
      //   if(this.sort){
      //     this.repeatCheck(2, this.sort, callback);
      //   }else callback()
      //
      // },
      repeatCheck(rule, value, callback) {
        // console.info("====",rule)
        if(!this.positionId){
          callback();
          return
        }
        let json = {
          positionId: this.positionId,
          sort: value,
          id: this.DIALOG_FORM.id
        }
        // axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
        this.$http.get('controller/banner/checkSortUnique', {params: json}).then((result) => {
          let _result = result.data
          // console.info("同一广告位下，顺序不可重复",_result)
          if (_result.resCode === SUCCESS_CODE) {
            if (rule == 1) {  // 验证排序
              if (_result.model == '1') {
                callback()
              } else {
                callback(new Error('同一广告位下，顺序不可重复'))
              }
            } else { //验证广告位
              if (_result.model != '1') {
                this.$message({
                  message: '同一广告位下，顺序不可重复',
                  type: 'error'
                })
              }
            }
          } else {
            this.$message({
              message: _result.resDesc,
              type: 'error'
            })
          }
        })
      },
      showImage(imgUrl) { //图片展示
        this.showBannerUrl = imgUrl
        this.dialogShowImage = true
      },
    }
  }
</script>
<style lang="less">
  .roles .el-tabs__content {
    max-height: 400px;
    overflow-y: auto;
  }

  .roleSelect .el-radio__label {
    display: none;
  }

  a.link_a {
    color: blue;
    cursor: pointer;
  }

  img.bigImg {
    width : auto;height : 100%;
    max-width: 640px;
  }
</style>

