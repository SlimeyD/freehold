const t = require('tcomb')

const Model = t.struct({ 
  messages: require('./messages'), 
  location: require('./location'),
  user: require('./user')
}, 'Model')

module.exports = Model

