<template>
  <section style="padding:10px 20px">
    <el-form class='form-item-block goodsView' :label-width="FORM_LABEL_WIDTH" :inline="true">
      <el-row :gutter="10" class="toolbar" type="flex" style="padding-bottom:14px">

            <el-col :span="16" class="titleText">
              <Breadcrumb></Breadcrumb>
            </el-col >
            <el-col :span="8" align="right" class="titleText">
              <el-button @click="returnBack()" style="margin-top:-50px">返回</el-button>
            </el-col>
          </el-row>

      <div style="margin: 20px;"></div>
      <el-form :model="result" class="demo-form-inline" size="small" label-position="right" ref='result' :rules="editForm">
        <el-tabs type="card">
          <el-tab-pane label="基础信息">
            <el-form-item label="商品标题:" prop="title">
              {{result.title}}
            </el-form-item>
            <el-form-item label="副标题:" prop="subTitle" style="margin-top:-10px">
              {{result.subTitle}}
            </el-form-item>
            <el-form-item label="SPU编码:" prop="goodsNumber" style="margin-top:-10px">
              {{result.goodsNumber}}
            </el-form-item>
            <el-form-item label="SPU商品名称:" prop="goodsName" style="margin-top:-10px">
              {{result.goodsName}}
            </el-form-item>
            <el-form-item label="SPU商品英文名称:" prop="goodsEnName" style="margin-top:-10px">
              {{result.goodsEnName}}
            </el-form-item>
            <el-form-item label="供应商:" prop="supplierName" style="margin-top:-10px">
              {{result.supplierName}}
            </el-form-item>
            <el-form-item label="品牌名称:" prop="brandName" style="margin-top:-10px">
              {{result.brandName}}
            </el-form-item>
            <el-form-item label="分类:" prop="category" style="margin-top:-10px">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <template v-for="(cate,index) in result.category">
                  <el-breadcrumb-item style="line-height:32px;">{{cate.name}}</el-breadcrumb-item>
                </template>
              </el-breadcrumb>
            </el-form-item>
            <el-form-item label="合作模式:" prop="cooperationMode" style="margin-top:-10px">
              <li v-if="result.cooperationMode ==1">一件代发</li>
              <li v-else-if="result.cooperationMode ==2">代销</li>
              <li v-else-if="result.cooperationMode ==3">经销</li>
            </el-form-item>
            <el-form-item label="原产地:" prop="sourceArea" style="margin-top:-10px">
              {{result.sourceArea}}
            </el-form-item>
            <el-form-item label="是否跨境:" prop="crossBorder" style="margin-top:-10px">
              <li v-if="result.crossBorder == 1">是</li>
              <li v-else-if="result.crossBorder == 2">否</li>
            </el-form-item>
            <el-form-item label="增值税率:" prop="taxRate" style="margin-top:-10px">
              {{result.taxRate}}%
            </el-form-item>
            <el-form-item label="发货仓库:" prop="storageId" style="margin-top:-10px">
              <template v-for="item in result.warehouse">
                  <li v-if="result.storageId == item.id">{{item.warehouseName}}</li>
              </template>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <el-tabs type="card">
          <el-tab-pane label="商品信息">
            <el-form-item label="商品视频:" class='upload'>
              <el-upload
                class="upload-demo"
                :limit="1"
                :action="videoUrl"
                :file-list="result.goodsVideo"
                :disabled="true"
                list-type="picture-card">
                <div slot="tip" class="el-upload__tip" style='line-height:15px'>只能上传mp4格式文件，文件不能超过2MB，只能上传1个</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="商品主图:" class='required upload'>
              <el-upload
                class="upload-demo"
                :limit="1"
                :action="fileUrl"
                :file-list="result.mainFile"
                :disabled="true"
                list-type="picture-card">
                <div slot="tip" class="el-upload__tip" style='line-height:15px'>只能上传jpg/png格式文件，文件不能超过1MB，只能上传1张</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="商品详情图:" prop="fileUrl" class='required upload'>
              <el-upload
                multiple
                class="upload-demo"
                :limit="7"
                :action="fileUrl"
                :file-list="result.goodsFile"
                :disabled="true"
                list-type="picture-card">
                <div slot="tip" class="el-upload__tip" style='line-height:15px'>只能上传jpg/png格式文件，文件不能超过1MB，最多上传7张</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="图文描述:" prop="description">
                    <el-upload
                      multiple
                      :disabled="true"
                       class="avatar-uploader"
                      :action="serverUrl"
                      :headers="headers"
                      :show-file-list="false">
                    </el-upload>
                      <quill-editor
                      class="editor"
                      v-model="result.description"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                      @change="onEditorChange($event)">
                      </quill-editor>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <el-tabs type="card" style="margin-top:20px;width:100%">
          <el-tab-pane label="销售信息" >
            <el-form-item label="自定义商品规格:" style="width:100%; line-height:40px">
              <template v-for="spec in specList">
                <div style="margin:0px; background:#f0f9f9">
                  <el-row>
                   <el-form-item label="产品规格：" style="margin-top:16px">
                      <el-input v-model="spec.value" style="width:110px;" :disabled="true"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row  style="margin-top:-30px">
                    <el-form-item label="规格属性：" >
                      <template v-for="specValue in spec.child">
                        <li style="width:120px;float:left;" >
                          <el-input v-model="specValue.value" :disabled="true" style="width:110px;"></el-input>
                        </li>
                      </template>
                    </el-form-item>
                  </el-row>

                </div>
              </template>
            </el-form-item>
            <table class="sku_table" cellspacing="0" cellpadding="0" border="0">
              <thead class="has-gutter">
              <tr style="border:1px;height:50px; ">
                <th class="is-leaf" width="5%" colspan="1" rowspan="1">SPU编码</th>
                <th class="is-leaf" width="5%" colspan="1" rowspan="1">SKU条形码</th>
                <th class="is-leaf" width="5%" colspan="1" rowspan="1">SKU商品名称</th>
                <th class="is-leaf" width="5%" colspan="1" rowspan="1">箱规</th>
                <template v-for="spec in specList">
                  <th class="is-leaf" v-if="spec.value!=null && spec.value!=''" width="5%" colspan="1" rowspan="1">{{spec.value}}</th>
                </template>
                <th class="is-leaf" width="5%" colspan="1" rowspan="1">佣金率</th>
                <th class="is-leaf" width="5%" colspan="1" rowspan="1">代销折扣率</th>
                <th class="is-leaf" width="5%" colspan="1" rowspan="1">供货价(元)</th>
                <th class="is-leaf" width="5%" colspan="1" rowspan="1">建议零售价(元)</th>
                <th class="is-leaf" width="5%" colspan="1" rowspan="1">参考库存(个)</th>
                <th class="is-leaf" width="5%" colspan="1" rowspan="1">虚拟库存(个)</th>
                <th class="is-leaf" width="5%" colspan="1" rowspan="1">售价(元)</th>
                <th class="is-leaf" width="5%" colspan="1" rowspan="1">可分配利润(元)</th>
              </tr>
              </thead>
              <tbody class="t_sku">
              <template v-for="sku in result.sku">
                <tr style="height:50px;">
                  <td rowspan="1" colspan="1">{{sku.goodsNumber}}</td>
                  <td rowspan="1" colspan="1">{{sku.barCode}}</td>
                  <td rowspan="1" colspan="1">{{sku.skuName}}</td>
                  <td rowspan="1" colspan="1">{{sku.pcs}}</td>
                  <template v-for="spec in specList">
                    <template v-for="specValue in result.spec">
                      <td rowspan="1" colspan="1" v-if="sku.id == specValue.skuId && spec.value==specValue.spec && spec.value!=null && spec.value!=''">
                        {{specValue.specValue}}
                      </td>
                    </template>
                    </td>
                  </template>
                  <td rowspan="1" colspan="1">{{sku.brokerage}}%</td>
                  <td rowspan="1" colspan="1">{{sku.desRate}}%</td>
                  <td rowspan="1" colspan="1">{{sku.purchasePrice | currency}}</td>
                  <td rowspan="1" colspan="1">{{sku.retailPrice | currency}}</td>
                  <td rowspan="1" colspan="1">{{sku.stock}}</td>
                  <td rowspan="1" colspan="1">{{sku.dummyStock}}</td>
                  <td rowspan="1" colspan="1">{{sku.price | currency}}</td>
                  <td rowspan="1" colspan="1">{{sku.distributionProfit | currency}}</td>
                </tr>
              </template>
              </tbody>
            </table>

          </el-tab-pane>
        </el-tabs>
      </el-form>
      </br></br></br>
      <el-row justify="center">
        <el-col :span="24" style="text-align:center">
          <el-button @click="returnBack">取消</el-button>
        </el-col>
      </el-row>

    </el-form>
  </section>
