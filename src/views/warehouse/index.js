import Abstract from '../common/abstract'

import WHAddressList from './whAddressList'

import WHDetail from './warehouseDetail'
import WHClassify from './whClassify'



const MENU = {
  path: `${process.env.PATH_ROUTER}/warehouse`,
  name: 'lang.sidebar.text_WH00000',
  iconCls: 'fa fa-gift',
  hidden: false,
  permissions: 'WH000000',
  component: Abstract,
  children: [
    {
      path: `${process.env.PATH_ROUTER}/warehouse/whAddressList`,
      name: 'lang.sidebar.text_WH00100',
      iconCls: 'fa fa-calculator',
      hidden: false,
      permissions: 'WH000100',
      component: WHAddressList
    },
    {
      path: `${process.env.PATH_ROUTER}/warehouse/warehouseDetail`,
      name: 'lang.sidebar.text_WH00101',
      iconCls: 'fa fa-calculator',
      hidden: true,
      permissions: 'WH000101',
      component: WHDetail
    },
    {
      path: `${process.env.PATH_ROUTER}/warehouse/whClassify`,
      name: 'lang.sidebar.text_WH00200',
      iconCls: 'fa fa-calculator',
      hidden: false,
      permissions: 'WH000200',
      component: WHClassify
    }
  ]
}

export default { MENU }
