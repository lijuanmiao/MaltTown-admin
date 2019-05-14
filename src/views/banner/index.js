import Abstract from '../common/abstract'

import banner from './banner'
const MENU = {
  path: `${process.env.PATH_ROUTER}/yy`,
  name: 'lang.sidebar.text_YY0001',
  iconCls: 'fa fa-gift',
  hidden: false,
  permissions: 'YY010000',
  component: Abstract,
  children: [
      {
        path: `${process.env.PATH_ROUTER}/yy/banner`,
        name: 'lang.sidebar.text_YY0002',
        iconCls: 'fa fa-image',
        hidden: false,
        permissions: 'YY010100',
        component: banner
      }
  ]
}

export default { MENU }
