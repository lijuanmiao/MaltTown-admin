import Abstract from '../common/abstract'

import bracelet from './bracelet'
import storeStock from './storeStock'
import importHistory from './importHistory'
import detailHistory from './detailHistory'

const MENU = {
  path: `${process.env.PATH_ROUTER}/binding`,
  name: 'lang.sidebar.text_BD0000',
  iconCls: 'fa fa-wrench',
  hidden: false,
  permissions: 'WF120000',
  component: Abstract,
  children: [
    {
      path: `${process.env.PATH_ROUTER}/binding/bracelet`,
      name: 'lang.sidebar.text_BD0001',
      iconCls: 'fa fa-circle-o',
      hidden: false,
      permissions: 'WF120100',
      component: bracelet
    }, {
      path: `${process.env.PATH_ROUTER}/binding/storeStock`,
      name: 'lang.sidebar.text_BD0002',
      iconCls: 'fa fa-tasks',
      hidden: false,
      permissions: 'WF120300',
      component: storeStock
    }, {
      path: `${process.env.PATH_ROUTER}/binding/storeStock/importHistory`,
      name: 'lang.sidebar.text_BD0003',
      iconCls: 'fa fa-tasks',
      hidden: true,
      component: importHistory
    }, {
      path: `${process.env.PATH_ROUTER}/binding/storeStock/detailHistory`,
      name: 'lang.sidebar.text_BD0004',
      iconCls: 'fa fa-tasks',
      hidden: true,
      component: detailHistory
    }
  ]
}

export default { MENU }
