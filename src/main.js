import Vue from 'vue'
import i18n from './locale/lang'
import router from './router'
import store from './store/store'
import axiosApi from './config/axios-config'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/common-2.css'
import 'font-awesome/css/font-awesome.min.css'
import Permissions from './directive/permissions'
import MyComponents from './components'
import VueTinymce from 'vue-tinymce'
import Mock from './mock'
import VueClipboard from 'vue-clipboard2'
import fullCalendar from 'vue-fullcalendar'
import BaiduMap from 'vue-baidu-map'


// Mock.bootstrap()
Vue.use(ElementUI)
Vue.use(Permissions)
Vue.use(MyComponents)
Vue.use(VueTinymce)
Vue.component('full-calendar', fullCalendar)
Vue.use(BaiduMap, {
    ak:'h4UUj8HbjT8CzK5rmVX7jhhdVoCDc6ba'
})
Vue.use(VueClipboard)//复制到剪切板组件
// 开启debug模式
Vue.config.debug = true
Vue.prototype.$http = axiosApi
let data = {
    el: '#app',
    i18n,
    router,
    store
}

new Vue(data).$mount('#app')
