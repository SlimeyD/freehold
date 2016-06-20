const t = require('tcomb')

const Model = t.struct({ 
  messages: require('./messages'), 
  location: require('./location'),
  user: require('./user'),
  registerComponent: require('./register-component')
}, 'Model')

module.exports = Model

