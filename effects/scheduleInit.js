const t = require('tcomb')
const Streams = require('../streams/streams')
const debug = require('debug')('effects:scheduleInit')

const ScheduleInit = t.struct({}, 'scheduleInit')

ScheduleInit.prototype.run = function(stream) {
    debug('run')
    return Streams(stream) 
}

module.exports = ScheduleInit
