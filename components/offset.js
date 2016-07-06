const debug = require('debug')('components:offset')
const { html } = require('inu')
const Chart = require('./chart')

const Offset = (model, dispatch) => {
  debug('model', model)
  const totalYears = '27 years'
  const principal = '$400k'
  const interest = '$190k'
  const saving = '$60k'
  const savingYears = 'three'
  const potentialSaving = '$150k'
  const potentialYears = '7 years'

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
        <p>We've calculated you could save up to <bold>${potentialYears}
          and cut a total of ${potentialYears} off your mortgage</bold>
          without increasing your repayments.
        </p>
        <p>Enter your email to receive your
          personalised projection
        </p>
      </div>
      <div id="details">
        <input id="details-email" type="email">
        <button id="details-submit">Find out more</button>
      </div>
      <footer>
        <a href="./about">About</a>
        <a href="./contact">Contact Us</a>
        <a href="./privacy">Privacy</a>
      </footer>
    </div>`
}

module.exports = Offset
