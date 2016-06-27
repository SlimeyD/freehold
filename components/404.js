// modules
const debug       = require('debug')('components:404')
const { html }    = require('inu')

const FourOhFour = (model, dispatch) => {
  debug('model', model)

  return html`
    <div>
      <div>404</div>
    </div>
      `
}

module.exports = FourOhFour
