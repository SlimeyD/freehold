const map = require('lodash/fp/map')
const setUser = require('../actions/set-user')
const debug = require('debug')('components:register')
const { pull, html } = require('inu')
const focusInput = require('../actions/focus-input.js')

module.exports = (model, dispatch) => {
  debug(model)
  const { id, input } = model.registerComponent
  const focused = input.focused
  const inputId = input.id

  return html`
    <div id="${id}">
      <input
        style=${focused ? "background-color: grey;" : "background-color: white;"}
        id="${inputId}"
        onblur=${() => dispatch(focusInput({ focused: false, id: inputId }))}
        onfocus=${() => dispatch(focusInput({ focused: true, id: inputId }))}
        type="text" >
      <label>username</label>
      <button>register</button>
    </div>
    `
}

