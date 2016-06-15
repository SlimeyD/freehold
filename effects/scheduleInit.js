const t = require('tcomb')
const Streams = require('../streams/streams')
const debug = require('debug')('effects:scheduleInit')
const ws = require('pull-ws-server')
const deferred = require('pull-defer').source()

const ScheduleInit = t.struct({}, 'scheduleInit')

const msg = { text: 'hello', author: 'batman', dateTime: Date.now() }

ScheduleInit.prototype.run = function(stream) {
  debug('run')
  ws.connect('ws://localhost:3000', (err, stream) => {
    debug('stream: ', stream)
    deferred.resolve(stream)      
        
    pull(
      pull.values([msg]),
      delay(200),
      pull.map(JSON.stringify),
      stream
    )
  })

  return Streams(deferred) 
}

module.exports = ScheduleInit
