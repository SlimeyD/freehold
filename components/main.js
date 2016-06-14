const { html } = require('inu')
const map = require('lodash/fp/map')

const debug = require('debug')('components:main')

const Main = (model, dispatch) => {
  debug('model', model)
  const div = message => html`<div>${message.text}</div>`
  const divs = map(div)(model.messages)

  debug('divs', divs)
  return html`<div>${divs}</div>`
}

module.exports = Main
