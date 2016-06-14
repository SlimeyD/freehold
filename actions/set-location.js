const t = require('tcomb')
const Model = require('../models/model')

const setLocation = Model.extend({}, 'setLocation')

setLocation.prototype.update = function (model) {
  return {
    model: Model.update(
      model,
      { url: { $set: [this] } }
    )
  }
}

module.exports = setLocation