</template>
<style>
  .table-c table {
    border-right: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
  }
  .sku_table{
    border-left:1px solid #ebeef5;
    border-top:1px solid #ebeef5;
    border-bottom:1px solid #ebeef5;
    border-spacing:0;
  }
  .sku_table tr th{
     border-right: 1px solid  #ebeef5;
 //    border-bottom:1px solid #ebeef5;
  }
  .sku_table tr td{
    border-top:1px solid #ebeef5;
     border-right: 1px solid  #ebeef5;
  }
  .t_sku tr td{
    text-align:center;
  }
  .goodsView label {
    display: inline-block;
    width: 150px;
    text-align: right;
  }
</style>
<script>
// 工具栏配置
const toolbarOptions = [
];
  import {LIST_LOAD_TIME} from '../../config/config'
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
  import api from '../../config/axios-config'
  import util from '../../common/util'
  import opInfo from '../../common/opInfo'
  import baseMethod from '../../common/baseMethods'
  import baseData from '../../common/baseData'
  import { quillEditor } from "vue-quill-editor";
  import "quill/dist/quill.core.css";
  import "quill/dist/quill.snow.css";
  import "quill/dist/quill.bubble.css";
   import validator from '../../common/validator'
  // 函数集合
  class method extends baseMethod {
    resetForm = function (formName) {
      this.$refs[formName].resetFields()
    }
    //取消按钮
    canel = function () {
    }
  }
  export default {
    props: {
      /*编辑器的内容*/
      value: {
        type: String
      },
      /*图片大小*/
      maxSize: {
        type: Number,
        default: 3072 //kb
      }
    },
    data() {
      return {
        ...baseData,
        [URL_PARAM]: {common: 'controller/goods', saveGoods: 'controller/goods/saveGoods'},
        [QUERY_FORM]: {},
        result: {},
        specList: [],
        id: '',
        skuId: '',
        videoUrl: "",
        fileUrl: "",
        serverUrl: "",
        editForm: {
          title: [{required: true, message: '请输入商品标题', trigger: 'blur'},
            {min: 1, max: 30, message: '请输入1-30个字符', trigger: 'blur'}],
          subTitle: [{required: true, message: '请输入商品副标题', trigger: 'blur'},
            {min: 1, max: 30, message: '请输入1-30个字符', trigger: 'blur'}],
          storageId: [{required: true, message: '请选择发货仓库', trigger: 'blur'}],
          description: [{required: true, message: '请输入图文描述', trigger: 'blur'},
            {min: 1, message: '请输入内容', trigger: 'blur'}]
        },
        editorOption: {},
        headers: {
          'x-auth-token': opInfo.getOpInfo().token
        },
        dateTime: "",
         quillUpdateImg: false,
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        placeholder: "支持：jpg、png，单张容量最大3M,宽度800px以内",
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function(value) {
              },
            }
          }
        }
      },

      };
    },
    filters: {
      currency(val){
        return util.currency(val,2)
      }
    },
    created() {
      this.id = this.$route.query.id
      this.skuId = this.$route.query.skuId
    },
    watch: {
      CALLBACKTAG: 'callBackFun'
    },
    components: {quillEditor},
    mounted() {
      this.result = {}
      api.defaults.baseURL = process.env.API_ROOT + process.env.PATH_API
      this.videoUrl = process.env.API_ROOT + '/file/upload?fileCategoryNO=3&upType=3&fileType=mp4'
      this.fileUrl = process.env.API_ROOT + '/file/upload?fileCategoryNO=4&upType=3'
      this.serverUrl = process.env.API_ROOT + '/file/upload?fileCategoryNO=5&upType=3',
      this.init()
    },
    methods: {
      ...new method(),
      callBackFun() {
        switch (this.CALLBACK.callback) {
          case 'delGoods':
            this.pageList(this.RESULT_DATA.currentPage)
            break
        }
      },
      removeImg(){
        if(this.result.onLine==1){
           document.querySelector(".ql-toolbar").style="border-bottom: 0px;";
           document.querySelectorAll(".upload-demo .el-upload").forEach(item =>{
            item.style.display = "none";
           });
        }
      },
      returnBack() {
          this.$router.push({
            path: `${process.env.PATH_ROUTER}/goods/skuList`
          })
      },
      spec() {
        let specList = new Set();
        let specValueList = []
        for (let i = 0; i < this.result.spec.length; i++) {
          specList.add(this.result.spec[i].spec)
          let specValue = {
            name: this.result.spec[i].spec,
            value: this.result.spec[i].specValue
          }
          specValueList.push(specValue)
        }
        specList.forEach(it => {
          let json = {value: it,child:[]}
          this.specList.push(json)
        })
        for(let i= 0;i<specValueList.length;i++){
          for(let x=0;x<this.specList.length;x++){
              if(specValueList[i].name==this.specList[x].value){
                  if(this.result.onLine==1){
                    let specValue = {id:1,value:specValueList[i].value}
                    this.specList[x].child.push(specValue)
                  }else{
                    let specValue = {id:2,value:specValueList[i].value}
                    this.specList[x].child.push(specValue)
                  }
              }
          }
        }
        this.setSkuSpec();
      },
		  setSkuSpec(){
          this.result.sku.forEach(item=>{
            for(let x=0;x<this.specList.length;x++){
                let flag = true
                for(let y=0;y<this.result.spec.length;y++){
                    if(this.result.spec[y].skuId == item.id && this.result.spec[y].spec == this.specList[x].value){
                      flag = false;
                      break;
                    }
                }
                if(flag){
                  let specValue = {
                    skuId: item.id,
                    spec: this.specList[x].value,
                    specValue: ''
                  }
                  this.result.spec.push(specValue)
                }
            }
          })
      },
      init() {
        api.get('controller/goods/getGoodsById', {params: {"id": this.id, "skuId": this.skuId}}).then((result) => {
          let _result = result.data
          if (_result.resCode === SUCCESS_CODE) {
            this.result = util.simpleClone(_result.data);
            this.spec();
            this.removeImg()
          } else {
            this.$message({
              message: _result.resDesc,
              type: 'error'
            })
          }
        })
      },
      onEditorBlur(editor) {
        //失去焦点事件
        editor.enable(false);
      },
      onEditorFocus(editor) {
        //获得焦点事件
        editor.enable(false);
      },
      onEditorChange(editor) {
      }
    }
  }
</script>

<style lang="less">
.editor {
  line-height: normal !important;
  height: 500px!important;
  padding-bottom: 33px!important;
}
.ql-snow .ql-tooltip[data-mode=link]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
}
.ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:";
}
.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
  content: '10px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
  content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
  content: '32px';
}
.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: '标题6';
}
.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
  content: '衬线字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
  content: '等宽字体';
}
</style>
