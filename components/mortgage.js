const debug       = require('debug')('components:mortgage')
const { html }    = require('inu')

const Chart       = require('./chart')

const Mortgage = (model, dispatch) => {
  debug('model', model)
  const { result } = model
  const years = "30 years"
  const principal = "$400k"
  const interest = "$250k"

  return html`
    <div>
      <div class="borrow-input">
        <h2>How much do you want to borrow?</h2>
        <label>Loan amount</label><input id="loan-amount" type="number"/>
        <label>Interest rate</label><input id="interest-rate" type="number"/>
      </div>
      <div class="repayments-input">
        <h2>Enter your repayment schedule</h2>
        <label>Amount: </label><input id="repayment-amount" type="number"/>
        <div> 
          <label>Each week</label><input id="each-week" type="radio" name="period" checked value="Week" />
          <label>Each month</label><input id="each-month" type="radio" name="period" value="Month" />
        </div>
      </div>
      <div class="your-loan-chart">
        ${Chart(model, dispatch)}
        <div class="your-loan-result">
          <p>Over ${years} you will hav paid the ${principal} principal
            and the ${interest} total interest.
          </p>
        </div>
      </div>
    </div>`
}

module.exports = Mortgage


