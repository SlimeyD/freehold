const t = require('tcomb')
const Model = require('../models/model')

const State = t.struct({
  model: Model,
  effect: t.maybe(t.Object)
}, 'State')

module.exports = State
