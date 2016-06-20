const t = require('tcomb')
const debug = require('debug')('effects:register-loaded')
const { pull } = require('inu')
const mutations = require('../lib/pull-mutations')
const { id, input } = require('../config').registerComponent
const inputLoaded = require('../actions/input-loaded')

debug('id', id)

module.exports = () => {
  return pull(
    mutations(id),
    pull.filter(mutation => mutation.type === 'addedNode'),
    pull.map(mutation => {
      debug('register Loaded stream', input.id)
      return mutation
    }),
    pull.map(() => inputLoaded({ inputId: input.id })) 
  )
}
