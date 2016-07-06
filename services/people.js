'use strict'
const pull = require('chur').pull

module.exports = {
  name: 'people',
  version: '0.0.0',
  permissions: function (path, args) {},
  init: function (server, config) {
    return { find}

    function find () {
      return pull.values(config.data)
    }
  }
}
