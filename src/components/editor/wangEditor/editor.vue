<template lang="html">
  <div :id="id"></div>
</template>

<script>
import E from 'wangeditor'
import './editor.css'
import { fullscreen } from './plugins/fullscreen'
import { clearStyle } from './plugins/clearStyle'
import { clearFormat } from './plugins/clearFormat'
import { clearAll } from './plugins/clearAll'
import { insertCode } from './plugins/insertCode'
export default {
  name: 'VueWangeditor',
  mixins: [fullscreen, clearStyle, clearFormat, clearAll, insertCode],
  props: {
    options: {
      type: Object,
      default:  _ => { 
        return {
          width: '115%',
          menus: [
            'bold',  // 粗体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'image',  // 插入图片
            'table',  // 表格
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'fontName',  // 字体
            'fontSize',  // 字号
            'head',  // 标题
            // 'undo',  // 撤销
            // 'redo',  // 重复
            // 'fullscreen' // 全屏
          ]
        } 
      }
    },
    id: String,
    initContent: String,
    value: String,
    upload: String
  },
  data () {
    return {
      editor: {}
    }
  },
  watch: {
    initContent (val) {
      if(val==null||val==undefined){
        val=''
      }
      this.editor.txt.html(val)
    }
  },
  computed: {
    editorEle () {
      if (document.querySelector(`#${this.id}`)) {
        return document.querySelector(`#${this.id}`)
      }
    },
    toolbar () {
      if (document.querySelector(`#${this.id} .w-e-toolbar`)) {
        return document.querySelector(`#${this.id} .w-e-toolbar`)
      }
    },
    container () {
      if (document.querySelector(`#${this.id} .w-e-text-container`)) {
        return document.querySelector(`#${this.id} .w-e-text-container`)
      }
    },
    textWrap () {
      if (document.querySelector(`#${this.id} .w-e-text`)) {
        return document.querySelector(`#${this.id} .w-e-text`)
      }
    }
  },
  methods: {
    createBtn (btnHtml) {
      let btn = document.createElement('div')
      btn.className = 'w-e-menu'
      btn.style.zIndex = '10001'
      btn.innerHTML = btnHtml
      return btn
    },
    initSize () {
      if (this.options.width) {
        this.container.style.width = this.options.width
        this.toolbar.style.width = this.options.width
      }
      if (this.options.height) {
        this.container.style.height = this.options.height
      }
    }
  },
  mounted () {
    this.editor = new E('#' + this.id)

    // init change event
    this.editor.customConfig.onchange = html => {
      this.$emit('input', html)
      this.$emit('update:text', this.editor.txt.text())
    }
    this.editor.customConfig.uploadImgServer = this.upload; //上传URL
    this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
    this.editor.customConfig.uploadImgMaxLength = 5;    
    this.editor.customConfig.uploadFileName = 'file';
    this.editor.customConfig.uploadImgHooks = {
        customInsert: function (insertImg, result, editor) {
                    // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                    // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
                    // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                    if (result.resCode === '0000') {
                       var url =result.data.url;
                       insertImg(url);
                    }else {
                      alert(result.resDesc)
                    }
                    // result 必须是一个 JSON 格式字符串！！！否则报错
                }
    }
    // init props options
    Object.keys(this.options).map(property => {
      this.editor.customConfig[property] = this.options[property]
    })

    // create the editor
    this.editor.create()

    this.initSize()

    // clearStyle
    if (this.options.menus && this.options.menus.includes('clearStyle')) {
      this.initClearStyle()
    }

    // clearFormat
    if (this.options.menus && this.options.menus.includes('clearFormat')) {
      this.initClearFormat()
    }

    // clearAll
    if (this.options.menus && this.options.menus.includes('clearAll')) {
      this.initClearAll()
    }

    // insertCode
    if (this.options.menus && this.options.menus.includes('insertCode')) {
      this.initInsertCode()
    }

    // fullscreen
    if (this.options.menus && this.options.menus.includes('fullscreen')) {
      this.initFullscreen()
    }
    this.editor.txt.html(this.initContent)
  }
}
</script>
