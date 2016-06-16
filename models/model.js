const t = require('tcomb')

const Model = t.struct({ 
  messages: require('./messages'), 
  location: require('./location')
}, 'Model')

module.exports = Model

