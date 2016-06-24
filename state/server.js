const State = require('./state')
const Model = require('../models/model')
const config = require('../config')
const debug = require('debug')('state:server')

const serverState = route => () => {
  debug('serverState()')
  
  return {
    model: Model({ 
      messages: [], 
      location: { href: route },
      user: { username: '' },
      registerComponent: { 
        id: config.registerComponent.id,
        input: {
          id: config.registerComponent.input.id,
          focused: true
        }
      }
   })
  }
}

module.exports = serverState
