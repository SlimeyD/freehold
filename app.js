const { html }     = require('inu')
const Router       = require('./components/router')
const initialState = require('./state').initialState
const State        = require('./state').state
const Action       = require('./actions/actions')
const Effect       = require('./effects/effects')
const wsClient     = require('./ws-client')
const api          = require('./api')

const client = wsClient(api)

module.exports = {

  init: initialState,
    
  update: (model, action) => State(Action(action).update(model, action)),

  view: (model, dispatch) => {
    const content = Router(model, dispatch)

    return html`<div>${content}</div>`
  },

  run: effect => Effect(effect).run(client)
}
