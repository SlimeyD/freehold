const t = require('tcomb')
const Model = require('../models/model')
const User = require('../models/user')
const debug = require('debug')('actions:set-user')

const setUser = User.extend({}, 'setUser')

setUser.prototype.update = function (model) {
  debug('model: ', model, this)
  return {
    model: Model.update(
      model,
      { user: { username: { $set: this.username } } }
    )
  }
}

module.exports = setUser
