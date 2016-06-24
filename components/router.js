const { html } = require('inu')
const sheetRouter = require('sheet-router')
const debug = require('debug')('components:router')
const Url = require('url')


  // components
const Main = require('./main')
const Register = require('./register')

const router = sheetRouter(route => {
  debug('route')
  return [
    route('/', () => Main),
    route('/register', () => Register)
  ]
})

const Router = (model, dispatch) => {
  debug('model: ', model)
  return router(model.location.href)(model, dispatch)
}

module.exports = Router
