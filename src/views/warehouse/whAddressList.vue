<template>
  <section style="padding:10px 20px">
    <el-form class='form-item-block'  :label-width="FORM_LABEL_WIDTH" :inline="true" :model="DIALOG_FORM" ref='DIALOG_FORM' :rules="editForm">
      <el-row :gutter="10" class="toolbar" type="flex">
        <el-col :span="24">
          <!--功能按钮区-->
          <el-row>
            <el-col :span="16" class="titleText"><Breadcrumb></Breadcrumb></el-col>
 
          </el-row>
        </el-col>
      </el-row>
      <el-form :model="QUERY_FORM" class="demo-form-inline" size="small"  >
        <el-row :gutter="20">
         <el-col :span="24"  >
        <el-button type="success"  size="small" style="float:left;margin-right:10px" v-permissions="'WH000102'"@click="addWh()">+添加发货/退货地址</el-button>
         <el-select style="width:140px;float:left" v-model="QUERY_FORM.selectOption"  size="small">
                      <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-input v-model="QUERY_FORM.searchContent" placeholder="请输入关键字" style="float:left;width:300px" size="small"></el-input>
              <el-button type="primary" size="small" style="float:left;margin-left:10px" @click="seach">搜索</el-button>
        </el-col>
          
        </el-row>
      </el-form>
      <!--列表-->
      <div style="width:100%;float:left;margin-top:-5px;margin-bottom:10px">
         <el-button  plain size="small" @click="delWH">删除</el-button>
      </div>
      <el-table size="mini" ref="multipleTable" @row-click="handleCurrentChange"  @selection-change="selsChange" class='table-table margin-bt-tb' :data="RESULT_DATA.resultList" highlight-current-row :border="false" @filter-change="filterList"  v-loading="LOADING" :element-loading-text="$t('lang.common.loading')">
      <el-table-column type="selection" width="55" prop="index" align="center"></el-table-column>
      <el-table-column prop="id" label="序号" min-width="200"></el-table-column>
      <el-table-column prop="warehouseName" label="仓库名称" min-width="200"></el-table-column>
      <el-table-column prop="supplierName" label="供应商名称" min-width="200"></el-table-column>
      <el-table-column prop="deliverDetAddress" align="center" label="发货/退货地址" min-width="200">
       <template slot-scope="scope">
          <span v-if="scope.row.deliverDetAddress!= '' && scope.row.deliverDetAddress">
          <el-popover placement="top-start" trigger="hover" >
         <p>{{scope.row.deliverDetAddress}},{{scope.row.deliverName}},{{scope.row.deliverPhone}}</p></el-col>
             <el-button type="text"  style="margin-top:-20px"
                                                            v-clipboard:copy="copyContent(scope.row.deliverDetAddress,scope.row.deliverName,scope.row.deliverPhone)"
                                                            v-clipboard:success="onCopy"
                                                            v-clipboard:error="onError">复制
                                                 </el-button>
                                               

          <u slot="reference"  type="primary" size="mini" style="color:#008aff;margin-right:10px">发货地址</u>
          </el-popover>
           </span>
          <span v-if="scope.row.receiveDetAddress!= '' && scope.row.receiveDetAddress">
          <el-popover placement="top-start" trigger="hover" >
                    
                      <p>{{scope.row.receiveDetAddress}},{{scope.row.receiveName}},{{scope.row.receivePhone}}</p>
                      <el-button type="text" style="margin-top:-20px"
                                                                      v-clipboard:copy="copyContent(scope.row.receiveDetAddress,scope.row.receiveName,scope.row.receivePhone)"
                                                                      v-clipboard:success="onCopy"
                                                                      v-clipboard:error="onError">复制
                                                           </el-button>
      
          <u slot="reference"  type="warning" style="color:#008aff">退货地址</u> </el-popover> </span>
        </template>
      </el-table-column>
      <el-table-column prop="isShow" label="是否显示" min-width="200">
      <template slot-scope="scope">
                 <p v-if="scope.row.isShow=='1'"> 显示</p>
                 <p v-else-if="scope.row.isShow=='2'"> 不显示</p>
      </template>
     </el-table-column>
      <el-table-column label="操作" width="180">
          <template slot-scope="scope">
                  <el-button
                    v-permissions="'WH000101'"
                        @click="editWH(scope.row,'1')"
                        type="text"
                        size="small">
                        <span>详情</span>
                      </el-button>
                <el-button
                @click="editWH(scope.row,'2')"
                  type="text"
                  v-permissions="'WH000103'"
                  size="small">
                    <span>编辑</span>
                </el-button>

          </template>
      </el-table-column>
      </el-table>
      <!--分页-->
      <Pagination :pageData="RESULT_DATA" @change="pageList"></Pagination>

    </el-form>
  </section>
