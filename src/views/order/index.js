import Abstract from '../common/abstract'

import OrderTobeshipped from './tobeshipped'
import OrderTobereceived from './tobereceived'
import OrderTobespay from './tobespay'
import OrderCompleted from './completed'
import OrderClosed from './closed'
import OrderRecyclebin from './recyclebin'
import OrderOrderAll from './all'

import shippedDetail from './shippedDetail'
import receivedDetail from './receivedDetail'
import toPayDetail from './toPayDetail'
import completedDetail from './completedDetail'
import closedDetail from './closedDetail'
import recycleDetail from './recycleDetail'
import allDetail from './allDetail'

const MENU = {
  path: `${process.env.PATH_ROUTER}/order`,
  name: 'lang.sidebar.text_DD00000',
  iconCls: 'fa fa-gift',
  hidden: false,
  permissions: 'DD000000',
  component: Abstract,
  children: [
    {
      path: `${process.env.PATH_ROUTER}/order/tobepay`,
      name: 'lang.sidebar.text_DD00300',
      iconCls: 'fa fa-calculator',
      hidden: false,
      permissions: 'DD030000',
      component: OrderTobespay
    },
    {
      path: `${process.env.PATH_ROUTER}/order/tobeshipped`,
      name: 'lang.sidebar.text_DD00100',
      iconCls: 'fa fa-calculator',
      hidden: false,
      permissions: 'DD010000',
      component: OrderTobeshipped
    },
    {
      path: `${process.env.PATH_ROUTER}/order/tobereceived`,
      name: 'lang.sidebar.text_DD00200',
      iconCls: 'fa fa-calculator',
      hidden: false,
      permissions: 'DD020000',
      component: OrderTobereceived
    },

    {
      path: `${process.env.PATH_ROUTER}/order/completed`,
      name: 'lang.sidebar.text_DD00400',
      iconCls: 'fa fa-calculator',
      hidden: false,
      permissions: 'DD040000',
      component: OrderCompleted
    },
    {
      path: `${process.env.PATH_ROUTER}/order/closed`,
      name: 'lang.sidebar.text_DD00500',
      iconCls: 'fa fa-calculator',
      hidden: false,
      permissions: 'DD050000',
      component: OrderClosed
    },
    {
      path: `${process.env.PATH_ROUTER}/order/recyclebin`,
      name: 'lang.sidebar.text_DD00600',
      iconCls: 'fa fa-calculator',
      hidden: false,
      permissions: 'DD060000',
      component: OrderRecyclebin
    },
    {
      path: `${process.env.PATH_ROUTER}/order/all`,
      name: 'lang.sidebar.text_DD00700',
      iconCls: 'fa fa-calculator',
      hidden: false,
      permissions: 'DD070000',
      component: OrderOrderAll
    },
    {
      path: `${process.env.PATH_ROUTER}/order/tobeshipped/shippedDetail`,
      name: 'lang.sidebar.text_DD00101',
      iconCls: 'fa fa-calculator',
      hidden: true,
      permissions: 'DD010100',
      component: shippedDetail
    },
    {
      path: `${process.env.PATH_ROUTER}/order/receivedDetail`,
      name: 'lang.sidebar.text_DD00201',
      iconCls: 'fa fa-calculator',
      hidden: true,
      permissions: 'DD020100',
      component: receivedDetail
    },
    {
      path: `${process.env.PATH_ROUTER}/order/toPayDetail`,
      name: 'lang.sidebar.text_DD00301',
      iconCls: 'fa fa-calculator',
      hidden: true,
      permissions: 'DD030100',
      component: toPayDetail
    },
    {
      path: `${process.env.PATH_ROUTER}/order/completedDetail`,
      name: 'lang.sidebar.text_DD00401',
      iconCls: 'fa fa-calculator',
      hidden: true,
      permissions: 'DD040100',
      component: completedDetail
    },
    {
      path: `${process.env.PATH_ROUTER}/order/closedDetail`,
      name: 'lang.sidebar.text_DD00501',
      iconCls: 'fa fa-calculator',
      hidden: true,
      permissions: 'DD050100',
      component: closedDetail
    },
    {
      path: `${process.env.PATH_ROUTER}/order/recycleDetail`,
      name: 'lang.sidebar.text_DD00601',
      iconCls: 'fa fa-calculator',
      hidden: true,
      permissions: 'DD060100',
      component: recycleDetail
    }
    ,
    {
      path: `${process.env.PATH_ROUTER}/order/allDetail`,
      name: 'lang.sidebar.text_DD00701',
      iconCls: 'fa fa-calculator',
      hidden: true,
      permissions: 'DD070100',
      component: allDetail
    }
  ]
}

export default { MENU }
