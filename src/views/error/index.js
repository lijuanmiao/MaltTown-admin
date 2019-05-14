import Abstract from '../common/abstract'
import E403 from './e403'
import E404 from './e404'
import E500 from './e500'

const MENU = {path: '/error', name: '错误页面', iconCls: 'el-icon-menu', hidden: true, component: Abstract, children: [
  {path: '/error/403', name: '无权限', component: E403},
  {path: '/error/404', name: '页面找不到', component: E404},
  {path: '/error/500', name: '系统错误', component: E500}]
}

export default {MENU}