</template>
<script>
    import { LIST_LOAD_TIME } from '../../config/config'
    import { DIALOG_FORM, DIALOG_TITLE, OPEN_DIALOG_FLAG, QUERY_FORM, EMPTY_FORM, LOADING, URL_PARAM, RESULT_DATA, CALLBACKTAG,CALLBACK } from '../../store/constant'
    import {SUCCESS_CODE} from '../../config/config'
    import api from '../../config/axios-config'
    import baseMethod from '../../common/baseMethods'
    import baseData from '../../common/baseData'
    import common from '../common'
    import util from '../../common/util'
    import opInfo from '../../common/opInfo'
    import { Loading } from 'element-ui'
    import { checkZ,checkNumber,checkZz0,checkZz } from '../../common/validator'


    // 函数集合
    class method extends baseMethod{


    }
 export default {
     data() {
      return {
        ...baseData,
        [URL_PARAM]: { common: 'controller/whAddress',del:'controller/whAddress/del'},
        [QUERY_FORM]: {selectOption:''},
        isEdit: false,
        dialogAddBrand: false,
        editForm: {

        },
        headers:{
          'x-auth-token': opInfo.getOpInfo().token
        },
         activeTab:'base',
        selectOptions:[
          {value: '1',label: '仓库名称'},
          {value: '2',label: '供应商名称'}]

      };
    },
    created(){
      this.QUERY_FORM.selectOption=this.selectOptions[0].value
    },
    watch:{
      CALLBACKTAG: 'callBackFun'
    },
    mounted(){
      this.pageList()
    },
    methods: {
      ...new method(),
      callBackFun(){
        switch (this.CALLBACK.callback){
            case 'saveBrand':
                this.dialogAddBrand=false
                this.pageList(this.RESULT_DATA.currentPage)
                break
            case 'delBrand':
                this.pageList(this.RESULT_DATA.currentPage)
                break
        }
      },

      //查询按钮
      seach(){

        this.pageList()
      },

      addWh(){
          this.$router.push({path: '/warehouse/warehouseDetail'})
       },

       delWH(){
      if(this.arrID == undefined||this.arrID.length == 0){
           this.$message({
               message: "请勾选需要删除的仓库信息",
               type: 'error'
           })
      }else{
       this.$confirm('确认删除记录吗?', '提示', {}).then(() => {
         api.post("controller/whAddress/del",{"whIds":this.arrID}).then((result)=>{
                         let _result = result.data
                       if(_result.resCode==SUCCESS_CODE){
                          this.$message({
                                               message: '操作成功',
                                               type: 'success'
                                             })
                            this.pageList()
                       } else{
                            this.$message({
                                               message: "请勾选需要删除的仓库信息",
                                               type: 'error'
                                             })
                       }
                      })
                      })

      }

       },



         handleCurrentChange(row, event, column){
               	var same=false;
                   if(this.arrID.length > 0){
       				for(var i=0; i<this.arrID.length ;i++){
       					if(this.arrID[i]==row.id){
       						same=true;
       						this.removeByValue(this.arrID, row.id);
       						break;
       					}
       				}
       				if(same==true){
       	            	this.$refs.multipleTable.toggleRowSelection(row,false);
       	            }else{
       	            	this.$refs.multipleTable.toggleRowSelection(row,true);
       	            	this.arrID.push(row.id);
       	            }
                   }else{
                   	this.$refs.multipleTable.toggleRowSelection(row,true);
               		this.arrID.push(row.id);
                   }
               },
               selsChange(val){
               	var valId=[];
               	for(var i=0;i<val.length;i++){
               		var arrIDsame=false;
               		valId.push(val[i].id);
               	}
               	this.arrID=valId;
               },
               editWH(data,step){
         let query = {
          'page': this.RESULT_DATA.currentPage,
          'whId': data.id,
          'step': step
        }
                this.$router.push({path: '/warehouse/warehouseDetail',query: query})
               },

               copyContent(data,data1,data2){
               return data+","+data1+","+data2
               },
                     onCopy: function (e) {
                       // console.log('复制成功！')
                     },
                     onError: function (e) {
                       // console.log('复制失败！')
                     },

                     selectAddress(){
                      this.pageList()

                     }



    }
 }



</script>

<style lang="less">

</style>
