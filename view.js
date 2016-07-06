const debug = require('debug')('view')
const inu = require('inu')
const app = require('./app')
const serverState = require('./state/server')
const Page = require('./components/page')

const start = inu.start
const pull = inu.pull

module.exports = route => {
  const initialState = serverState(route)
  debug('initialState; ', initialState)
  const views = start(app(initialState)).views

  return pull(
    views(),
    pull.map(view => {
      //       debug('view: ', view)
      return Page(view, initialState())
    })
  )
}
