
import Pagination from './base/pagination'
import Breadcrumb from './base/breadcrumb'
import TableButton from './base/tableButton'
import CountDown from './base/countDown'
import PhoneView from './phone/phoneView'
import NavMenus from './phone/navMenus'
import UrlLoad from './phone/urlLoad'
import TinyEditor from './editor/TinyEditor'
import QrCode from './qrCode/qrCode'
import CoursePlan from './coursePlan/coursePlan'
import VueWangeditor from './editor/wangEditor/editor'

function plugin (Vue) {
  if (plugin.installed) return
  Vue.component('Pagination', Pagination)
  Vue.component('Breadcrumb', Breadcrumb)
  Vue.component('TableButton', TableButton)
  Vue.component('CountDown', CountDown)
  Vue.component('NavMenus', NavMenus)
  Vue.component('PhoneView', PhoneView)
  Vue.component('UrlLoad', UrlLoad)
  Vue.component('TinyEditor', TinyEditor)
  Vue.component('QrCode', QrCode)
  Vue.component('CoursePlan', CoursePlan)
  Vue.component('VueWangeditor', VueWangeditor)
}

export default plugin

