const t = require('tcomb')
const Model = require('../models/model')
const State = require('./state')
const config = require('../config')

const debug = require('debug')('state')

const initialState = () => {
  debug('initialState()')
  if (window.__INITIAL_STATE__) {
    return State({ model: Model(window.__INITIAL_STATE__.model) })
  } else {
    return State({
      model: Model({ 
        location: { href: '/' },
        registerComponent: { 
          id: config.registerComponent.id,
          input: {
            id: config.registerComponent.input.id,
            focused: true
          }
        }
      })
    })
  }
}

module.exports = initialState 

