const debug           = require('debug')('view')
const { start, pull } = require('inu')
const app             = require('./app')
const serverState     = require('./state/server')
const Page            = require('./components/page') 

module.exports = route => {
  const initialState = serverState(route)
  debug('initialState; ', initialState)
  const { views } = start(app(initialState))
  return pull(
    views(),
    pull.map(view => {
//       debug('view: ', view)
      return Page(view, initialState())
    })
  )
}
