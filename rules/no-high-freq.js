'use strict'

const utils = require('./utils.js')

module.exports = function(context) {
  const bindings = []

  return {
    ImportDeclaration: function(node) {
      bindings.push(...utils.bindings(node))
    },
    CallExpression: function(node) {
      if (!bindings.some(fn => fn(node.callee))) return
      if (!node.arguments[0]) return

      switch (node.arguments[0].value) {
        case 'input':
        case 'keydown':
        case 'keypress':
        case 'keyup':
        case 'mouseout':
        case 'mouseover':
        case 'mousemove':
        case 'scroll':
          context.report({
            node: node,
            message: 'High-frequency delegated events are not allowed'
          })
      }
    }
  }
}

module.exports.schema = []
