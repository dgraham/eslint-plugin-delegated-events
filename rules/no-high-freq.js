'use strict';

module.exports = function(context) {
  const bindings = []

  return {
    ImportDeclaration: function(node) {
      if (node.source.value !== 'delegated-events') return

      node.specifiers.forEach(spec => {
        switch(spec.type) {
          case 'ImportSpecifier':
            if (spec.imported.name === 'on') {
              bindings.push(callee => {
                return callee.type === 'Identifier' &&
                  callee.name === spec.local.name
              })
            }
            break
          case 'ImportNamespaceSpecifier':
            bindings.push(callee => {
              return callee.type === 'MemberExpression' &&
                callee.object.name === spec.local.name &&
                callee.property.name === 'on'
            })
            break
        }
      })
    },
    CallExpression: function(node) {
      if (!bindings.some(fn => fn(node.callee))) return

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
