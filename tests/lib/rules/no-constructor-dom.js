/**
 * @fileoverview Prevent usage of window/document in componentWillMount
 * @author Yuthasak Tanruengsri
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-constructor-dom');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 8,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true
  }
};

require('babel-eslint');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('no-constructor-dom', rule, {

  valid: [{
    code: [
      'class Hello extends Component {',
      '  constructor() {',
      '    super();',
      '  }',
      '}'
    ].join('\n')
  }, {
    code: [
      'class Hello extends Component {',
      '  constructor() {',
      '    super();',
      '    this.propA = \'foo\';',
      '  }',
      '}'
    ].join('\n'),
    parser: 'babel-eslint'
  }],

  invalid: [{
    code: [
      'class Hello extends Component {',
      '  constructor() {',
      '    super();',
      '    this.propA = window.matchMedia(\'(orientation: portrait)\');',
      '  }',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Do not use window/document in constructor'
    }]
  }, {
    code: [
      'class Hello extends Component {',
      '  constructor() {',
      '    super();',
      '    this.propA = window.matchMedia(\'(orientation: portrait)\');',
      '  }',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Do not use window/document in constructor'
    }],
    parser: 'babel-eslint'
  }, {
    code: [
      'class Hello extends Component {',
      '  constructor() {',
      '    super();',
      '    this.propA = window.matchMedia(\'(orientation: portrait)\');',
      '  }',
      '}'
    ].join('\n'),
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use window/document in constructor'
    }]
  }, {
    code: [
      'class Hello extends Component {',
      '  constructor() {',
      '    super();',
      '    this.propA = window.matchMedia(\'(orientation: portrait)\');',
      '  }',
      '}'
    ].join('\n'),
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use window/document in constructor'
    }],
    parser: 'babel-eslint'
  }, {
    code: [
      'class Hello extends Component {',
      '  constructor() {',
      '    super();',
      '    someClass.onSomeEvent(function(data) {',
      '       window.addEventListener(\'someType\',',
      '       () => {});',
      '    })',
      '  }',
      '}'
    ].join('\n'),
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use window/document in constructor'
    }],
    parser: 'babel-eslint'
  }, {
    code: [
      'class Hello extends Component {',
      '  constructor() {',
      '    super();',
      '    if (true) {',
      '       window.addEventListener(\'someType\',',
      '       () => {});',
      '    }',
      '  }',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Do not use window/document in constructor'
    }]
  }, {
    code: [
      'class Hello extends Component {',
      '  constructor() {',
      '    super();',
      '    if (true) {',
      '       window.addEventListener(\'someType\',',
      '       () => {});',
      '    }',
      '  }',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Do not use window/document in constructor'
    }],
    parser: 'babel-eslint'
  }, {
    code: [
      'class Hello extends React.Component {',
      '  constructor() {',
      '    someClass.onSomeEvent((data) => window.addEventListener(\'someType\', () => {}));',
      '  }',
      '}'
    ].join('\n'),
    parser: 'babel-eslint',
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use window/document in constructor'
    }]
  }, {
    code: [
      'class Hello extends Component {',
      '  constructor() {',
      '    super();',
      '    this.propA = document.getElementById(\'someElement\');',
      '  }',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Do not use window/document in constructor'
    }]
  }, {
    code: [
      'class Hello extends Component {',
      '  constructor() {',
      '    super();',
      '    this.propA = document.getElementById(\'someElement\');',
      '  }',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Do not use window/document in constructor'
    }],
    parser: 'babel-eslint'
  }, {
    code: [
      'class Hello extends Component {',
      '  constructor() {',
      '    super();',
      '    this.propA = document.getElementById(\'someElement\');',
      '  }',
      '}'
    ].join('\n'),
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use window/document in constructor'
    }]
  }, {
    code: [
      'class Hello extends Component {',
      '  constructor() {',
      '    super();',
      '    this.propA = document.getElementById(\'someElement\');',
      '  }',
      '}'
    ].join('\n'),
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use window/document in constructor'
    }],
    parser: 'babel-eslint'
  }, {
    code: [
      'class Hello extends Component {',
      '  constructor() {',
      '    super();',
      '    someClass.onSomeEvent(function(data) {',
      '      this.propA = document.getElementById(\'someElement\');',
      '    })',
      '  }',
      '}'
    ].join('\n'),
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use window/document in constructor'
    }],
    parser: 'babel-eslint'
  }, {
    code: [
      'class Hello extends Component {',
      '  constructor() {',
      '    super();',
      '    if (true) {',
      '      this.propA = document.getElementById(\'someElement\');',
      '    }',
      '  }',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Do not use window/document in constructor'
    }]
  }, {
    code: [
      'class Hello extends Component {',
      '  constructor() {',
      '    super();',
      '    if (true) {',
      '      this.propA = document.getElementById(\'someElement\');',
      '    }',
      '  }',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Do not use window/document in constructor'
    }],
    parser: 'babel-eslint'
  }, {
    code: [
      'class Hello extends React.Component {',
      '  constructor() {',
      '    someClass.onSomeEvent((data) => document.getElementById(\'someElement\'));',
      '  }',
      '}'
    ].join('\n'),
    parser: 'babel-eslint',
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use window/document in constructor'
    }]
  }]
});
