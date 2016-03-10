'use strict';

module.exports = function(context) {
  return {
    CallExpression: function(node) {
      if (node.callee.name !== 'on') return

      var name = node.arguments[0].value
      switch (name) {
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
