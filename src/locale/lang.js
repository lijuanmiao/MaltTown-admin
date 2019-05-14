import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
let lang = 'zh'
let localStorage = window.localStorage
if (localStorage.getItem('lang') !== '' && localStorage.getItem('lang') !== null) {
  lang = localStorage.getItem('lang')
} else {
  if (navigator.userLanguage) {
    lang = navigator.userLanguage.substring(0, 2).toLowerCase()
  } else {
    lang = navigator.language.substring(0, 2).toLowerCase()
  }
  localStorage.setItem('lang', lang)
}
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: lang,    // 语言标识
  messages: {
    'zh': require('./lang/zh-CN.js'),
    'en': require('./lang/en-US.js')
  }
})
locale.use(lang === 'zh' ? zhLocale : enLocale)
window.i18n = i18n
export default i18n
