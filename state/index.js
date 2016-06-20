const t = require('tcomb')
const Model = require('../models/model')
const scheduleInit = require('../effects/scheduleInit')
const config = require('../config')

const debug = require('debug')('state')

const State = t.struct({
  model: Model,
  effect: t.maybe(t.Object)
}, 'State')

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

module.exports = { state: State, initialState: initialState }

