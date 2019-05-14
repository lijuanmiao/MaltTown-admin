import Abstract from '../common/abstract'

import ApplyList from './applyList'

import Detail from './detail'

import closeDetail from './closedDetail'
import completedDetail from './completedDetail'
import receivedDetail from './receivedDetail'
import shippedDetail from './shippedDetail'


const MENU = {
  path: `${process.env.PATH_ROUTER}/customerService`,
  name: 'lang.sidebar.text_CS00000',
  iconCls: 'fa fa-gift',
  hidden: false,
  permissions: 'CS000000',
  component: Abstract,
  children: [
    {
      path: `${process.env.PATH_ROUTER}/customerService/applyList`,
      name: 'lang.sidebar.text_CS00100',
      iconCls: 'fa fa-calculator',
      hidden: false,
      permissions: 'CS000100',
      component: ApplyList
    },
    {
      path: `${process.env.PATH_ROUTER}/customerService/detail`,
      name: 'lang.sidebar.text_CS00100',
      iconCls: 'fa fa-calculator',
      hidden: true,
      permissions: 'CS000102',
      component: Detail
    },
    {
      path: `${process.env.PATH_ROUTER}/customerService/closedDetail`,
      name: 'lang.sidebar.text_CS0020201',
      iconCls: 'fa fa-calculator',
      hidden: true,
      permissions: 'CS000202',
      component: closeDetail
    },
    {
      path: `${process.env.PATH_ROUTER}/customerService/completedDetail`,
      name: 'lang.sidebar.text_CS0020202',
      iconCls: 'fa fa-calculator',
      hidden: true,
      permissions: 'CS000202',
      component: completedDetail
    },
    {
      path: `${process.env.PATH_ROUTER}/customerService/receivedDetail`,
      name: 'lang.sidebar.text_CS0020203',
      iconCls: 'fa fa-calculator',
      hidden: true,
      permissions: 'CS000202',
      component: receivedDetail
    },
    {
      path: `${process.env.PATH_ROUTER}/customerService/shippedDetail`,
      name: 'lang.sidebar.text_CS0020204',
      iconCls: 'fa fa-calculator',
      hidden: true,
      permissions: 'CS000202',
      component: shippedDetail
    },


  ]
}

export default { MENU }
