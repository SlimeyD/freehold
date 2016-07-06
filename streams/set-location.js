const debug = require('debug')('streams:set-location-stream')
const t = require('tcomb')
const href = require('sheet-router/href')
const history = require('sheet-router/history')
const Pushable = require('pull-pushable')
const setLocation = require('../actions/set-location')
const inputLoaded = require('../actions/input-loaded')
const parseUrl = require('parse-url')
const { mortgage, income } = require('../config')

const inputsMap = {
  '/mortgage': mortgage.amount.id,
  '/income-&-expenses': `${income.your.prefix}-income`
}

const setLocationStream = () => {
  const routeActions = Pushable(function onClose (error) {
    // TODO: clean href and/or history
    debug('error: ', error)
  })

  function push (href) {
    debug('push - href: ', href)
    const pathname = parseUrl(href).pathname
    routeActions.push(setLocation({ href: href }))
    if (inputsMap[pathname]) {
      routeActions.push(inputLoaded({ inputId: inputsMap[pathname]}))
    }
  }

  href(push)
  history(push)

  debug('routeActions: ', routeActions)
  return routeActions
}

module.exports = setLocationStream
