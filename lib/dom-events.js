/* global MutationObserver */
const window = require('global/window')
const ready = require('domready')
const debug = require('debug')('lib:dom-events')
const pull = require('pull-stream')
const Pushable = require('pull-pushable')
const watch = []
const mutationStream = Pushable() 
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver


ready(() => {
  if (window && MutationObserver) {
    const observer = new MutationObserver(function (mutations) {
      debug('mutations: ', mutations)
      for (let i = 0; i < mutations.length; i++) {
        const mutation = mutations[i]
        debug('mutation: ', mutation)      
        for (let x = 0; x < mutation.addedNodes.length; x++) {
          for (let y = 0; y < watch.length; y++) {
            if (watch[y] === mutation.addedNodes[x].id) {
              debug('addedNode', watch[y])
              mutationStream.push({ 
                id: watch[y], 
                mutation: mutation,
                type: 'addedNode',
                node: mutation.addedNodes[x]
              })
            }
          }
        }

        for (let x = 0; x < mutation.removedNodes.length; x++) {
          for (let y = 0; y < watch.length; y++) {
            if (watch[y] === mutation.removedNodes[x].id) {
              mutationStream.push({ 
                id: watch[y], 
                mutation: mutation,
                type: 'removedNode',
                node: mutation.removedNode[x]
              })
            }
          }
        }

        if (mutation.type === 'attributes') {
          for (let y = 0; y < watch.length; y++) {
            if (watch[y] === mutation.target.id) {
              mutationStream.push({ 
                id: watch[y], 
                mutation: mutation,
                type: 'attributes',
                node: mutation.target
              })
            }
          }
        }
      }
    })

    observer.observe(
      document.body, 
      { childList: true, subtree: true, attributes: true }
    )
  }
})

module.exports = function (id) {
  debug('id: ', id)
  watch.push(id)
  return pull(
    mutationStream,
    pull.filter(m => m.id === id)
  )
}
