const { html } = require('inu')
const sheetRouter = require('sheet-router')
const debug = require('debug')('components:router')
const Url = require('url')


  // components
const Main        = require('./main')
const FourOhFour  = require('./404.js')
const Register    = require('./register')

const router = sheetRouter('/404', route => {
  debug('route')
  return [
    route('/', () => Main),
    route('/404', () => FourOhFour),
    route('/register', () => Register)
  ]
})

const Router = (model, dispatch) => {
  debug('model: ', model)
  return router(model.location.href)(model, dispatch)
}

module.exports = Router
module.router = router
