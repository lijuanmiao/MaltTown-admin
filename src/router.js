import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import App from './App'
import Index from './views/index'
import Login from './views/login'
import ErrorPage from './views/error'
import user from './views/user'
import  UserInterestsSet from './views/yunying'

import System from './views/system'
import Banner from './views/banner'//banner
import Binding from './views/binding'//绑定管理
import Demo from './views/demo'

import Goods from './views/goods'

//订单模块
import Order from './views/order'


//发货收货仓模块
import Warehouse from './views/warehouse'

//发货收货仓模块
import CustomerService from './views/customerService'


//提现管理
import Withdrawal from './views/withdrawal'


Vue.use(VueRouter)

const routes = [{
  path: '', name: '', component: App, children: []
},
  {path: `${process.env.PATH_ROUTER}/login`, name: '登录', component: Login}
]

// 首页/工作台
let IndexPage = {
  path: `${process.env.PATH_ROUTER}/index`,
  name: 'lang.sidebar.text00000',
  iconCls: 'fa fa-home',
  hidden: false,
  component: Index
}

let mainMenu = []
mainMenu.push(IndexPage)

mainMenu.push(System.MENU)//系统
mainMenu.push(Banner.MENU)//广告管理
mainMenu.push(UserInterestsSet.MENU)
mainMenu.push(Binding.MENU)//绑定管理  -》待删除
//mainMenu.push(Demo.MENU)
mainMenu.push(user.MENU)//test
mainMenu.push(Goods.MENU) //商品管理

mainMenu.push(Order.MENU) //订单

mainMenu.push(Warehouse.MENU) //发货收货仓

mainMenu.push(CustomerService.MENU) //发货收货仓

mainMenu.push(Withdrawal.MENU) //提现管理

// 设置 错误页面
mainMenu.push(ErrorPage.MENU)

routes[0].children = mainMenu


const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(transition => {
  NProgress.done()
})

window.router = router

export default router
