const debug         = require('debug')('components:router')
const { html }      = require('inu')
const sheetRouter   = require('sheet-router')

  // components
const Splash        = require('./splash')
const Mortgage      = require('./mortgage')
const FourOhFour    = require('./404.js')

const router = sheetRouter('/404', route => {
  return [
    route('/', () => Splash),
    route('/mortgage', () => Mortgage),
    route('/404', () => FourOhFour)
  ]
})

const Router = (model, dispatch) => {
  debug('model: ', model.location.href)

  return router(model.location.href)(model, dispatch)
}

module.exports = Router
module.router = router
