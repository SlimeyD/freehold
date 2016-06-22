const Serializer = require('pull-serializer')
module.exports = stream => Serializer(stream, JSON, { split: '\n\n' })

