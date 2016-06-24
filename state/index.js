const t = require('tcomb')
const Model = require('../models/model')
const State = require('./state')
const scheduleInit = require('../effects/scheduleInit')
const config = require('../config')

const debug = require('debug')('state')

const initialState = () => {
  debug('initialState()')
  
  return State({
    model: Model({ 
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
    }),
    effect: scheduleInit({})
  })
}

module.exports = initialState 

