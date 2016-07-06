// modules
const debug = require('debug')('components:income-input')
const { html } = require('inu')

const IncomeInput = (model, prefix, dispatch) => {
  debug('model', model)

  return html`
  <div id=${prefix}>
    <input id="${prefix}-income" type="number"/>
      <label>Interest rate</label><input id="${prefix}-interest-rate" type="number"/>
      <div>
        <input id="${prefix}-after-tax" type="radio" name="tax" checked value="After Tax" />
        <input id="${prefix}-before-tax" type="radio" name="tax" checked value="Before Tax" />
      </div>
      <div>
        <input id="${prefix}-per-annum" type="radio" name="income-period" checked value="Per annum" />
        <input id="${prefix}-per-week" type="radio" name="income-period" checked value="Per week" />
      </div>
  </div>
  `
}

module.exports = IncomeInput
