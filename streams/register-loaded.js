const t           = require('tcomb')
const debug       = require('debug')('effects:register-loaded')
const { pull }    = require('inu')
const mutations   = require('../lib/pull-mutations')
const config      = require('../config')
const inputLoaded = require('../actions/input-loaded')

const { income, mortgage } = config
debug('mortgage: ', mortgage)
const ids = [
  `${income.your.prefix}-input`,
  mortgage.amount.id
//  `${income.partners.prefix}-input`
]

module.exports = () => {
  debug('registerLoaded', ids)
  return pull(
    mutations(ids),
    pull.map(mutation => {
      debug('mutation', mutation)
      return mutation
    }),
    pull.filter(mutation => mutation.type === 'addedNode'),
    pull.map(mutation => {
      debug('input mutation: ', mutation)
      return mutation
    }),
    pull.map(mutation => inputLoaded({ inputId: mutation.id })) 
  )
}
