const t = require('tcomb')
const debug = require('debug')('effects:focus-input')

const FocusInput = t.struct({ inputId: t.String }, 'focusInput')

FocusInput.prototype.run = function () {
  debug(this)
  document.querySelector(`#${this.inputId}`).focus()
}

module.exports = FocusInput
