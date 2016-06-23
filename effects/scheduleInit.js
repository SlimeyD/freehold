// modules
const debug = require('debug')('effects:scheduleInit')
const t = require('tcomb')

// streams
const Streams = require('../streams/streams')

const ScheduleInit = t.struct({}, 'scheduleInit')
ScheduleInit.prototype.run = client => Streams(client)

module.exports = ScheduleInit
