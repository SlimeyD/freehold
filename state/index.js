const t = require('tcomb')
const Model = require('../models/model')
const debug = require('debug')('state')

const State = t.struct({
  model: Model,
  effect: t.maybe(t.Object)
}, 'State')

const initialState = () => {
  debug('initialState()')
  
  return State({
    model: Model({ messages: [] }),
    effect: { type: 'STREAMS' }
  })
}

module.exports = { state: State, initialState: initialState }

