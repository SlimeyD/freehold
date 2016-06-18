const { html } = require('inu')
const map = require('lodash/fp/map')

const debug = require('debug')('components:main')

const Main = (model, dispatch) => {
  debug('model', model)
  const div = message => html`<div>${message.text}</div>`

  return html`
    <div>
      <div>${map(div)(model.messages)}</div>
      <a href="./register">register</a>
    </div>
      `
}

module.exports = Main
