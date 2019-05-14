import Abstract from '../common/abstract'
import rules from './rules' //
import withdrawalBalance from './withdrawalBalance' //
import withdrawalHistory from './withdrawalHistory' //
const MENU = {
  path: `${process.env.PATH_ROUTER}/withdrawal`,
  name: 'lang.sidebar.text_RM00000',
  iconCls: 'fa fa-cog',
  hidden: false,
  permissions: 'WM000000',
  component: Abstract,
  children: [
    {
      path: `${process.env.PATH_ROUTER}/withdrawal/rules`,
      name: 'lang.sidebar.text_RM00001',
      iconCls: 'fa fa-user-secret',
      hidden: false,
      permissions: 'WM000100',
      component: rules
    }, {
      path: `${process.env.PATH_ROUTER}/withdrawal/withdrawalBalance`,
      name: 'lang.sidebar.text_RM00002',
      iconCls: 'fa fa-vcard',
      hidden: false,
      permissions: 'WF020300',
      component: withdrawalBalance
    }, {
      path: `${process.env.PATH_ROUTER}/withdrawal/withdrawalHistory`,
      name: 'lang.sidebar.text_RM00003',
      iconCls: 'fa fa-glass',
      hidden: true,
      permissions: 'WF020400',
      component: withdrawalHistory
    }
  ]
}

export default { MENU }
