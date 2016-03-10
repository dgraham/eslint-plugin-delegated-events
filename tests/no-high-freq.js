'use strict';

var rule = require('../rules/no-high-freq')
var RuleTester = require('eslint').RuleTester

var error = 'High-frequency delegated events are not allowed'

var ruleTester = new RuleTester()
ruleTester.run('no-high-freq', rule, {
  valid: [
    'on("click", "button", function(){})',
    'on("change", "button", function(){})',
    'on("drop", "button", function(){})'
  ],

  invalid: [
    {
      code: 'on("input", "div", function(event){})',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: 'on("keydown", "div", function(event){})',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: 'on("keypress", "div", function(event){})',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: 'on("keyup", "div", function(event){})',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: 'on("mouseout", "div", function(event){})',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: 'on("mouseover", "div", function(event){})',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: 'on("mousemove", "div", function(event){})',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: 'on("scroll", "div", function(event){})',
      errors: [{message: error, type: 'CallExpression'}]
    },
  ]
})
