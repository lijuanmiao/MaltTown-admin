## 麦芽小镇-管理台 ##
> 麦芽小镇-管理台
## 运行环境 ##
>  
>  1. 全局安装 vue-cli  
> `$ npm install vue-cli -g`
>  2. 全局安装 webpack  
> `$ npm install webpack -g`
>  3. 安装依赖库
> `$ npm install`
> 4. 安装 vue-quill-editor
> `npm install vue-quill-editor -g `

新增菜单：
在  ./src/router.js 配置具体的路由。 

## 项目运行 ##
>  1. 开发环境，项目将运行在 `http:127.0.0.1:9000`  
> `$ npm run dev` 
>  2. 生产打包，打包目录 build  
> `$ npm run build`

## 集成环境 ##
>  2. mock 方便前期的接口对接模拟开发
>  3. elementUI 集成elementUI组件库
>  4. 集成其他后续补充

let arg = {
  queryParam: this.QUERY_FORM,
  customAct: 'exportUrl',
  callback: 'export',
  message: false,
  reLoad: false
}
this.customGet(arg)

let arg = {
  postParam: param,
  customAct: _customAct,
  callback: 'ReasonSave',
  message: false,
  reLoad: false
}
this.customPost(arg)

//日期个格式 转elementui 格式
this.DIALOG_FORM.dateTime = [new Date(this.DIALOG_FORM.validityPeriodStartDate + ' 00:00:00'), new Date(this.DIALOG_FORM.validityPeriodEndDate + ' 00:00:00')]



