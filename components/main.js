// modules
const debug       = require('debug')('components:main')
const { html }    = require('inu')
const map         = require('lodash/fp/map')

// actions
const addMessage  = require('../actions/add-message')
const msg = {
  author: 'simon',
  text: 'heya',
  dateTime: Date.now()
}

const Main = (model, dispatch) => {
  debug('model', model)
  const div = message => html`<div>${message.text}</div>`

  return html`
    <div>
      <div>${map(div)(model.messages)}</div>
      <button onclick=${() => dispatch(addMessage(msg))} >add message</button>
      <a href="./register">register</a>
    </div>
      `
}

module.exports = Main
