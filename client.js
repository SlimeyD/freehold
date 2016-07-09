window.thedebug = require('debug')
const debug = require('debug')('client')
const { start, html, pull } = require('inu')
const ready = require('domready')
const app = require('./app')
const initialState = require('./state')
const api = require('./api')
const wsClient = require('./ws-client')
const Effect = require('./effects/client-effects')

ready(() => {
  const main = document.querySelector('#app')
  const client = wsClient(api)
  const { views } = start(app(initialState, client, Effect))

  pull(
    views(),
    pull.map(view => {
      debug('view - map', view)
      return view
    }),
    pull.drain(view => {
      html.update(main, view)
    })
  )
})
