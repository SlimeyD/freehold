const debug       = require('debug')('components:offset')
const { html }    = require('inu')
const Chart       = require('./chart')

const IncomeAndExpenses = (model, dispatch) => {
  debug('model', model)
  const totalYears = "27 years"
  const principal = "$400k"
  const interest = "$190k"
  const saving = "$60k"
  const savingYears = "three"

  return html`
    <div id="offset">
      <h2>Your Offset</h2>
      ${Chart(model, dispatch)}
      <div id="offset-mortgage-result">
        <p>Over ${totalYears} you will hav paid the ${principal} principal
            and the ${interest} total interest.
        </p>
        <p>That's a total saving of ${saving} and ${savingYears} off your mortgage
        </p>  
      </div>
      <label for="partners-income">Include partner's income?</label> 
      <input type="checkbox" id="partners-income">
      <h3>Partner's Income</h3>
      ${IncomeInput(model, dispatch)}
      <div id="expenses"></div>
        <input id="expenses-period-week" type="radio" name="expenses-period" checked value="per week" />
        <input id="expenses-period-month" type="radio" name="expenses-period" checked value="per month" />
        <table>
          <tr>
            <td>Electricity</td><td>$</td>
          </tr>
        </table>
        <a href="./offset"><button>Calculate your offset</button></a>
      </div>
    </div>`
}

module.exports = IncomeAndExpenses


