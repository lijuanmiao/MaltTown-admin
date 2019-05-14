<template>
<div class='theme-box':style="{'backgroundColor': color}">
  <div class='theme-title'>切换皮肤</div>
  <div>
    <el-input  size="mini" type="color" :value="color" @change='colorChange'></el-input >
  </div>
  <div @click="switchLang('zh')" class='langs'>中文</div>
  <div @click="switchLang('en')" class='langs'>英文</div>
</div>
</template>

<script>
import Color from 'color'
import locale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
export default {
  props: [ 'color' ],
  data () {
    return {
      originalStyle: '',
      originalStylesheetCount:'',
      colors: {
          primary: this.color,
          lightPrimary: '',
          darkPrimary: '',
          info: '',
          success: '',
          warning: '',
          danger: '',
          baseBlack: '',
          baseWhite: '',
          black: '',
          lightBlack: '',
          extraLightBlack: '',
          silver: '',
          lightSilver: '',
          extraLightSilver: '',
          gray: '',
          lightGray: '',
          extraLightGray: '',
          darkWhite: ''
      },
      styleFiles: []
    }
  },
  methods: {
    primary () {
      this.buildDarkPrimary()
      this.buildLightPrimary()
      this.buildBlack()
      this.buildSilver()
      this.buildGray()
      this.buildDarkWhite()
    },
    baseWhite () {
      this.buildDarkWhite()
    },
    black () {
      this.buildLightBlack()
      this.buildExtraLightBlack()
      this.buildLightSilver()
      this.buildExtraLightSilver()
      this.buildLightGray()
      this.buildExtraLightGray()
    },
    buildDarkPrimary () {
      const hsl = Color(this.colors.primary).hsl()
      hsl.color[1] = 99
      hsl.color[2] = hsl.color[2] * 0.9
      this.colors.darkPrimary = hsl.hex().toString()
    },
    buildLightPrimary () {
      const hsl = Color(this.colors.primary).hsl()
      hsl.color[1] = 99
      hsl.color[2] = hsl.color[2] * 1.19
      this.colors.lightPrimary = hsl.hex().toString()
    },
    buildBlack () {
      const hsl = Color(this.colors.primary).hsl()
      hsl.color[0] += 6
      hsl.color[1] = 33
      hsl.color[2] = 18
      this.colors.black = hsl.hex().toString()
    },
    buildLightBlack () {
      const hsl = Color(this.colors.black).hsl()
      hsl.color[0] += 5
      hsl.color[1] = 27
      hsl.color[2] = 27
      this.colors.lightBlack = hsl.hex().toString()
    },
    buildExtraLightBlack () {
      const hsl = Color(this.colors.black).hsl()
      hsl.color[0] += 2
      hsl.color[1] = 19
      hsl.color[2] = 35
      this.colors.extraLightBlack = hsl.hex().toString()
    },
    buildSilver () {
      const hsl = Color(this.colors.primary).hsl()
      hsl.color[0] += 3
      hsl.color[1] = 16
      hsl.color[2] = 58
      this.colors.silver = hsl.hex().toString()
    },
    buildLightSilver () {
      const hsl = Color(this.colors.black).hsl()
      hsl.color[0] += 3
      hsl.color[1] = 23
      hsl.color[2] = 67
      this.colors.lightSilver = hsl.hex().toString()
    },
    buildExtraLightSilver () {
      const hsl = Color(this.colors.black).hsl()
      hsl.color[0] += 0
      hsl.color[1] = 26
      hsl.color[2] = 80
      this.colors.extraLightSilver = hsl.hex().toString()
    },
    buildGray () {
      const hsl = Color(this.colors.primary).hsl()
      hsl.color[0] += 0
      hsl.color[1] = 28
      hsl.color[2] = 86
      this.colors.gray = hsl.hex().toString()
    },
    buildLightGray () {
      const hsl = Color(this.colors.black).hsl()
      hsl.color[0] += 10
      hsl.color[1] = 33
      hsl.color[2] = 92
      this.colors.lightGray = hsl.hex().toString()
    },
    buildExtraLightGray () {
      const hsl = Color(this.colors.black).hsl()
      hsl.color[0] += 6
      hsl.color[1] = 33
      hsl.color[2] = 95
      this.colors.extraLightGray = hsl.hex().toString()
    },
    buildDarkWhite () {
      this.colors.darkWhite = Color(this.colors.baseWhite).mix( Color(this.colors.primary), 0.98).hex().toString()
    },
    colorChange(colordatas){
      this.colors.primary=colordatas
      this.primary()
      this.baseWhite()
      this.black()
      this.writeNewStyle()
      var callBackData={
        bgColor:colordatas,
        fontColor:this.colors.extraLightBlack
      }
      this.$emit('colorChange', callBackData)
      localStorage.setItem('themeColor', colordatas);
    },
    writeNewStyle() {
        let cssText = this.originalStyle;
        Object.keys(this.colors).forEach(key => {
          cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + this.colors[key]);
        });
        if (this.originalStylesheetCount === document.styleSheets.length) {
          const style = document.createElement('style');
          style.innerText = cssText;
          document.head.appendChild(style);
        } else {
          document.head.lastChild.innerText = cssText;
        }
    },
    getStyleTemplate(data) {
        const colorMap = {
          '#20a0ff': 'primary',
          '#0190fe': 'secondary',
          '#fbfdff': 'darkWhite',
          '#1f2d3d': 'baseBlack',
          '#324157': 'lightBlack',
          '#48576a': 'extraLightBlack',
          '#8391a5': 'baseSilver',
          '#97a8be': 'lightSilver',
          '#bfcbd9': 'extraLightSilver',
          '#d1dbe5': 'baseGray',
          '#e4e8f1': 'lightGray',
          '#eef1f6': 'extraLightGray',
          '#1d90e6': 'buttonActive',
          '#4db3ff': 'buttonHover',
          '#dfe6ec': 'tableBorder',
          '#d2ecff': 'datepickerInRange',
          '#afddff': 'datepickerInRangeHover',
          '#1c8de0': 'selectOptionSelected',
          '#edf7ff': 'lightBackground',
          'fonts/': '//unpkg.com/element-ui@1.2.8/lib/theme-default/fonts/'
          
        };
        Object.keys(colorMap).forEach(key => {
          const value = colorMap[key];
          // console.log(key)
          // console.log(value)
          data = data.replace(new RegExp(key, 'ig'), value)
        });
        // console.log(data)
        return data
      },
    getFile(url, isBlob = false) {
        return new Promise((resolve, reject) => {
          const client = new XMLHttpRequest();
          client.responseType = isBlob ? 'blob' : '';
          client.onreadystatechange = () => {
            if (client.readyState !== 4) {
              return
            }
            if (client.status === 200) {
              const urlArr = client.responseURL.split('/')
              resolve({
                data: client.response,
                url: urlArr[urlArr.length - 1]
              })
            } else {
              reject(new Error(client.statusText));
            }
          };
          client.open('GET', url)
          client.send()
        });
    },
    getIndexStyle() {
        this.getFile('//unpkg.com/element-ui@1.2.8/lib/theme-default/index.css')
          .then(({ data }) => {
            this.originalStyle = this.getStyleTemplate(data)
            this.colorChange(this.color)
          })
    },
    getSeparatedStyles() {
      this.getFile('//unpkg.com/element-ui@1.2.8/lib/theme-default')
        .then(({ data }) => {
          return data.match(/href="[\w-]+\.css"/g).map(str => str.split('"')[1])
        })
        .then(styleFiles => {
          return Promise.all(styleFiles.map(file => {
            return this.getFile(`//unpkg.com/element-ui@1.2.8/lib/theme-default/${ file }`)
          }))
        })
        .then(files => {
          this.styleFiles = files.map(file => {
            return {
              name: file.url,
              data: this.getStyleTemplate(file.data)
            }
          })
        })
      },
      getFontFiles() {
        Promise.all(this.fontFiles.map(font => {
          return this.getFile(`//unpkg.com/element-ui/lib/theme-default/fonts/${ font }`, true);
        }))
          .then(fonts => {
            this.fonts = fonts
          })
      },
      switchLang(lang){
        localStorage.setItem('lang', lang)
        this.$i18n.locale=lang
        if (lang === 'en') 
          locale.use(enLocale)
        if (lang === 'zh')
          locale.use(zhLocale)
      }
  },
  created() {
      this.getIndexStyle()
      this.getSeparatedStyles()
  },
  mounted() {
    this.$nextTick(_ => {
      this.originalStylesheetCount = document.styleSheets.length
    })
  }
}
</script>
<style scoped lang="less">
  .theme-box {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    padding:10px 20px;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
    .theme-title{
      margin-bottom: 10px;
      color: #fff;
    }
    .langs{
      cursor: pointer;
      padding: 5px;
      color: #fff;
    }
  }
</style>
