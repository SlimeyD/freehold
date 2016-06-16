const t = require('tcomb')
const ws = require('pull-ws-server')
const { pull } = require('inu')
const delay = require('pull-delay')
const deferred = require('pull-defer').source()
const Streams = require('../streams/streams')

const debug = require('debug')('effects:scheduleInit')

const ScheduleInit = t.struct({}, 'scheduleInit')
const msg = { text: 'hello', author: 'batman', dateTime: Date.now() }

ScheduleInit.prototype.run = function () {
  debug('run', deferred)
   ws.connect('ws://localhost:3000', (err, stream) => {
     debug('stream: ', stream, deferred)
      deferred.resolve(stream.source)      
   
      pull(
        pull.values([msg]),
        delay(500),
        pull.map(JSON.stringify),
        stream
      )
   })
  
  return Streams(deferred) 
}

module.exports = ScheduleInit
