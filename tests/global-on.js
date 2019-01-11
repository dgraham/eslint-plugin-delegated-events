'use strict'

const rule = require('../rules/global-on')
const RuleTester = require('eslint').RuleTester

const error = 'Delegated listeners must be registered in the top level scope'

const ruleTester = new RuleTester()
ruleTester.run('global-on', rule, {
  valid: [
    {
      code: 'if (true) { on("click", "div", function(){}) }',
      parserOptions: {sourceType: 'script'}
    },
    {
      code: 'if (true) { on("click", "div", function(){}) }',
      parserOptions: {sourceType: 'module'}
    },
    {
      code:
        'import {on} from "delegated-events"; on("click", "div", function(){})',
      parserOptions: {sourceType: 'module'}
    },
    {
      code:
        'import {on as alias} from "delegated-events"; alias("click", "div", function(){})',
      parserOptions: {sourceType: 'module'}
    },
    {
      code:
        'import * as events from "delegated-events"; events.on("click", "div", function(){})',
      parserOptions: {sourceType: 'module'}
    },
    {
      code:
        'import {on} from "not-delegated-events"; if (true) { on("click", "div", function(){}) }',
      parserOptions: {sourceType: 'module'}
    }
  ],
  invalid: [
    {
      code:
        'import {on as alias} from "delegated-events"; if (true) { alias("click", "div", function(event){}) }',
      parserOptions: {sourceType: 'module'},
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code:
        'import * as events from "delegated-events"; if (true) { events.on("click", "div", function(event){}) }',
      parserOptions: {sourceType: 'module'},
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code:
        'import {on} from "delegated-events"; if (true) { on("click", "div", function(event){}) }',
      parserOptions: {sourceType: 'module'},
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code:
        'import {on} from "delegated-events"; for (const x of y) { on(x, "div", function(event){}) }',
      parserOptions: {sourceType: 'module'},
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code:
        'import {on} from "delegated-events"; function x() { on("click", "div", function(event){}) }',
      parserOptions: {sourceType: 'module'},
      errors: [{message: error, type: 'CallExpression'}]
    }
  ]
})
