window.thedebug = require('debug')
const { start, html, pull } = require('inu')
const delay = require('pull-delay')
const ready = require('domready')
const map = require('lodash/fp/map')

const app = require('./app')

const debug = require('debug')('client')

ready(() => {
  const main = document.querySelector('#app')
  const { views, states } = start(app)

  pull(
    states(),
    pull.drain(state => {
      debug('state: ', state)
    })
  )

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
