/* global MutationObserver */
const window          = require('global/window')
const document        = require('global/document')
const ready           = require('domready')
const debug           = require('debug')('lib:pull-mutations')
const pull            = require('pull-stream')
const Pushable        = require('pull-pushable')
const isArray         = require('is-array')
const contains        = require('lodash/fp/includes')

let watch = []
const mutationStream = Pushable() 
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver


ready(() => {
  if (window && MutationObserver) {
    const observer = new MutationObserver(function (mutations) {
      for (let i = 0; i < mutations.length; i++) {
        const mutation = mutations[i]

//        debug(mutation.target.id, mutation.type)
        for (let x = 0; x < mutation.addedNodes.length; x++) {
//          debug(mutation.addedNodes[x], watch)
          for (let y = 0; y < watch.length; y++) {
  //          debug('child Id: ', mutation.addedNodes[x].id, mutation.addedNodes[x])
            if (watch[y] === mutation.addedNodes[x].id) {
    //          debug('addedNode', watch[y])
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
                node: mutation.removedNodes[x]
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

module.exports = function (arg) {
  let filter
  if (isArray(arg)) {
    watch = watch.concat(arg)
    filter = m => contains(arg)(m.id)
  } else {
    watch.push(arg)
    filter = m => m.id === arg
  }
  
  return pull(
    mutationStream,
    pull.map(m => {
      debug('mutationStream******: ', m)
      return m
    }),
    pull.filter(filter)
  )
}
