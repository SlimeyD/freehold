const debug         = require('debug')('state')
const t             = require('tcomb')
const Model         = require('../models/model')
const State         = require('./state')
const config        = require('../config')
const ScheduleInit  = require('../effects/scheduleInit')


const initialState = () => {
  debug('initialState()')
  if (window.__INITIAL_STATE__) {
    return State({ 
      model: Model(window.__INITIAL_STATE__.model),
      effect: ScheduleInit({})
    })
  } else {
    return State({
      model: Model({ 
        location: { href: '/' }
      }),
      effect: ScheduleInit({})
    })
  }
}

module.exports = initialState 

