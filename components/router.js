const { html } = require('inu')
const sheetRouter = require('sheet-router')
const debug = require('debug')('components:router')
const Url = require('url')

// components
const Main = require('./main')

const router = sheetRouter(route => {
  debug('route: ', route)
  return [
    route('/', () => Main),
    route('/test', () => Main)
  ]
})

const Router = (model, dispatch) => {
  debug('model: ', model.location)
  return router(model.location.href)(model, dispatch)
}

module.exports = Router
