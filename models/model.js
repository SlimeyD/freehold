const t = require('tcomb')

const Model = t.struct({ 
  location: require('./location')
}, 'Model')

module.exports = Model

