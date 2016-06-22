const t = require('tcomb')
const ws = require('pull-ws-server')
const { pull } = require('inu')
const delay = require('pull-delay')
const deferred = require('pull-defer').source()
const Streams = require('../streams/streams')
const Pushable = require('pull-pushable')

const debug = require('debug')('effects:scheduleInit')

const ScheduleInit = t.struct({}, 'scheduleInit')

ScheduleInit.prototype.run = client => {
  debug('init - run') 
  return Streams(client) 
}

module.exports = ScheduleInit
