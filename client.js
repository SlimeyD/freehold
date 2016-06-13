window.thedebug = require('debug')
const ws = require('pull-ws-server')
const { start, html, pull } = require('inu')
const many = require('pull-many')
const JSONDL = require('pull-json-doubleline')
const delay = require('pull-delay')
const ready = require('domready')
const map = require('lodash/fp/map')

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
      debug('view() model', model)
      model.messages.forEach(function (m) {
        debug('m', m.text)  
      })
      return html`
        <ul>
          ${model.messages.map(function (msg) {
            return html`<li>${msg.text}</li>`
          })}
        </ul>
      `
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
      pull.drain(view => {
        debug('view', view)
        html.update(main, view)
      })
    )
    
    pull(
      pull.values([msg]),
      delay(20),
      JSONDL.stringify(),
      pull.map(msg => {
        debug('writing', msg)
        return msg
      }),
      stream,
      JSONDL.parse(),
      pull.collect((err, message) => {
        debug('message back', message)
      })
    )

     pull(
       stream,
       JSONDL.parse(),
       pull.map(messages => {
         debug('messages back 2', messages)
       }),
       pull.drain(() => {
         debug('draining')
       })
     )


  })
})
