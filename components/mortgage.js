const debug       = require('debug')('components:mortgage')
const { html }    = require('inu')

    
const config      = require('../config').mortgage

const Chart       = require('./chart')


const Mortgage = (model, dispatch) => {
  debug('model', model)
  const { result } = model
  const years = "30 years"
  const principal = "$400k"
  const interest = "$250k"

  return html`
    <div>
      <div id="borrow-input">
        <h2>How much do you want to borrow?</h2>
        <label>Loan amount</label><input id="${config.amount.id}" type="number"/>
        <label>Interest rate</label><input id="${config.interest.id}" type="number"/>
      </div>
      <div id="repayments-input">
        <h2>Enter your repayment schedule</h2>
        <label>Amount: </label><input id="repayment-amount" type="number"/>
        <div> 
          <label>Each week</label><input id="each-week" type="radio" name="period" checked value="Week" />
          <label>Each month</label><input id="each-month" type="radio" name="period" value="Month" />
        </div>
      </div>
      <div id="mortgage-chart">
        ${Chart(model, dispatch)}
        <div id="mortgage-result">
          <p>Over ${years} you will hav paid the ${principal} principal
            and the ${interest} total interest.
          </p>
          <a href="./income-&-expenses">
            <button>Like to pay less</button>
          </a>
        </div>
      </div>
    </div>`
}

module.exports = Mortgage


