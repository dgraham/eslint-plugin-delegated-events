'use strict'

const {specifiers} = require('./utils.js')

const allowed = ['ExpressionStatement', 'Program']

module.exports = function (context) {
  const imports = []

  return {
    ImportDeclaration: function (node) {
      imports.push(...specifiers(node, 'delegated-events', 'on'))
    },
    CallExpression: function (node) {
      if (!imports.some(isOn => isOn(node.callee))) return

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
