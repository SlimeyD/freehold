const t = require('tcomb')
const href = require('sheet-router/href')
const history = require('sheet-router/history')
const Pushable = require('pull-pushable')
const setLocation = require('../actions/set-location')

const debug = require('debug')('streams:set-location-stream')

const setLocationStream = () => {
  const routeActions = Pushable(function onClose (error) {
    // TODO: clean href and/or history
    debug('error: ', error)
  })

  function push (href) {
    debug('push - href: ', href, setLocation)
    routeActions.push(setLocation({ href: href }))
  }

  href(push)
  history(push)

  debug('routeActions: ', routeActions)
  return routeActions
}

module.exports = setLocationStream
