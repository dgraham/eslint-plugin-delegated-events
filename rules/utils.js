'use strict'

// Returns a list of predicate functions that determine if a CallExpression
// is calling into a member of the imported module.
//
//   const imports = specifiers(importNode, 'd3-time-format', 'timeFormat')
//   const isD3 = imports.some(isTimeFormat => isTimeFormat(callExprNode))
function specifiers(node, module, member) {
  return node.source.value === module
    ? node.specifiers.map(spec => isMember(spec, member))
    : []
}

function isMember(spec, member) {
  return function(callee) {
    switch (spec.type) {
      case 'ImportSpecifier':
        return (
          spec.imported.name === member &&
          callee.type === 'Identifier' &&
          callee.name === spec.local.name
        )
      case 'ImportNamespaceSpecifier':
        return (
          callee.type === 'MemberExpression' &&
          callee.object.name === spec.local.name &&
          callee.property.name === member
        )
    }
  }
}

module.exports = {
  specifiers
}
