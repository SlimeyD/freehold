const Model = require('../models/model')
const Location = require('../models/location')
const debug = require('debug')('actions:set-location')

const setLocation = Location.extend({}, 'setLocation')

setLocation.prototype.update = function (model) {
  debug('model: ', model, this)
  return {
    model: Model.update(
      model,
      { location: { href: { $set: this.href } } }
    )
  }
}

module.exports = setLocation
