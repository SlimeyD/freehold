const debug       = require('debug')('components:income-&-expenses')
const { html }    = require('inu')

const IncomeInput = require('./income-input')

const IncomeAndExpenses = (model, dispatch) => {
  debug('model', model)

  return html`
    <div>
      <div id="income-input">
        <h2>What's your income?</h2>
      </div>
      ${IncomeInput(model, dispatch)}
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


