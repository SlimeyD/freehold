const debug = require('debug')('streams:focus-inputs')
const { pull } = require('inu')
const config = require('../config')
const inputLoaded = require('../actions/input-loaded')

const { income, mortgage } = config
const ids = [
  `${income.your.prefix}-input`,
  mortgage.amount.id
//  `${income.partners.prefix}-input`
]

module.exports = () => {
  return pull(
    pull.values(ids),
    // input has been rendered server side
    pull.filter(id => document.querySelector(`#${id}`)),
    pull.map(id => inputLoaded({ inputId: id }))
  )
}
