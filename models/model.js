const t = require('tcomb')

const Model = t.struct({ 
  location: require('./location'),
  registerComponent: require('./register-component')
}, 'Model')

module.exports = Model

