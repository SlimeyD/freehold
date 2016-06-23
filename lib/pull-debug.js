'use strict'
const pull = require('pull-stream')
module.exports = (debug, msg) => pull(pull.map(x => debug(msg, x)))
