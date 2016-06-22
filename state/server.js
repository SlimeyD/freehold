const State = require('./state')
const Model = require('../models/model')
const config = require('../config')
const debug = require('debug')('state:server')

const serverState = () => {
  debug('serverState()')
  
  return Model({ 
    messages: [], 
    location: { href: '/' },
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

module.exports = serverState
