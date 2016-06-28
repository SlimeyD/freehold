const debug       = require('debug')('components:splash')
const { html }    = require('inu')

const Splash = (model, dispatch) => {
  debug('model', model)

  return html`
    <div>
      <h1>Getting a home loan or refinancing?</h1>
      <p>Use our handy calculator to work out how 
        you can save thousands in interest and 
        meet your financial goals faster. By using
        the right structure, you can save tens of
        thosands of dollars on your mortgage
        and be debt-free faster.
      </p>
      <a href="./mortgage">
        <button>Click here to begin</button>
      </a>
    </div>
      `
}

module.exports = Splash
