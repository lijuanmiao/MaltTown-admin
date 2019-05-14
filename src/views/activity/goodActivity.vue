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
            <el-col :span="8" align="right" class="titleText" style="margin-bottom:-5px">
              <el-button @click="addActivity" v-permissions="'SP010001'" style="margin-top:-50px">新增策略</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-form :model="QUERY_FORM" class="demo-form-inline" size="small">

      </el-form>
      <!--列表-->
      <el-table style="margin-bottom:53px" class='table-table' :data="RESULT_DATA.resultList" :border="true" @filter-change="filterList"
                v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
        <el-table-column prop="id" label="活动编号" min-width="50"></el-table-column>
        <el-table-column prop="activityName" label="活动名称" min-width="120"></el-table-column>
        <el-table-column   label="活动时间" min-width="220">
          <template slot-scope="props">
            {{ props.row.beginTime  | formatDate }}  &nbsp;至 &nbsp;{{ props.row.endTime  | formatDate}}
          </template>
        </el-table-column>

        <el-table-column label="创建时间" min-width="120">
          <template slot-scope="props">
            {{ props.row.createTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="50">
          <template slot-scope="props">
            <span v-if="props.row.status==0">未上线</span>
            <span v-if="props.row.status==1">未开始</span>
            <span v-if="props.row.status==2">进行中</span>
            <span v-if="props.row.status==3">已结束</span>
            <span v-if="props.row.status==4">已下线</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="props">
            <el-button @click="onShelf(props.row)" type="text"  v-if="props.row.status=='0'||  props.row.status=='4'"  v-permissions="'SP010005'" size="small"> <span>上线</span ></el-button>
            <el-button @click="underShelf(props.row)" type="text"  v-if="props.row.status=='1' || props.row.status=='2'"  v-permissions="'SP010006'" size="small"> <span>下线</span ></el-button>
            <el-button @click="showDetail(props.row)" type="text"   v-permissions="'SP010003'" size="small"> <span>详情</span ></el-button>
            <el-button @click="eidtData(props.row)" type="text"  v-if="props.row.status=='0'||  props.row.status=='4'"   v-permissions="'SP010002'" size="small"> <span>编辑</span ></el-button>
            <el-button @click="eidtData2(props.row)" type="text"  v-if="props.row.status=='1'||  props.row.status=='2'"   v-permissions="'SP010002'" size="small"> <span>编辑</span ></el-button>
            <el-button @click="delData(props.row.id)" type="text"    v-if="props.row.status=='0'" v-permissions="'SP010004'" size="small"> <span>删除</span ></el-button>

          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <Pagination :pageData="RESULT_DATA" @change="pageListBanner" :param='url'></Pagination>


      <!--新增-->
      <el-dialog :title="isEdit?'编辑策略':'新增策略'" :visible.sync="dialogaddActivity" :close-on-click-modal='false' >
        <el-row>
          <el-form-item label="活动名称:" prop="activityName">
            <el-input v-model="DIALOG_FORM.activityName" :maxlength="50" v-if="DIALOG_FORM.editFlag!=1" ></el-input>
            <el-input v-model="DIALOG_FORM.activityName" v-if="DIALOG_FORM.editFlag==1" :readonly="true" ></el-input>
          </el-form-item>
          <el-form-item label="活动时间:" prop="dateTime" >
            <el-date-picker
              v-model="dateTime"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
              :editable='true':clearable='false' v-if="DIALOG_FORM.editFlag!=1" >
            </el-date-picker>

            <el-date-picker
              v-model="dateTime"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
              :editable='true':clearable='false' v-if="DIALOG_FORM.editFlag==1" :readonly="true" >
            </el-date-picker>
          </el-form-item>
        </el-row>
        <el-row>
          <div style="margin: 10px;">已选商品{{goodsList.length}} &nbsp;&nbsp;&nbsp;
            <el-button @click="showGoodsList"  type="primary"  size="small"> <span>添加商品</span ></el-button>
          </div>
          <el-table class='table-table' :data="goodsList" :border="true"
                    v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
            <el-table-column prop="goodsNumber" label="SPU编码" min-width="100"></el-table-column>
            <el-table-column prop="goodsName" label="SPU商品名称" min-width="120"></el-table-column>
            <el-table-column   label="商品主图" min-width="120">
              <template slot-scope="item">
                <img  :src="item.row.goodImg" class="img_list" />
              </template>
            </el-table-column>

            <el-table-column label="商品标题" min-width="120">
              <template slot-scope="props">
                {{ props.row.title }}
              </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序" min-width="100">
              <template slot-scope="props">
                <el-input v-model="props.row.sort" :maxlength="5"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作"  width="80">
              <template slot-scope="props">
                <el-button @click="delGood(props.$index)" type="text"  size="small"> <span>移除</span ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row justify="center">
          <el-col :span="24" style="text-align:center">
            <el-button @click="canel">取消</el-button>
            <el-button type="primary" @click="saveData">保存</el-button>
          </el-col>
        </el-row>
      </el-dialog>

      <!--商品列表-->
      <el-dialog :title="'添加商品'" :visible.sync="dialogGoodsList" :close-on-click-modal='false' >
        <el-table class='table-table' :data="allGoodsList" :border="true"  ref="multipleTable"  tooltip-effect="dark" @selection-change="handleSelectionChange"
                  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="goodsNumber" label="SPU编码" min-width="100"></el-table-column>
          <el-table-column prop="goodsName" label="SPU商品名称" min-width="120"></el-table-column>
          <el-table-column label="商品主图" min-width="120">
            <template slot-scope="item">
              <img  :src="item.row.goodImg" class="img_list" />
            </template>
          </el-table-column>
          <el-table-column label="商品标题" min-width="120">
            <template slot-scope="props">
              {{ props.row.title }}
            </template>
          </el-table-column>

        </el-table>
        <el-row justify="center">
          <el-col :span="24" style="text-align:center">
            <el-button @click="cancelGoods">取消</el-button>
            <el-button type="primary" @click="saveGoods">确定</el-button>
          </el-col>
        </el-row>
      </el-dialog>

      <!--活动详情-->
      <el-dialog :title="'详情'" :visible.sync="dialogDetail" :close-on-click-modal='false' >
        <el-row>
          <el-form-item label="活动名称:" >
            <span> {{detailData.data.activityName}}</span>
          </el-form-item>
          <el-form-item label="活动时间:" prop="dateTime" >
            <span> {{ detailData.data.beginTime  | formatDate }}  &nbsp;至 &nbsp;{{ detailData.data.endTime  | formatDate}}</span>
          </el-form-item>
        </el-row>
        <el-row>
          <div style="margin: 10px;">已选商品{{detailData.resultList.length}} &nbsp;&nbsp;&nbsp;
          </div>
          <el-table class='table-table' :data="detailData.resultList" :border="true"
                    v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
            <el-table-column prop="goodsNumber" label="SPU编码" min-width="100"></el-table-column>
            <el-table-column prop="goodsName" label="SPU商品名称" min-width="120"></el-table-column>
            <el-table-column   label="商品主图" min-width="120">
              <template slot-scope="item">
                <img  :src="item.row.goodImg" class="img_list" />
              </template>
            </el-table-column>

            <el-table-column prop="title"  label="商品标题" min-width="120"> </el-table-column>
            <el-table-column prop="sort" label="排序" min-width="100"> </el-table-column>
          </el-table>
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
      this.dialogaddActivity = false
    }
  }

  export default {
    data() {
      return {
        ...baseData,
        [URL_PARAM]: {
          common: 'controller/goodactivity',
          addActivity: 'controller/goodactivity/add',
          goodsListUrL:'controller/goodactivity/goodslist',
          detailUrl:'controller/goodactivity/detail/',
          putOnOffUrl:'controller/goodactivity/putOnOff/',
          delUrl:'controller/goodactivity/del/'
        },
        [QUERY_FORM]: {},
        isEdit: false,
        url: 'goodactivity',
        dialogaddActivity: false,
        editForm: {
          activityName: [{required: true, message: '请输入活动名称', trigger: 'blur'}],
          dateTime:[{ validator:this.checkDateTime, message: '请选择活动时限', trigger: 'blur' }],

        },
        dateTime:'',
        dialogGoodsList:false,
        goodsList:[],//已添加商品列表
        multipleSelection: [], //选中的商品列表
        allGoodsList:[], //所有商品列表
        dialogDetail:false,
        detailData:{data:{},resultList:[]},//详情数据

      };
    },
    filters: {
      formatDate(time) {
        return util.dateTimeFormat(time, 'yyyy-MM-dd hh:mm:ss');
      }
    },
    created() {

    },
    watch: {
      CALLBACKTAG: 'callBackFun'
    },
    mounted() {
      this.pageList(1, {baseUrl: this.url })
    },
    methods: {
      ...new method(),
      callBackFun() {
        switch (this.CALLBACK.callback) {
          case 'saveData':
            this.dialogaddActivity = false
            this.pageList(this.RESULT_DATA.currentPage)
            break
        }
      },
      //分页list
      pageListBanner(page) {
        this.pageList(page, {baseUrl: this.url})
      },
      //检索
      seach() {
        this.pageList(1, {baseUrl: this.url})
      },
      queryRest() {
        Object.keys(this[QUERY_FORM]).forEach(element => {
          this[QUERY_FORM][element] = ""
        });
      },
      //新增
      addActivity() {
        this.isEdit = false
        this.dateTime='';
        this.DIALOG_FORM = {}
        this.goodsList=[]

        this.dialogaddActivity = true
      },
      showDetail:function (data) {
        axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
        let json={}
        this.$http.get(this[URL_PARAM].detailUrl+data.id, {params: json}).then((result) => {
          let _result = result.data
          if (_result.resCode === SUCCESS_CODE) {
            this.detailData.resultList=_result.resultList
            this.detailData.data=_result.model
            this.dialogDetail=true
          } else {
            this.$message({
              message: _result.resDesc,
              type: 'error'
            })
          }
        })
      },
      eidtData:function (data) {
        this.DIALOG_FORM={};
        this.dateTime='';
        this.goodsList=[];

        axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
        let json={}
        this.$http.get(this[URL_PARAM].detailUrl+data.id, {params: json}).then((result) => {
          let _result = result.data
          if (_result.resCode === SUCCESS_CODE) {
            this.goodsList=_result.resultList
            let data=_result.model
            this.DIALOG_FORM={
              id:data.id,
              activityName:data.activityName
            }
            this.dateTime=[new Date(data.beginTime),new Date(data.endTime)]
            this.isEdit = true
            this.dialogaddActivity = true
          } else {
            this.$message({
              message: _result.resDesc,
              type: 'error'
            })
          }
        })

      },
      eidtData2:function (data) {
        this.DIALOG_FORM={};
        this.dateTime='';
        this.goodsList=[];

        axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
        let json={}
        this.$http.get(this[URL_PARAM].detailUrl+data.id, {params: json}).then((result) => {
          let _result = result.data
          if (_result.resCode === SUCCESS_CODE) {
            this.goodsList=_result.resultList
            let data=_result.model
            this.DIALOG_FORM={
              id:data.id,
              activityName:data.activityName,
              editFlag:1//活动信息不可编辑
            }
            this.dateTime=[new Date(data.beginTime),new Date(data.endTime)]
            this.isEdit = true
            this.dialogaddActivity = true
          } else {
            this.$message({
              message: _result.resDesc,
              type: 'error'
            })
          }
        })

      },
      //上架
      onShelf(data) {
        this.$confirm('确认上线吗?', '提示', {}).then(() => {
          axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
          let json = {
            id: data.id,
            option: 1
          }
          this.$http.post(this[URL_PARAM].putOnOffUrl+data.id, json).then((result) => {
            let _result = result.data
            if (_result.resCode === SUCCESS_CODE) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.pageList(this.RESULT_DATA.currentPage)
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
        this.$confirm('确认下线吗?', '提示', {}).then(() => {
          axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
          let json = {
            id: data.id,
            option: 2
          }
          this.$http.post(this[URL_PARAM].putOnOffUrl+data.id, json).then((result) => {
            let _result = result.data
            if (_result.resCode === SUCCESS_CODE) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.pageList(this.RESULT_DATA.currentPage)
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
      //删除
      delData(id) {
        // console.info("=====id=====",id)
        this.$confirm('确认删除该记录吗?', '提示', {}).then(() => {
          axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
          this.$http.post(this[URL_PARAM].delUrl+id, {}).then((result) => {
            let _result = result.data
            if (_result.resCode === SUCCESS_CODE) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.pageList(this.RESULT_DATA.currentPage)
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
      //保存
      saveData() {
        this.$refs[DIALOG_FORM].validate((valid) => {
          if (valid) {
            if(this.dateTime){
              // 活动时限
              let dateTime=this.dateTime+''
              let dateTimes=dateTime.split(',')
              this.DIALOG_FORM.beginTime=util.formatDate(dateTimes[0],'yyyy-MM-dd HH:mm:ss')
              this.DIALOG_FORM.endTime=util.formatDate(dateTimes[1],'yyyy-MM-dd HH:mm:ss')
            }

            let goods=[]
            this.goodsList.forEach((item)=> {
              let json1={
                goodId:item.id,
                sort:item.sort,
                activityId:item.activityId
              }
              goods.push(json1)
            });
            this[DIALOG_FORM].goodList=goods;
            let arg = {
              postParam: this[DIALOG_FORM],
              customAct: 'addActivity',
              callback: 'saveData',
              reLoad: false
            }
            this.customPost(arg)
          }
        })

      },

      //活动时间校验
      checkDateTime(rule, value, callback){
        setTimeout(() => {
          if(util.isEmpty(this.dateTime)||util.checkDateNull(this.dateTime)){
            callback(new Error(rule.message))
          }else{
            callback()
          }
        }, 300)
      },
      checkSort(rule, value, callback) { // 广告位-》排序
        this.sort = value
        if (!/^-?\d{0,3}$/.test(value)) {
          callback(new Error('请输入整数,最多三位数'))
        }
      },
      showGoodsList:function () { //显示商品列表
        axios.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API

        let goodIds=[]
        this.goodsList.forEach((item)=> {
          goodIds.push(item.id)
        });

        let json={notInGoodId:goodIds.join(",")}

        let param = {
          // page: page,
          // pageSize: this.$store.state.pagination.pageSize,
          search: json, // 检索参数
        }

        this.$http.get(this[URL_PARAM].goodsListUrL, {params: param}).then((result) => {
          let _result = result.data
          if (_result.resCode === SUCCESS_CODE) {
            this.allGoodsList=_result.resultList
            this.dialogGoodsList=true
            // console.info("positionOptions:",this.positionOptions)
          } else {
            this.$message({
              message: _result.resDesc,
              type: 'error'
            })
          }
        })

      },
      delGood:function (index) {//移除商品
        this.goodsList.splice(index,1);
         console.log("this.goodsList",this.goodsList)
      },
      cancelGoods:function () {
        this.dialogGoodsList=false
      },
      saveGoods:function(){ //查询商品SPU
        // this.goodsList=this.multipleSelection
        this.multipleSelection.forEach((item)=> {
          this.goodsList.push(item)
        });
        this.dialogGoodsList=false
        // console.log("this.multipleSelection",this.multipleSelection)

      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
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

  .img_list{
    width: 100%;
    height: 120px;
    vertical-align: top;
  }
</style>

