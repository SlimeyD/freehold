const test = require('tape')
const request = require('supertest')
const server = require('../server')
const isHtml = require('is-html')

test('the server responds with html', t => {
  request(server)
    .get('/')
    .expect(200)
    .expect('Content-Type', 'text/plain')
    .end((err, res) => {
      t.ok(isHtml(res.text))
      t.end()
    })
})
