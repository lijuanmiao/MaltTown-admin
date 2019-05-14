import Abstract from '../common/abstract'

import banner from './uploadfile'
const MENU = {
  path: `${process.env.PATH_ROUTER}/uploadfile`,
  name: 'lang.sidebar.text_SC0001',
  iconCls: 'fa fa-gift',
  hidden: false,
  permissions: 'SC010000',
  component: Abstract,
  children: [
      {
        path: `${process.env.PATH_ROUTER}/uploadfile/uploadfile`,
        name: 'lang.sidebar.text_SC0002',
        iconCls: 'fa fa-image',
        hidden: false,
        permissions: 'SC010100',
        component: uploadfile
      }
  ]
}

export default { MENU }
