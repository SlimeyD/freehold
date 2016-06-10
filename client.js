
const ws = require('pull-ws-server')
const { start, html, pull } = require('inu')
const toPull = require('stream-to-pull-stream')
const toStream = require('pull-stream-to-stream')
const many = require('pull-many')
const JSONDL = require('pull-json-doubleline')
const delay = require('pull-delay')

const domready = require('domready')
const initialState = require('./state').initialState
const Model = require('./models/model')
const Message = require('./models/message')
const Messages = require('./models/messages')
const debug = require('debug')('client')

const map = require('lodash/fp/map')
window.thedebug = require('debug')

const App = stream => {
  return {

    init: initialState,

    update: (model, action) => {
      switch (action.type) {
        case 'UPDATE_MESSAGES':
          debug('action.payload', action.payload, model)
          return { 
            model: Model.update(
              model,
              { messages: { $set: map(Message)([action.payload]) } }
            )
          }

        default:
          return { model }
      }
    },

    view: (model, dispatch) => {
      debug('view() model', model)
      model.messages.forEach(function (m) {
        debug('m', m)  
      })
      return html`
        <ul>
          ${model.messages.map(function (msg) {
            return html`<li>${msg.text}</li>`
          })}
        </ul>
      `
    },

    run: effect => {
      debug('effect: ', effect)
      switch (effect.type) {
         case 'STREAMS':
           return pull(
             stream,
             JSONDL.parse(),
             pull.map(messages => {
               debug('messages in effect', messages)
               return { type: 'UPDATE_MESSAGES', payload: messages }
             })
           )
      }
    }
  }
}

domready(() => {
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
