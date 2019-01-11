'use strict'

const utils = require('./utils.js')

const allowed = ['ExpressionStatement', 'Program']

module.exports = function(context) {
  const bindings = []

  return {
    ImportDeclaration: function(node) {
      bindings.push(...utils.bindings(node))
    },
    CallExpression: function(node) {
      if (!bindings.some(fn => fn(node.callee))) return

      const pass = context
        .getAncestors()
        .every(parent => allowed.includes(parent.type))

      if (pass) return

      context.report({
        node: node,
        message: 'Delegated listeners must be registered in the top level scope'
      })
    }
  }
}

module.exports.schema = []
