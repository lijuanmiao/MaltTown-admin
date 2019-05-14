import Demo from './demo'
import Demo1 from './demo1'
import Demo2 from './demo2'

const MENU = {
  path: `${process.env.PATH_ROUTER}/demo`,
  name: 'Demo',
  iconCls: 'fa fa-cog',
  hidden: false,
  permissions: 'WF020000',
  component: Demo,
  children: [{
      path: `${process.env.PATH_ROUTER}/demo/demo1`,
      name: 'lang.sidebar.text_XT0002',
      iconCls: 'fa fa-user-secret',
      hidden: false,
      permissions: 'WF020200',
      component: Demo1,
      children:[ {
        path: `${process.env.PATH_ROUTER}/system/role/demo`,
        name: 'lang.sidebar.text_XT0013',
        iconCls: 'fa fa-vcard',
        hidden: false,
        permissions: 'WF020300',
        component: Demo2
      }]
    }]
}

export default { MENU }
