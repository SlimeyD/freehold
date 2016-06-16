const t = require('tcomb')

const Location = t.struct({ href: t.String }, 'Location')

module.exports = Location
