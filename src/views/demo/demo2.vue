<template>
  <section>
    <el-form class='form-item-block'  :label-width="FORM_LABEL_WIDTH" :inline="true" :model="DIALOG_FORM" ref='DIALOG_FORM' :rules="editForm">
        <el-row :gutter="10" class="toolbar" type="flex">
        <el-col :span="24">
            <!--检索-->
            <el-popover ref="searchForm" width="500" trigger="click">
                <el-form class='form-item-block'  :label-width="FORM_LABEL_WIDTH" :inline="true" :model="QUERY_FORM">
                    <el-form-item label="门店名称:">
                        <el-input  v-model="QUERY_FORM.storeName" placeholder="请输入门店名称"></el-input>
                    </el-form-item>
                    <el-form-item label="设备编号:">
                        <el-input  v-model="QUERY_FORM.bandNo" placeholder="请输入设备编号"></el-input>
                    </el-form-item>
                    <el-form-item label="绑定姓名:">
                        <el-input  v-model="QUERY_FORM.realName" placeholder="请输入绑定姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="绑定者类型:">
                        <el-select  placeholder="请选择式" v-model='QUERY_FORM.customerType'>
                            <el-option
                                v-for="item in personalTypeSearchOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="领取方式:">
                        <el-select  placeholder="请选择" v-model='QUERY_FORM.grandType'>
                            <el-option
                                v-for="item in typeSearchOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="操作时间:">
                        <el-date-picker
                        v-model="dateTime"
                        type="datetimerange"
                        :editable='false'
                        placeholder="选择时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-row justify="center">
                        <el-col :span="24" style="text-align:center">
                        <el-button type="primary"  @click="search()">查询</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-popover>
            <!--功能按钮区-->
            <el-row>
            <el-col :span="10" class="titleText"><Breadcrumb></Breadcrumb></el-col>
            <el-col :span="14" align="right" class="buttonBar">
                <el-button v-show='activeTab=="super" && RESULT_DATA.resultList.length<2' v-permissions="'WF120103'"  @click="addBracelet(3)">设置超级手环</el-button>
                <el-button v-show='activeTab=="all"' v-permissions="'WF120105'" @click="addBracelet(1)">批量录入手环</el-button>
                <el-button v-show='activeTab=="all"' v-permissions="'WF120102'" @click="addBracelet(2)">录入手环</el-button>
                <el-button v-show='activeTab=="experience"' v-permissions="'WF120108'" @click="experienceBracelet(1)">设置体验手环</el-button>
                <el-button v-popover:searchForm  v-show='activeTab=="all"' v-permissions="'WF120101'">检索</el-button>
            </el-col>
            </el-row>
        </el-col>
        </el-row>
        <el-form :model="formInline" class="demo-form-inline" size="small">
            <el-row>
              <el-col :span="6">
                <el-form-item label="审批人">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="活动区域">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                    <el-button type="primary" @click="console.log('22')">查询</el-button>
                </el-form-item>
              </el-col>
            </el-row>
        </el-form>
        <el-tabs v-model="activeTab"  @tab-click="tabHandleClick">
            <el-tab-pane label="全部手环" name="all">
                <!--列表-->
                <el-table  class='table-table' :data="RESULT_DATA.resultList" highlight-current-row :border="true" @filter-change="filterList"  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
                    <el-table-column prop="bandNo" label="设备编号" min-width="150"></el-table-column>
                    <el-table-column prop="importTime" label="导入时间" min-width="200"></el-table-column>
                    <el-table-column prop="opTime" label="操作时间" min-width="200"></el-table-column>
                    <el-table-column prop="opUserName" label="操作人" min-width="150"></el-table-column>
                    <el-table-column prop="storeName" label="存入门店" min-width="200"></el-table-column>
                    <el-table-column prop="bindingTypeValue" label="绑定类型" min-width="150"></el-table-column>
                    <el-table-column prop="realName" label="绑定姓名" min-width="150"></el-table-column>
                    <el-table-column prop="customerTypeValue" label="绑定者类型" min-width="150"></el-table-column>
                    <el-table-column prop="grandTypeValue" label="领取方式" min-width="150"></el-table-column>
                    <el-table-column prop="bandStatusValue" label="运作状态" min-width="150"></el-table-column>
                    <el-table-column label="操作"  width="100">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                v-if='scope.row.bandStatus!=1'
                                @click="del({'id':scope.row.id,'objName':'此手环',page:RESULT_DATA,customAct:'allDel',callback: 'allDel'})"
                                v-permissions="'WF120104'"
                                size="small">
                                    <span>删除</span>
                            </el-button>
                        </template>   
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="超级手环" name="super">
                <!--列表-->
                <el-table  class='table-table' :data="RESULT_DATA.resultList" highlight-current-row :border="true" @filter-change="filterList"  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
                    <el-table-column prop="storeName" label="所属门店" min-width="150"></el-table-column>
                    <el-table-column prop="bandNo" label="手环编号" min-width="150"></el-table-column>
                    <el-table-column prop="opTime" label="设置时间" min-width="200"></el-table-column>
                    <el-table-column prop="opUserName" label="操作人" min-width="150"></el-table-column>
                    <el-table-column label="操作"  width="100">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                @click="del({'id':scope.row.id,'objName':'此手环',page:RESULT_DATA,customAct:'superDel',callback: 'superDel'})"
                                v-permissions="'WF120104'"
                                size="small">
                                    <span>删除</span>
                            </el-button>
                        </template>   
                    </el-table-column>  
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="体验手环" name="experience">
                <!--列表-->
                <el-table  class='table-table' :data="RESULT_DATA.resultList" highlight-current-row :border="true" @filter-change="filterList"  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
                    <el-table-column prop="storeName" label="门店" min-width="150"></el-table-column>
                    <el-table-column prop="bandNo" label="手环编号" min-width="150"></el-table-column>
                    <el-table-column label="手环权限" min-width="220">
                        <template slot-scope="scope">
                            <el-tag type="primary" v-for="(item,index) in scope.row.permissions" :key="index">{{item.typeName}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="手环说明" min-width="200"></el-table-column>
                    <el-table-column label="有效期" min-width="150">
                        <template slot-scope="scope">
                            <span v-if="scope.row.validityPeriodStartDate">{{scope.row.validityPeriodStartDate}} <br/>{{scope.row.validityPeriodEndDate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTimeStr" label="设置时间" min-width="150"></el-table-column>
                    <el-table-column prop="opUserName" label="操作人" min-width="150"></el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                v-permissions="'WF120106'"
                                @click="experienceBracelet(2,scope.row)"
                                size="small">
                                    <span>编辑</span>
                            </el-button>
                            <el-button
                                type="text"
                                v-permissions="'WF120107'"
                                @click="delDel(scope.row)"
                                size="small">
                                    <span>删除</span>
                            </el-button>
                        </template>   
                    </el-table-column>  
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <!--分页-->
        <Pagination :pageData="RESULT_DATA" @change="pageListFun"></Pagination>
        <!-- 录入手环 -->
        <el-dialog title="录入手环" v-model="dialogAddBracelet" :close-on-click-modal='false'>
            <el-form-item label="手环编号:" prop="bandNo"  v-if="type!=1" >
                <el-input  v-model="DIALOG_FORM.bandNo" placeholder="请输入手环编号"></el-input>
            </el-form-item>
            <el-form-item label="手环编号:" prop="bandNos"  v-if="type==1" >
                <el-input  v-model="DIALOG_FORM.bandNos"  type="textarea" :rows="8"></el-input>
            </el-form-item>
            <el-row justify="center">
                <el-col :span="24" style="text-align:center">
                    <el-button  @click="canel">取消</el-button>
                    <el-button type="primary" @click="saveBracelet">保存</el-button>
                </el-col>
            </el-row>
        </el-dialog>
        <el-dialog :title="dialogExperienceTitle?'体验手环':'编辑体验手环'" v-model="dialogExperience" v-if='dialogExperience' :close-on-click-modal='false'>
            <el-form-item label="手环权限:" class="hand_validity">
                <el-checkbox-group v-model="DIALOG_FORM.checkList" class="hand_validity01">
                    <el-checkbox :label="item.value" v-for="(item,index) in checkboxList" :key="index">{{item.label}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="手环编号:" class='required' prop="bandNo">
                  <el-input :maxlength="16" class="form-input" v-model="DIALOG_FORM.bandNo" :disabled="dialogExperienceTitle==2" placeholder="请输入手环编号" ></el-input>
            </el-form-item>
            <el-form-item label="体验门店:">
                <el-select v-model="DIALOG_FORM.storeId" placeholder="请选择" :disabled="dialogExperienceTitle==2">
                    <el-option
                    v-for="item in storeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="有效期:">
                <el-radio class="radio" v-model="DIALOG_FORM.validityPeriod" label="1">不限</el-radio>
                <el-radio class="radio" v-model="DIALOG_FORM.validityPeriod" label="2">时间段</el-radio>
                <el-date-picker
                      v-model="DIALOG_FORM.dateTime"
                      :disabled="DIALOG_FORM.validityPeriod!='2'"
                      type="daterange"
                      :editable='false'
                      placeholder="选择日期">
                    </el-date-picker>
            </el-form-item>
            <el-form-item label="手环说明:">
                <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                :maxlength="50"
                v-model="DIALOG_FORM.remark">
                </el-input>
            </el-form-item>
            <el-row justify="center">
                <el-col :span="24" style="text-align:center">
                <el-button @click="canel">取消</el-button>
                <el-button type="primary" @click="saveHand">保存</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </el-form>
  </section>
</template>

<script>
  import { LIST_LOAD_TIME } from '../../config/config'
  import { DIALOG_FORM, DIALOG_TITLE, OPEN_DIALOG_FLAG, QUERY_FORM, EMPTY_FORM, LOADING, URL_PARAM, RESULT_DATA, CALLBACKTAG,CALLBACK } from '../../store/constant'
  import {SUCCESS_CODE} from '../../config/config'
  import baseMethod from '../../common/baseMethods'
  import baseData from '../../common/baseData'
  import common from '../common'
  import util from '../../common/util'
  // 函数集合
  class method extends baseMethod{
    // tab切换事件
    tabHandleClick = function(tab, event) {
      let tabName = tab.name
      switch (tabName){
        case 'all':
          this.activeTab= 'all'
          this.QUERY_FORM= {customerType:'',grandType:'',startTime:'',endTime:''}
          this.dateTime=[]
          this.pageList(1,{customAct:'allList'})
          break
        case 'super':
          this.activeTab= 'super'
          this.QUERY_FORM= {customerType:'',grandType:'',startTime:'',endTime:''}
          this.dateTime=[]
          this.pageList(1,{customAct:'superList'})
          break
        case 'experience':
          this.activeTab= 'experience'
          this.QUERY_FORM= {customerType:'',grandType:'',startTime:'',endTime:''}
          this.dateTime=[]
          this.pageList(1,{customAct:'experienceList'})
          break
      }
    }
    resetForm=function (formName) {
        this.$refs[formName].resetFields()
    }
    //取消按钮
    canel=function (){
        this.dialogAddBracelet=false;
        this.dialogExperience=false;
    }
  }

  export default {
    data() {
      return {
        ...baseData,
        [URL_PARAM]: { 
          common: '',
          allList:"bandBasic",
          superList:'bandBasic/super',
          allDel:"bandBasic/delete",
          superDel:"bandBasic/super/delete",
          save:'bandBasic/save',
          saveList:'bandBasic/batchInsert',
          saveSuper:'bandBasic/super/save',
          experienceList:'bandBasic/experience',
          handPermissions:'bandBasic/experience/permissions',
          handSave:'bandBasic/experience/save',
          delete:'bandBasic/experience/delete'
        },
        [QUERY_FORM]: {customerType:'',grandType:'',startTime:'',endTime:''},
        [DIALOG_FORM]:{
            bandNo:'',
            storeId:'',
            checkList:[],
            validityPeriod:'1',
            dateTime:[],
            remark:'',
            permissions:[],
            validityPeriodStartDate:'',
            validityPeriodEndDate:'',
        },
        editForm:{
            bandNo:[{ required: true, message: '请输入手环编号', trigger: 'blur' }],
            bandNos:[{ required: true, message: '请录入手环编号', trigger: 'blur' }],
        },
        activeTab:'all',
        dateTime:[],
        personalTypeSearchOptions:[{
            value: '',
            label: '全部'
        },{
            value: '1',
            label: '会员'
        },{
            value: '2',
            label: '员工'
        },{
            value: '3',
            label: '管理员'
        }],
        typeSearchOptions:[{
            value: '',
            label: '全部'
        },{
            value: '1',
            label: '发放'
        },{
            value: '2',
            label: '购买'
        },{
            value: '3',
            label: '租借'
        }],
        dialogAddBracelet:false,
        type:0,
        dialogExperience:false,
        dialogExperienceTitle:1,
        checkboxList:[],
        //门店列表
        storeOptions:[],
        formInline: {
          user: '',
          region: ''
        }
      };
    },
    watch:{
      CALLBACKTAG: 'callBackFun',
      'DIALOG_FORM.validityPeriod':function(n,o){
            if(n!='2'){
                this.DIALOG_FORM.dateTime=[];
                this.DIALOG_FORM.validityPeriodStartDate='';
                this.DIALOG_FORM.validityPeriodEndDate='';
            }
        }
    },
    mounted(){
        this.tabHandleClick({ name: 'all' }, null)
        this.getStoreList();
        //获取手环权限
        let arg = {
            customAct: 'handPermissions',
            callback: 'handPermissions',
            message:false,
            reLoad: false
        }
        this.customGet(arg)
    },
    methods: {
      ...new method(),
      callBackFun(){
        switch (this.CALLBACK.callback){
            case 'save':
                this.$message({
                    message: '手环信息录入成功！',
                    type: 'success'
                })
                this.addBracelet(this.type)
                this.pageList(this.RESULT_DATA.currentPage,{customAct:'allList'})
                break
            case 'saveList':
                this.$message({
                    message: '批量手环信息录入成功！',
                    type: 'success'
                })
                this.addBracelet(this.type)
                this.pageList(this.RESULT_DATA.currentPage,{customAct:'allList'})
                break
            case 'saveSuper':
                this.$message({
                    message: '超级手环信息设置成功！',
                    type: 'success'
                })
                this.canel()
                this.pageList(this.RESULT_DATA.currentPage,{customAct:'superList'})
                break
            case 'allDel':
                this.pageList(this.RESULT_DATA.currentPage,{customAct:'allList'})
                break
            case 'superDel':
                this.pageList(this.RESULT_DATA.currentPage,{customAct:'superList'})
                break
            case 'experienceList':
                this.pageList(this.RESULT_DATA.currentPage,{customAct:'superList'})
                break
            case 'handPermissions':
                let _data=this.CALLBACK.data;
                if(_data.resCode==SUCCESS_CODE){
                    this.checkboxList=this.setWantData(_data.data);
                }
                break
            case 'handSave':
            case 'delete':
                let data01=this.CALLBACK.data;
                if(data01.resCode==SUCCESS_CODE){
                    this.canel();
                    this.tabHandleClick({ name: 'experience' }, null)
                }
                break
        }
      },
      // 获取门店信息
      getStoreList(){
        this.$http.get('control/getStoreList', {}).then((result) => {
          let _result = result.data
          if (_result.resCode === SUCCESS_CODE) {
              for(let x in _result.resultList){
                let json={
                    value:_result.resultList[x].id,
                    label: _result.resultList[x].storeName
                }
                this.storeOptions.push(json)
              }
          }else if (_result.resCode === '60003') {
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
        })
      },
      //查询按钮
      search(){
        if(!util.isEmpty(this.dateTime[0])){
          this.QUERY_FORM.startTime=util.formatDate(this.dateTime[0],'yyyy-MM-dd HH:mm:ss')
          this.QUERY_FORM.endTime=util.formatDate(this.dateTime[1],'yyyy-MM-dd HH:mm:ss')
        }else {
          this.QUERY_FORM.startTime=''
          this.QUERY_FORM.endTime=''
        }
        this.getList()
      },
      //将数据转换想要的数据
      setWantData(oldData){
            let _checkboxList=[];
            oldData.forEach((item,index)=>{
                _checkboxList=[..._checkboxList,{label:item.typeName,value:item.classify+'_'+item.type}]
            })
            return _checkboxList;
      },
      delDel(data){
        let arg = {
            postParam: data,
            customAct: 'delete',
            callback: 'delete',
            reLoad: false
        }
        this.customPost(arg)
      },
      saveHand(){
        this.$refs[DIALOG_FORM].validate((valid) => {
          if (valid) {
            if(!util.isEmpty(this.DIALOG_FORM.dateTime[0])){
                this.$set(this.DIALOG_FORM,'validityPeriodStartDate',util.formatDate(this.DIALOG_FORM.dateTime[0],'yyyy-MM-dd'))
                this.$set(this.DIALOG_FORM,'validityPeriodEndDate',util.formatDate(this.DIALOG_FORM.dateTime[1],'yyyy-MM-dd'))
            }else{
                this.$set(this.DIALOG_FORM,'validityPeriodStartDate',null)
                this.$set(this.DIALOG_FORM,'validityPeriodEndDate',null)
            }
            let outData=[];
            this.DIALOG_FORM.checkList.forEach((item,index)=>{
                outData=[...outData,{classify:item.split('_')[0],type:item.split('_')[1]}]
            })
            this.DIALOG_FORM.permissions=outData;
            let arg = {
                postParam:this.DIALOG_FORM,
                customAct: 'handSave',
                callback: 'handSave',
                reLoad: false
            }
            this.customPost(arg)

          }
        })
      },
      //编辑,设置 体验手环
      experienceBracelet(type,data){
        //type 1 设置 2编辑
        this.resetForm('DIALOG_FORM');
        if(data){
            this.DIALOG_FORM=util.simpleClone(data);
            //选中了的手环权限集合
            //还要拆开
            let _dataList=this.setWantData(this.DIALOG_FORM.permissions);
            let _data=[];
            _dataList.forEach((item,index)=>{
                _data=[..._data,item.value];
            })
            setTimeout(()=>{
                this.$set(this.DIALOG_FORM,'checkList',_data)
            },20);
            //设置时间状态
            if(this.DIALOG_FORM.validityPeriodStartDate){
                this.$set(this.DIALOG_FORM,'validityPeriod','2')
                //设置时间选择器
                this.$set(this.DIALOG_FORM,'dateTime',[new Date(this.DIALOG_FORM.validityPeriodStartDate+' 00:00:00'),new Date(this.DIALOG_FORM.validityPeriodEndDate+' 00:00:00')])
            }else{
                this.$set(this.DIALOG_FORM,'validityPeriod','1')
                this.$set(this.DIALOG_FORM,'dateTime',[null,null])
            }
        }else{
            this.DIALOG_FORM={
                bandNo:'',
                storeId:'',
                checkList:[],
                validityPeriod:'1',
                dateTime:[],
                startTime:null,
                endTime:null,
                remark:'',
                permissions:[],
                validityPeriodStartDate:'',
                validityPeriodEndDate:''
            }
            //默认手环全部选中
            let cList=[];
            this.checkboxList.forEach((item,index)=>{
                cList = [...cList,item.value]
            })
            this.$set(this.DIALOG_FORM,'checkList',cList)
        }
        this.dialogExperienceTitle=type;
        this.dialogExperience=true;
      },
      // 分页
      pageListFun(pageSize){
        switch (this.activeTab){
          case 'all':
            this.pageList(pageSize,{customAct:'allList'})
            break
          case 'super':
            this.pageList(pageSize,{customAct:'superList'})
            break
        }
      },
      // 获取list
      getList(){
        switch (this.activeTab){
          case 'all':
            this.pageList(1,{customAct:'allList'})
            break
          case 'super':
            this.pageList(1,{customAct:'superList'})
            break
        }
      },
      // 新增手环
      addBracelet(type){
          this.resetForm('DIALOG_FORM')
          this.DIALOG_FORM={
            bandNo:'',
            bandNos:''
          }
          this.type=type
          this.dialogAddBracelet=true
      },
      // 保存手环信息
      saveBracelet(){
        let url=''
        switch (this.type){
            case 1:
                url='saveList'
                break
            case 2:
                url='save'
                break
            case 3:
                url='saveSuper'
                break
        }
        this.$refs[DIALOG_FORM].validate((valid) => {
          if (valid) {
            let arg = {
                postParam: this[DIALOG_FORM],
                customAct: url,
                callback: url,
                reLoad: false
            }
            this.customPost(arg)
          }
        })
      },
    }
  }
</script>
<style lang="less">
    .hand_validity .hand_validity01 .el-checkbox {
        width:90px;
        margin-left: 0;
    }
    .el-tag {
        display: inline-block;
        margin-right: 8px;
        margin-top: 5px;
    }
</style>

