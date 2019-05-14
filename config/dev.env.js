var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var API_ROOT_DATA = require('./config')
var PATH_DATA = require('./path')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT:API_ROOT_DATA.API_URL,
  API_USER:API_ROOT_DATA.USER_URL,

  // API_FILE:API_ROOT_DATA.FILE_URL,
  // API_EQUI:API_ROOT_DATA.EQUI_URL,
  PATH_ROUTER:PATH_DATA.PATH_ROUTER,
  PATH_API:PATH_DATA.PATH_API,
})
