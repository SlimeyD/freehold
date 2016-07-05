const debug = require('debug')('actions:input-loaded')
const t = require('tcomb')
const RegisterComponent = require('../models/register-component')
const focusInput = require('../effects/focus-input')
const inputLoaded = t.struct({ inputId: t.String }, 'inputLoaded')

inputLoaded.prototype.update = function (model) {
  debug('this: ', this)
  return {
    model: model,
    effect: focusInput(this)
  }
}

module.exports = inputLoaded
