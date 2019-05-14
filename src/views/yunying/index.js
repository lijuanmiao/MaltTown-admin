import Abstract from '../common/abstract'

import userInterests from '../yunying/userInterestsSet'
import userProfit from '../yunying/userProfitSet'

const MENU = {
  path: `${process.env.PATH_ROUTER}/yy`,
  name: 'lang.sidebar.text_YY2000',
  iconCls: 'fa fa-gift',
  hidden: false,
  permissions: 'YY020000',
  component: Abstract,
  children: [
    {
      path: `${process.env.PATH_ROUTER}/yyset/interests`,
      name: 'lang.sidebar.text_YY2001',
      iconCls: 'fa fa-user-circle-o',
      hidden: false,
      permissions: 'YY020100',
      component: userInterests

    },
    {
      path: `${process.env.PATH_ROUTER}/yyset/profit`,
      name: 'lang.sidebar.text_YY2002',
      iconCls: 'fa fa-user-circle',
      hidden: false,
      permissions: 'YY020200',
      component: userProfit

    }
  ]
}

export default { MENU }
