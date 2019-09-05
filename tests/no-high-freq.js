'use strict'

const rule = require('../rules/no-high-freq')
const RuleTester = require('eslint').RuleTester

const error = 'High-frequency delegated events are not allowed'

const ruleTester = new RuleTester({parserOptions: {ecmaVersion: 6}})
ruleTester.run('no-high-freq', rule, {
  valid: [
    {
      code: 'on("click", "div", function(){})',
      parserOptions: {sourceType: 'script'}
    },
    {
      code: 'on("input", "div", function(){})',
      parserOptions: {sourceType: 'script'}
    },
    {
      code: 'on("input", "div", function(){})',
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
        'import {on} from "not-delegated-events"; on("input", "div", function(){})',
      parserOptions: {sourceType: 'module'}
    }
  ],
  invalid: [
    {
      code:
        'import {on as alias} from "delegated-events"; alias("input", "div", function(event){})',
      parserOptions: {sourceType: 'module'},
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code:
        'import * as events from "delegated-events"; events.on("input", "div", function(event){})',
      parserOptions: {sourceType: 'module'},
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code:
        'import {on} from "delegated-events"; on("input", "div", function(event){})',
      parserOptions: {sourceType: 'module'},
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code:
        'import {on} from "delegated-events"; on("keydown", "div", function(event){})',
      parserOptions: {sourceType: 'module'},
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code:
        'import {on} from "delegated-events"; on("keypress", "div", function(event){})',
      parserOptions: {sourceType: 'module'},
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code:
        'import {on} from "delegated-events"; on("keyup", "div", function(event){})',
      parserOptions: {sourceType: 'module'},
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code:
        'import {on} from "delegated-events"; on("mouseout", "div", function(event){})',
      parserOptions: {sourceType: 'module'},
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code:
        'import {on} from "delegated-events"; on("mouseover", "div", function(event){})',
      parserOptions: {sourceType: 'module'},
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code:
        'import {on} from "delegated-events"; on("mousemove", "div", function(event){})',
      parserOptions: {sourceType: 'module'},
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code:
        'import {on} from "delegated-events"; on("scroll", "div", function(event){})',
      parserOptions: {sourceType: 'module'},
      errors: [{message: error, type: 'CallExpression'}]
    }
  ]
})
