const { html } = require('inu')
const sheetRouter = require('sheet-router')
const debug = require('debug')('components:router')
const Url = require('url')
const app = require('../app')

// components
const Main = require('./main')
const Register = require('./register')

const router = sheetRouter(route => {
  debug('route: ', route)
  return [
    route('/', () => Main),
    route('/register', () => Register)
  ]
})

const Router = (model, dispatch) => {
  debug('location: ', model.location)
  return router(model.location.href)(model, dispatch)
}

module.exports = Router
