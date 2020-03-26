'use strict'

const {specifiers} = require('./utils.js')

module.exports = function (context) {
  const imports = []

  return {
    ImportDeclaration: function (node) {
      imports.push(...specifiers(node, 'delegated-events', 'on'))
    },
    CallExpression: function (node) {
      if (!imports.some(isOn => isOn(node.callee))) return
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
