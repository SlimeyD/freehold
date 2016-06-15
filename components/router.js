const { html } = require('inu')
const sheetRouter = require('sheet-router')
const debug = require('debug')('components:router')

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
  debug('model: ', model)
  const Component = router(model.url)
  return Component(model, dispatch)
}

module.exports = Router
