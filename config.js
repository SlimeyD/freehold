process.env.NODE_ENV = process.env.NODE_ENV || 'development'
module.exports = module.exports['default'] = require('simple-rc')({
  files: [`./config/${process.env.NODE_ENV}.js`]
})
