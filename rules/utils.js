'use strict'

function bindings(node) {
  const found = []

  if (node.source.value !== 'delegated-events') {
    return found
  }

  for (const spec of node.specifiers) {
    switch (spec.type) {
      case 'ImportSpecifier':
        if (spec.imported.name === 'on') {
          found.push(
            callee =>
              callee.type === 'Identifier' && callee.name === spec.local.name
          )
        }
        break
      case 'ImportNamespaceSpecifier':
        found.push(
          callee =>
            callee.type === 'MemberExpression' &&
            callee.object.name === spec.local.name &&
            callee.property.name === 'on'
        )
        break
    }
  }

  return found
}

module.exports = {
  bindings
}
