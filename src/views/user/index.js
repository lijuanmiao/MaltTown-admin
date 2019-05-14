import Abstract from '../common/abstract'

import userList from './userList'
import prizeList from './prizeList.vue'
import userDetail from './userDetail.vue'

const MENU = {
  path: `${process.env.PATH_ROUTER}/user`,
  name: 'lang.sidebar.text_HY0000',
  iconCls: 'fa fa-wrench',
  hidden: false,
  permissions: 'HY000000',
  component: Abstract,
  children: [
    {
      path: `${process.env.PATH_ROUTER}/user/userList`,
      name: 'lang.sidebar.text_HY0001',
      iconCls: 'fa fa-circle-o',
      hidden: false,
      permissions: 'HY000001',
      component: userList
    },{
      path: `${process.env.PATH_ROUTER}/user/userDetail`,
      name: 'lang.sidebar.text_HY0002',
      iconCls: 'fa fa-circle-o',
      hidden: true,
      permissions: 'HY000002',
      component: userDetail
    },
    {
      path: `${process.env.PATH_ROUTER}/user/prizeList`,
      name: 'lang.sidebar.text_HY0003',
      iconCls: 'fa fa-circle-o',
      hidden: false,
      permissions: 'HY000003',
      component: prizeList
    }
  ]
}

export default { MENU }
