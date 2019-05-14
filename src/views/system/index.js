import Abstract from '../common/abstract'

import Role from './role' //
import param from './param' //
import Personnel from './personnel' //
import myInfo from './myInfo' //

const MENU = {
  path: `${process.env.PATH_ROUTER}/system`,
  name: 'lang.sidebar.text_XT0000',
  iconCls: 'fa fa-cog',
  hidden: false,
  permissions: 'WF020000',
  component: Abstract,
  children: [
    {
      path: `${process.env.PATH_ROUTER}/system/role`,
      name: 'lang.sidebar.text_XT0002',
      iconCls: 'fa fa-user-secret',
      hidden: false,
      permissions: 'WF020200',
      component: Role
    }, {
      path: `${process.env.PATH_ROUTER}/system/personnel`,
      name: 'lang.sidebar.text_XT0005',
      iconCls: 'fa fa-vcard',
      hidden: false,
      permissions: 'WF020300',
      component: Personnel
    }, {
      path: `${process.env.PATH_ROUTER}/system/param`,
      name: 'lang.sidebar.text_XT0004',
      iconCls: 'fa fa-glass',
      hidden: false,
      permissions: 'WF020400',
      component: param
    }, {
      path: `${process.env.PATH_ROUTER}/system/myInfo`,
      name: 'lang.sidebar.text_XT0007',
      iconCls: 'fa fa-user-o',
      hidden: false,
      permissions: 'WF020500',
      component: myInfo
    }
  ]
}

export default { MENU }
