<template>
  <section style="padding:10px 20px">
    <el-form class='form-item-block goodsView' :label-width="FORM_LABEL_WIDTH" :inline="true">
      <el-row :gutter="10" class="toolbar" type="flex" style="padding-bottom:14px">
				<el-col :span="16" class="titleText">
					<Breadcrumb></Breadcrumb>
				</el-col>
				<el-col :span="8" align="right" class="titleText">
					<el-button @click="returnBack()" style="margin-top:-50px">返回</el-button>
				</el-col>
			</el-row>
      <div style="margin: 20px;"></div>
      <el-form :model="result" class="demo-form-inline" size="small" label-position="right" ref='result' :rules="editForm">
        <el-tabs type="card">
          <el-tab-pane label="基础信息" >
            <el-form-item label="商品标题:" prop="title">
              <el-input v-model="result.title" v-if="result.onLine!=1" placeholder="请输入30字以内,且不能为空" :maxlength="30"></el-input>
              <li v-else-if="result.onLine == 1">{{result.title}}</li>
            </el-form-item>
            <el-form-item label="副标题:" prop="subTitle" style="margin-top:-5px">
              <el-input v-model="result.subTitle" v-if="result.onLine!=1" placeholder="请输入30字以内,且不能为空" :maxlength="30"></el-input>
              <li v-else-if="result.onLine == 1">{{result.subTitle}}</li>
            </el-form-item>
            <el-form-item label="SPU编码:" prop="goodsNumber" style="margin-top:-5px">
              {{result.goodsNumber}}
            </el-form-item>
            <el-form-item label="SPU商品名称:" prop="goodsName" style="margin-top:-5px">
              {{result.goodsName}}
            </el-form-item>
            <el-form-item label="SPU商品英文名称:" prop="goodsEnName" style="margin-top:-5px">
              {{result.goodsEnName}}
            </el-form-item>
            <el-form-item label="供应商:" prop="supplierName" style="margin-top:-5px">
              {{result.supplierName}}
            </el-form-item>
            <el-form-item label="品牌名称:" prop="brandName" style="margin-top:-5px">
              {{result.brandName}}
            </el-form-item>
            <el-form-item label="分类:" prop="category" style="margin-top:-5px">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <template v-for="(cate,index) in result.category">
                  <el-breadcrumb-item style="line-height:32px;">{{cate.name}}</el-breadcrumb-item>
                </template>
              </el-breadcrumb>
            </el-form-item>
            <el-form-item label="合作模式:" prop="cooperationMode" style="margin-top:-5px">
              <li v-if="result.cooperationMode ==1">一件代发</li>
              <li v-else-if="result.cooperationMode ==2">代销</li>
              <li v-else-if="result.cooperationMode ==3">经销</li>
            </el-form-item>
            <el-form-item label="原产地:" prop="sourceArea" style="margin-top:-5px">
              {{result.sourceArea}}
            </el-form-item>
            <el-form-item label="是否跨境:" prop="crossBorder" style="margin-top:-5px">
              <li v-if="result.crossBorder == 1">是</li>
              <li v-else-if="result.crossBorder == 2">否</li>
            </el-form-item>
            <el-form-item label="增值税率:" prop="taxRate" style="margin-top:-10px">
              {{result.taxRate}}%
            </el-form-item>
            <el-form-item label="发货仓库:" prop="storageId" style="margin-top:-5px">
              <el-select v-if="result.onLine!=1" v-model="result.storageId" placeholder="请选择仓库">
                <el-option
                  v-for="item in result.warehouse"
                  :key="item.id"
                  :label="item.warehouseName"
                  :value="item.id">
                </el-option>
              </el-select>
              <template v-else-if="result.onLine==1" v-for="item in result.warehouse">
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
                :on-success="uploadVideoCallBack"
                :on-remove="removeVideoFile"
                :on-exceed="errorVideo"
                :file-list="result.goodsVideo"
                :disabled="result.onLine==1"
                :before-upload="beforeVideoUpload"
                :headers="headers"
                list-type="picture-card">
                <el-button :class="'upload-dis-btn'"   size="small" type="primary" v-permissions="'YY010105'">点击上传
                </el-button>
                <div slot="tip" class="el-upload__tip" style='line-height:15px'>建议尺寸750px*750px，只能上传mp4格式文件，文件不能超过2MB，只能上传1个</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="商品主图:" class='required upload'>
              <el-upload
                class="upload-demo"
                :limit="1"
                :action="fileUrl"
                :on-success="uploadMainCallBack"
                :on-remove="removeMainFile"
                :on-exceed="errorMainFile"
                :file-list="result.mainFile"
                :before-upload="beforeUpload"
                :disabled="result.onLine==1"
                :headers="headers"
                list-type="picture-card">
                <el-button :class="'upload-dis-btn'" size="small" type="primary" v-permissions="'YY010105'">点击上传
                </el-button>
                <div slot="tip" class="el-upload__tip" style='line-height:15px'>建议尺寸750px*750px，只能上传jpg/png格式文件，文件不能超过1MB，只能上传1张</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="商品轮播图:" prop="fileUrl" class='required upload'>
              <el-upload
                multiple
                class="upload-demo"
                :limit="7"
                :action="fileUrl"
                :on-success="uploadCallBack"
                :on-remove="removeFile"
                :file-list="result.goodsFile"
                :before-upload="beforeUpload"
                :disabled="result.onLine==1"
                :headers="headers"
                list-type="picture-card">
                <el-button :class="'upload-dis-btn'" size="small" type="primary" v-permissions="'YY010105'">点击上传
                </el-button>
                <div slot="tip" class="el-upload__tip" style='line-height:15px'>建议尺寸750px*750px，只能上传jpg/png格式文件，文件不能超过1MB，最多上传7张</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="商品详情图:" prop="description">
                    <el-upload
                      multiple
                      class="avatar-uploader"
                      :action="serverUrl"
                      :headers="headers"
                      :show-file-list="false"
                      :on-success="uploadSuccess"
                      :on-error="uploadError"
                      :disabled="result.onLine==1"
                      :before-upload="beforeEditorUpload">
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
          <el-tab-pane label="销售信息">
            <el-form-item label="自定义商品规格:"  class='required' style="width:100%; line-height:40px">
              <template v-for="(spec,index) in specList">
                <div style="margin:0px; background:#f0f9f9">
                  <el-row >
                   <el-form-item label="产品规格：" style="margin-top:16px">
                      <el-input v-model="spec.value" style="width:110px;" :disabled="result.onLine == 1" @change="changeSpec(spec)"></el-input>
                      <el-button @click="delSpec(index)" v-if="result.onLine != 1"  icon="el-icon-remove" style="margin-right:10px;padding:5px 5px;"></el-button>
                    </el-form-item>
                  </el-row>
                  <el-row style="margin-top:-30px">
                    <el-form-item label="规格属性：">
                      <template v-for="(specValue,index) in spec.child">
                        <li style="width:25%;float:left;">
                          <el-input v-model="specValue.value" :disabled="specValue.id==1" style="width:110px;"></el-input>
                          <el-button  @click="delSpecValue(spec,index)" v-if="specValue.id!=1"  round icon="el-icon-remove" style="margin-right:5px;padding:5px 5px;"></el-button>
                        </li>
                      </template>
                      <el-button @click="addSpecValue(spec)" icon="el-icon-circle-plus"></el-button>
                    </el-form-item>
                  </el-row>
                </div>
              </template>
              <el-button @click="addSpec" size="midium">添加规格</el-button>
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
                        <select v-if="sku.status != 1" v-model="specValue.specValue" style="width:100px;height:32px;">
                          <template v-for="specValues in spec.child">
                            <option :value="specValues.value">
                              {{specValues.value}}
                            </option>
                          </template>
                        </select>
                        <li  v-else="sku.status == 1">{{specValue.specValue}}</li>
                      </td>
                    </template>
                    </td>
                  </template>
                  <td rowspan="1" colspan="1">{{sku.brokerage}}%</td>
                  <td rowspan="1" colspan="1">{{sku.desRate}}%</td>
                  <td rowspan="1" colspan="1">{{sku.purchasePrice | currency}}</td>
                  <td rowspan="1" colspan="1">{{sku.retailPrice | currency}}</td>
                  <td rowspan="1" colspan="1">{{sku.stock}}</td>
                  <td rowspan="1" colspan="1">
                    <el-input-number v-model="sku.dummyStock" v-if="sku.status != 1" :min="0" size="samll" placeholder="请输入虚拟库存" controls-position="right"></el-input-number>
                    <li v-else-if="sku.status == 1">{{sku.dummyStock}}</li>
                  </td>
                  <td rowspan="1" colspan="1">
                    <el-input-number v-model="sku.price" :precision="2" v-if="sku.status != 1" size="samll" :min="0" placeholder="请输入售价" controls-position="right"></el-input-number>
                    <li v-else-if="sku.status == 1">{{sku.price | currency}}</li>
                  </td>
                  <td rowspan="1" colspan="1">
                    <el-input-number v-model="sku.distributionProfit" :min="0" v-if="sku.status != 1" size="samll" :precision="2" placeholder="请输入可分配利润" controls-position="right"></el-input-number>
                    <li v-else-if="sku.status == 1">{{sku.distributionProfit | currency}}</li>
                  </td>
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
          <el-button @click="saveGoodsDraft">保存草稿</el-button>
          <el-button type="primary" @click="validateSave">保存</el-button>
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
    border-bottom:1px solid #ebeef5;
  }
  .has-gutter th{
    line-height: 20px
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
  [ "image"] // 链接、图片、视频
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
                  if (value) {
                    // 触发input框选择图片文件
                    document.querySelector(".avatar-uploader input").click();
                  } else {
                    this.quill.format("image", false);
                  }
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
           document.querySelector(".ql-toolbar .ql-formats .ql-image").style="display:none;";
           document.querySelector(".ql-toolbar").style="border-bottom: 0px;";
           document.querySelectorAll(".upload-demo .el-upload").forEach(item =>{
            item.style.display = "none";
           });
        }
      },
      returnBack() {
        if (this.skuId != "" && this.skuId != null) {
          this.$router.push({
            path: `${process.env.PATH_ROUTER}/goods/skuList`
          })
        } else {
          this.$router.push({
            path: `${process.env.PATH_ROUTER}/goods/goodsList`
          })
        }
      },
      saveGoodsDraft() {
        this.result.isDraft = 1;
        this.saveGoods();
      },
      validateSave() {
        this.$refs.result.validate((valid) => {
          if (valid) {
            if(this.result.warehouse.length==0){
              this.$message({
                message: '请选择仓库',
                type: 'error'
              })
              return
            }
            if (!(this.result.mainFile.length > 0 && this.result.mainFile[0].url!=null)) {
              this.$message({
                message: '请选商品主图',
                type: 'error'
              })
              return
            }
            if(this.result.goodsFile.length===0){
              this.$message({
                message: '请选商品详情图',
                type: 'error'
              })
              return
            }
            if(this.result.spec.length == 0){
               this.$message({
                  message: '请添加规格',
                  type: 'error'
               })
               return;
            }
            let flag = false
            this.result.spec.forEach(item =>{
              if(item.specValue=='' || item.specValue==null){
                flag = true;
                this.$message({
                  message: '请选择'+item.spec,
                  type: 'error'
                })
                return
              }
            });
            this.result.sku.forEach(item =>{
              if(item.dummyStock == null){
                flag = true;
                this.$message({
                  message: '请输入虚拟库存',
                  type: 'error'
                })
                return
              }
              if(item.price==null){
                flag = true;
                this.$message({
                  message: '请输入售价',
                  type: 'error'
                })
                return
              }
              if(item.distributionProfit==null){
                flag = true;
                this.$message({
                  message: '请输入可分配利润',
                  type: 'error'
                })
                return
              }
            })
            if(flag){
              return;
            }

            this.result.isDraft = 2;
            this.saveGoods();
          }
        })
      },

      saveGoods() {
      this.skuSpecOrder();
        let param = this.result
        api.post('controller/goods/saveGoods', param).then((result) => {
          let _result = result.data
          if (_result.resCode === SUCCESS_CODE) {
            if (this.skuId != "" && this.skuId != null) {
              this.$router.push({
                path: `${process.env.PATH_ROUTER}/goods/skuList`
              })
            } else {
              this.$router.push({
                path: `${process.env.PATH_ROUTER}/goods/goodsList`
              })
            }
          } else {
            this.$message({
              message: _result.resDesc,
              type: 'error'
            })
          }
        })
      },
      beforeVideoUpload(file) {
        let isVideo = false
        if (!(file.type === 'video/mp4')) {
          this.$message({
            message: '上传视频暂时只支持mp4格式',
            type: 'error'
          })
          this.$emit('closeEditUpload');
        } else if (!(Math.ceil(file.size / 1024) <= 2048)) {
          this.$message({
            message: '上传视频大小不能超过2MB',
            type: 'error'
          })
          this.$emit('closeEditUpload');
        }else {
          isVideo = true
        }
        if(isVideo){
          if(this.result.goodsVideo !==undefined && this.result.goodsVideo.length>0 && this.result.goodsVideo[0].url!==null){
            isVideo = false
            this.$message({
              message: '视频只能上传一个！',
              type: 'error'
            })
          }
        }
        return isVideo
      },
      errorVideo(file){
          this.$message({
            message: '只能上传1个视频',
            type: 'error'
          })
      },
      errorMainFile(file){
          this.$message({
            message: '只能上传1张主图',
            type: 'error'
          })
      },
      removeVideoFile(file) {
        this.result.goodsVideo[0].url = null
      },
      uploadVideoCallBack(response) {//上传视频回调
        if (response.resCode === SUCCESS_CODE) {
          let json = {
            url: response.data,
            imageType:'2',
            type:'3'
          }
          if (this.result.goodsVideo.length > 0) {
              this.result.goodsVideo[0].url = response.data
          } else {
              let json = {
                url: response.data,
                imageType: 2,
                type: 3
              }
            this.result.goodsVideo.push(json)
          }
        } else {
          this.$message({
            message: _result.resDesc,
            type: 'error'
          })
        }
      },
      removeMainFile(file) {
        this.result.mainFile[0].url = null;
      },
      removeFile(file) {
        this.result.goodsFile.forEach((item, index) => {
          if (item.url == file.url) {
            this.result.goodsFile.splice(index, 1)
            return true
          }
        })
      },
      beforeUpload(file) {
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
      uploadMainCallBack(response) {
        if (response.resCode === SUCCESS_CODE) {
          if (this.result.mainFile.length > 0) {
            this.result.mainFile[0].url = response.data
          } else {
            let json = {
              url: response.data,
              imageType: 1,
              type: 1
            }
            this.result.mainFile.push(json)
          }
        } else {
          this.$message({
            message: response.resDesc,
            type: 'error'
          })
        }
      },
      uploadCallBack(response) {
        if (response.resCode === SUCCESS_CODE) {
          let json = {
            url: response.data,
            imageType: 1,
            type: 2
          }
          this.result.goodsFile.push(json)
        } else {
          this.$message({
            message: _result.resDesc,
            type: 'error'
          })
        }
      },
      skuSpecOrder(){
        this.result.spec.forEach(item =>{
          this.specList.forEach(it =>{
            if(item.spec == it.value){
              item.specOrder = it.specOrder;
              it.child.forEach(i =>{
                if(item.specValue == i.value){
                    item.specValueOrder = i.specValueOrder
                }
              })
            }
          })
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
         let index = 0;
        specList.forEach(item =>{
          let json = {value: item,child:[],specOrder:++index}
          this.specList.push(json)
        })
        for(let i= 0;i<specValueList.length;i++){
          for(let x=0;x<this.specList.length;x++){
              if(specValueList[i].name==this.specList[x].value){
                  let y = 0
                  if(this.specList[x].child.length>0){
                    y = this.specList[x].child[this.specList[x].child.length-1].specValueOrder
                  }
                  if(this.result.onLine==1){
                    let specValue = {id:1,value:specValueList[i].value,specValueOrder:y+1}
                    this.specList[x].child.push(specValue)
                  }else{
                    let specValue = {id:2,value:specValueList[i].value,specValueOrder:y+1}
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
      addSpec() {
        let x = 0
        if(this.specList.length>0){
            x = this.specList[this.specList.length-1].specOrder
        }
        let json = {value: '',child:[],specOrder:x+1}
        this.specList.push(json)
        this.changeSpec(json);
      },
      changeSpec(spec) {
        if(spec.value!=''){
          let flag = true;
          this.specList.forEach(item =>{
            if(item != spec && spec.value == item.value){
              flag = false;
            }
          });
          if(flag){
            this.result.sku.forEach(item => {
              let specValue = {
                skuId: item.id,
                spec: spec.value,
                specValue: ''
              }
              this.result.spec.push(specValue)
            })
          }else{
            spec.value = '';
            this.$message({
              message: "规格不能重复",
              type: 'error'
            })
          }
        }
        this.delSkuSpec();
      },

      delSkuSpec() {
        for (let i = 0; i < this.result.spec.length; i++) {
          let flag = true
          this.specList.forEach(item => {
            if (item.value == this.result.spec[i].spec || item.value=='') {
              flag = false
            }
          })
          if (flag) {
            this.result.spec.splice(i, 1)
            i--
          }
        }
        console.log(this.result.spec)
      },
      addSpecValue(sp) {
        this.specList.forEach(item =>{
          if (item == sp){
            let x = 0;
            if(item.child.length>0){
              x = item.child[item.child.length-1].specValueOrder
            }
            let specValue = {id:2,value:'',specValueOrder:x+1}
            item.child.push(specValue);
          }
        });
      },
      delSpec(index) {
        this.specList.splice(index,1);
        this.delSkuSpec();
      },
      delSpecValue(spec,specIndex) {
        this.specList.forEach((item, index) =>{
          if(item == spec){
            item.child.splice(specIndex,1);
          }
        })
      },
      init() {
        api.get('controller/goods/getGoodsById', {params: {"id": this.id, "skuId": this.skuId}}).then((result) => {
          let _result = result.data
          if (_result.resCode === SUCCESS_CODE) {
            this.result = util.simpleClone(_result.data);
            this.spec();
            this.removeImg();
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
        if(this.result.onLine==1){
           editor.enable(false);
        }
      },
      onEditorFocus(editor) {
        //获得焦点事件
        if(this.result.onLine==1){
           editor.enable(false);
        }
      },
      onEditorChange({editor, html, text}) {
        //内容改变事件
         this.$emit("input", this.content);
      },
      // 富文本图片上传前
      beforeEditorUpload(file) {
        let isJPG = false
        if(this.result.onLine == 1){
          this.$message({
              message: '不能编辑图片',
              type: 'error'
          })
          return false
        }
        if (!(file.type === 'image/jpeg'||file.type === 'image/png')) {
          this.$message({
              message: '上传图片暂时只支持jpg/png格式',
              type: 'error'
          })
          this.$emit('closeEditUpload');
        }else if (!(Math.ceil(file.size/1024) <= 1024)) {
          this.$message({
            message: '上传图片大小不能超过1MB',
            type: 'error'
          })
          this.$emit('closeEditUpload');
        }else{
          isJPG = true
        }
        if(isJPG){
          // 显示loading动画
          this.quillUpdateImg = true;
        }

        return isJPG
      },
      uploadSuccess(res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        let quill = this.$refs.myQuillEditor.quill;
        // 如果上传成功
        if (res.resCode == SUCCESS_CODE) {
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片  res.url为服务器返回的图片地址
          quill.insertEmbed(length, "image", res.data);
          // 调整光标到最后
          quill.setSelection(length + 1);
        } else {
          this.$message.error("图片插入失败");
        }
        // loading动画消失
        this.quillUpdateImg = false;
      },
      // 富文本图片上传失败
      uploadError() {
        // loading动画消失
        this.quillUpdateImg = false;
        this.$message.error("图片插入失败");
      }
    }
  }
</script>

<style lang="less">
.editor {
  line-height: normal !important;
  height: 500px!important;
  border-bottom: 1px solid #ccc;
  padding-bottom: 41px;

}
.editor .ql-editor p img {
  vertical-align: middle;

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
