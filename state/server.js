const debug   = require('debug')('state:server')
const State   = require('./state')
const Model   = require('../models/model')
const config  = require('../config')

const serverState = route => () => {
  debug('serverState()', route)
  
  return {
    model: Model({ 
      location: { href: route }
   })
  }
}

module.exports = serverState
