window.thedebug = require('debug')
const { start, html, pull } = require('inu')
const ws = require('pull-ws-server')
const delay = require('pull-delay')
const ready = require('domready')
const map = require('lodash/fp/map')

const Router = require('./components/router')
const initialState = require('./state').initialState
const State = require('./state').state
const Action = require('./actions/actions')
const Effect = require('./effects/effects')
const Model = require('./models/model')
const Message = require('./models/message')
const Messages = require('./models/messages')

const debug = require('debug')('client')

const App = stream => {
  return {

    init: initialState,

    update: (model, action) => State(Action(action).update(model, action)),

    view: (model, dispatch) => {
      const content = Router(model, dispatch)

      return html`<div>${content}</div>`
    },

    run: effect => Effect(effect).run(stream)
  }
}

ready(() => {
  const main = document.querySelector('#app')
  const msg = { text: 'hello', author: 'batman', dateTime: Date.now() }

  ws.connect('ws://localhost:3000', (err, stream) => {
    debug('stream', err, stream)
    const app = App(stream)
    const { views } = start(app)

    pull(
      views(),
      pull.map(view => {
        debug('view - map', view)
        return view
      }),
      pull.drain(view => {
        debug('view', view)
        html.update(main, view)
      })
    )
    
    pull(
      pull.values([msg]),
      delay(200),
      pull.map(JSON.stringify),
      stream
    )
  })
})
