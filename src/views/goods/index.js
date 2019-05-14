import Abstract from '../common/abstract'

import categoryList from './categoryList'
import brandList from './brandList'
import goodsList from './goodsList'
import skuList from './skuList'
import goodsView from './goodsView'
import skuView from './skuView'
import goodActivity from '../activity/goodActivity'

const MENU = {
  path: `${process.env.PATH_ROUTER}/goods`,
  name: 'lang.sidebar.text_GOOD000',
  iconCls: 'fa fa-wrench',
  hidden: false,
  permissions: 'WF030000',
  component: Abstract,
  children: [
    {
      path: `${process.env.PATH_ROUTER}/goods/brandList`,
      name: 'lang.sidebar.text_GOOD003',
      iconCls: 'fa fa-circle-o',
      hidden: false,
      permissions: 'WF030300',
      component: brandList
    },{
      path: `${process.env.PATH_ROUTER}/goods/goodsList`,
      name: 'lang.sidebar.text_GOOD004',
      iconCls: 'fa fa-circle-o',
      hidden: false,
      permissions: 'WF030400',
      component: goodsList
    },{
      path: `${process.env.PATH_ROUTER}/goods/goodsView`,
      name: 'lang.sidebar.text_GOOD006',
      iconCls: 'fa fa-circle-o',
      hidden: true,
      permissions: 'WF030401',
      component: goodsView
    },{
      path: `${process.env.PATH_ROUTER}/goods/skuList`,
      name: 'lang.sidebar.text_GOOD005',
      iconCls: 'fa fa-circle-o',
      hidden: false,
      permissions: 'WF030500',
      component: skuList
    },{
      path: `${process.env.PATH_ROUTER}/goods/activity`,
      name: 'lang.sidebar.text_GOOD100',
      iconCls: 'fa fa-circle-o',
      hidden: false,
      permissions: 'SP010000',
      component: goodActivity
    },{
      path: `${process.env.PATH_ROUTER}/goods/skuView`,
      name: 'lang.sidebar.text_GOOD007',
      iconCls: 'fa fa-circle-o',
      hidden: true,
      permissions: 'WF030500',
      component: skuView
    }
  ]
}

export default { MENU }
