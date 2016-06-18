const map = require('lodash/fp/map')
const setUser = require('../actions/set-user')
const debug = require('debug')('components:register')
const mutations = require('../lib/dom-events')
const extend = require('xtend')
const defined = require('defined')
const notify = require('pull-notify')
const { pull, html } = require('inu')
const id = 'a123'
const localDispatch = notify()
const states = notify()
const models = notify()
const actions = notify()
const effects = notify()
const effectActionStreams = notify()  

const scan = (value, accumulator) => {
  return pull.map(function update (nextValue) {
    value = accumulator(value, nextValue)
    return value
  })
}

const init = () => ({ model: { focus: true, loaded: false, id: id } })
const update = (model, action) => {
  switch (action) {
    case 'FOCUS':
      return { model: { focused: true, loaded: model.loaded, id: id } }
    case 'BLUR':
      return { model: { focused: false, loaded: model.loaded, id: id } }
    case 'LOADED':
      debug('LOADED')
      return { 
        model: { 
          id: model.id,
          focus: model.focus, 
          loaded: true 
        }, 
        effect: 'ON_LOAD'
      }
    default:
      return model
  }
}

const view = (model, dispatch, locals) => {
  debug(model, locals)
  const { id, focus } = locals

  return html`
    <div id="${id}">
      <input
        style=${focus ? "background-color: grey;" : "background-color: white;"}
        id="${id + '-input'}"
        onblur=${() => localDispatch({ type: 'BLUR' })}
        onfocus=${() => localDispatch({ type: 'FOCUS' })}
        type="text" >
      <label>martina is cool</label>
      <button>register</button>
    </div>
    `
}

const run = (effect) => {
  switch (effect.type) {
    case 'ON_LOAD':
      debug('ON_LOAD', effect)
      // focus the input node
      document.querySelector(`#${id}-input`).focus()
      return pull(pull.values(['FOCUS']))
  }
}

const Register = () => {
  const initialState = init()
  const locals = { id: id }
  let node, localModel, globalModel, globalDispatch
  
  pull(
    mutations(locals.id),
    pull.filter(mutation => mutation.type === 'addedNode'),
    pull.drain(mutation => {
      node = mutation.node
      localDispatch('LOADED')
    })
  )

  pull(
    localDispatch.listen(),
    scan(initialState, (state, action) => {
      return update(state.model, action)
    }),
    pull.drain(states)  
  )

  pull(
    states.listen(),
    pull.map(state => state.model),
    difference(),
    pull.drain(models)
  )

  pull(
    states.listen(),
    pull.map(state => state.effect),
    pull.filter(effect => effect != null),
    pull.drain(effects)
  )
  
  pull(
    states.listen(),
    pull.filter(state => state.effect != null),
    pull.map(state => run(state.effect)),
    pull.drain(effectActionStreams)
  )

  pull(
    effectActionStreams.listen(),
    pull.drain(actions)
  )

  pull(
    models.listen(),
    pull.map(locals => {
      localModel = locals
      return view(globalModel, globalDispatch, locals)
    }),
    pull.drain(newNode => {
      html.update(node, newNode)

    })
  )

  const render = (model, dispatch) => {
    debug('model', model, localModel, initialState)
    globalModel = model, globalDispatch = dispatch
    const locals = localModel || initialState.model
    debug('locals', locals)
    return view(model, dispatch, locals)
  }

  return render
}

function difference () {
  var lastValue
  return pull.filter(function (value) {
    var condition = value !== lastValue
    lastValue = value
    return condition
  })
}

function drainMany (cb) {
  return function (source) {
    pull(
      source,
      pull.drain(function (stream) {
        pull(
          stream,
          pull.drain(cb)
        )
      })
    )
  }
}

module.exports = Register()
