const map = require('lodash/fp/map')
const setUser = require('../actions/set-user')
const debug = require('debug')('components:register')
const { pull, html } = require('inu')
const focusInput = require('../actions/focus-input.js')

module.exports = (model, dispatch) => {
  debug(model)
  const { id, input } = model.registerComponent
  const inputId = input.id
  const style = {}
  style["background-color"] = input.focused ? "grey" : "white"

  return html`
    <div id="${id}">
      <input
        style=${style}
        id="${inputId}"
        onblur=${() => dispatch(focusInput({ focused: false, id: inputId }))}
        onfocus=${() => dispatch(focusInput({ focused: true, id: inputId }))}
        type="text" >
      <label>username</label>
      <button>register</button>
    </div>
    `
}

