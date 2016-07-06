const t = require('tcomb')
const RegisterComponent = require('../models/register-component')
const Model = require('../models/model')
const debug = require('debug')('actions:focus-input')

const focus = t.struct({
  focused: t.Boolean,
  id: t.String
}, 'focus')

focus.prototype.update = function (model) {
  debug('this', this)
  return {
    model: Model.update(
      model,
      {
        registerComponent: {
          input: {
            focused: { $set: this.focused }
          }
        }
      }
    )
  }
}

module.exports = focus
