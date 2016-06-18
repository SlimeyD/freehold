const t = require('tcomb')

const User = t.struct({ username: t.String }, 'User')

module.exports = User
