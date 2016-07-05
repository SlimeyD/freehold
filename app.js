const { html }    = require('inu')
const Router      = require('./components/router')
const State       = require('./state/state')
const Action      = require('./actions/actions')

const noop = () => {}       

module.exports = (initialState, client, Effect) => {
  return {
    init: initialState,
      
    update: (model, action) => State(Action(action).update(model, action)),

    view: (model, dispatch) => {
      const content = Router(model, dispatch)

      return html`<div>${content}</div>`
    },

    run: effect => (Effect && client) ? Effect(effect).run(client) : noop
  }
}
