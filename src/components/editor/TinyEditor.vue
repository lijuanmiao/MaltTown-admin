<template>
  <div>
    <tinymce id="editorId" v-model="editorId" :options="options" :content='content'></tinymce>
  </div>
</template>
<script>
import 'tinymce/skins/lightgray/skin.min.css'
  import 'tinymce/skins/lightgray/content.min.css'
  import 'tinymce/plugins/codesample/css/prism.css'
  import tinymce from 'tinymce'
  import 'ivan-chkv.tinymce-i18n/langs/zh_CN'
  import 'tinymce/themes/modern/theme'
  import 'tinymce/plugins/advlist'
  import 'tinymce/plugins/autolink'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/charmap'
  import 'tinymce/plugins/print'
  import 'tinymce/plugins/preview'
  import 'tinymce/plugins/hr'
  import 'tinymce/plugins/anchor'
  import 'tinymce/plugins/pagebreak'
  import 'tinymce/plugins/searchreplace'
  import 'tinymce/plugins/wordcount'
  import 'tinymce/plugins/visualblocks'
  import 'tinymce/plugins/visualchars'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/fullscreen'
  import 'tinymce/plugins/insertdatetime'
  import 'tinymce/plugins/media'
  import 'tinymce/plugins/nonbreaking'
  import 'tinymce/plugins/save'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/contextmenu'
  import 'tinymce/plugins/directionality'
  import 'tinymce/plugins/emoticons'
  import 'tinymce/plugins/template'
  import 'tinymce/plugins/paste'
  import 'tinymce/plugins/textcolor'
  import 'tinymce/plugins/colorpicker'
  import 'tinymce/plugins/textpattern'
  import 'tinymce/plugins/imagetools'
  import 'tinymce/plugins/toc'
  
  let toolsMenus = [ 'advlist autolink lists link image  charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern imagetools toc' ]
  export default {
    name: 'TinyEditor',
    props: ['id', 'width','height', 'toolsMenu', 'value'],
    data () {
      return {
        editorId: this.id ? this.id : ('editor_' + (Math.random() * 100000000000000000)),
        content: this.value ? this.value : '',
        options:{
          language: false,
          plugins: this.toolsMenu ? this.toolsMenu : toolsMenus,
          width: this.width ? this.width : '100%',
          height: this.height ? this.height : '200px',
          statusbar: false,
          image_upload: true,
          skin: false
        }
      }
    }
  }
</script>
