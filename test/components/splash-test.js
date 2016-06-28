'use strict'
const test          = require('tape')
const Model         = require('../../models/model')
const initialState  = require('../../state/index')
const Splash        = require('../../components/splash')
const document      = require('global/document')
const isElement     = require('is-element')

const model = initialState().model

test('Splash renders a basic page', t => {
  const splash = Splash(model)

  t.ok(isElement(splash))
  t.end()
})

