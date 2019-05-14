module.exports = {
  dev: {
    app: './src/main.js',
    error: './src/views/error/index.js',
    // components: './src/components/index.js',
    // common: './src/views/common/index.js',
    // account: './src/views/account/index.js',
    // channel: './src/views/channel/index.js',
    // coach: './src/views/coach/index.js',
    // course: './src/views/course/index.js',
    // financeReport: './src/views/financeReport/index.js',
    // member: './src/views/member/index.js',
    // memberShip: './src/views/memberShip/index.js',
    // order: './src/views/order/index.js',
    // system: './src/views/system/index.js',
    // workReport: './src/views/workReport/index.js'
  },
  build: {
    app: ['babel-polyfill', './src/main.js'],
    error: ['babel-polyfill', './src/views/error/index.js'],
    // components: ['babel-polyfill', './src/components/index.js'],
    // common: ['babel-polyfill', './src/views/common/index.js'],
    // account: ['babel-polyfill', './src/views/account/index.js'],
    // channel: ['babel-polyfill', './src/views/channel/index.js'],
    // coach: ['babel-polyfill', './src/views/coach/index.js'],
    // course: ['babel-polyfill', './src/views/course/index.js'],
    // financeReport: ['babel-polyfill', './src/views/financeReport/index.js'],
    // member: ['babel-polyfill', './src/views/member/index.js'],
    // memberShip: ['babel-polyfill', './src/views/memberShip/index.js'],
    // order: ['babel-polyfill', './src/views/order/index.js'],
    // system: ['babel-polyfill', './src/views/system/index.js'],
    // workReport: ['babel-polyfill', './src/views/workReport/index.js']
  }
}
