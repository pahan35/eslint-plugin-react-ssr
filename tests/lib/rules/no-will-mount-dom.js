/**
 * @fileoverview Prevent usage of window/document in componentWillMount
 * @author Yuthasak Tanruengsri
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-will-mount-dom');
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
ruleTester.run('no-will-mount-dom', rule, {

  valid: [{
    code: [
      'var Hello = createReactClass({',
      '  render: function() {',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '});'
    ].join('\n')
  }, {
    code: [
      'var Hello = createReactClass({',
      '  componentWillMount: function() {}',
      '});'
    ].join('\n')
  }, {
    code: [
      'var Hello = createReactClass({',
      '  componentWillMount: function() {',
      '    someNonMemberFunction(arg);',
      '    this.someHandler = this.setState;',
      '  }',
      '});'
    ].join('\n')
  }, {
    code: [
      'var Hello = createReactClass({',
      '  componentDidMount: function() {',
      '    someClass.onSomeEvent(function(data) {',
      '      window.addEventListener(\'someType\',',
      '      () => {});',
      '    })',
      '  }',
      '});'
    ].join('\n')
  }, {
    code: [
      'var Hello = createReactClass({',
      '  componentDidMount: function() {',
      '    function handleEvent(data) {',
      '      window.addEventListener(\'someType\',',
      '      () => {});',
      '    }',
      '    someClass.onSomeEvent(handleEvent)',
      '  }',
      '});'
    ].join('\n'),
    parser: 'babel-eslint'
  }],

  invalid: [{
    code: [
      'var Hello = createReactClass({',
      '  componentWillMount: function() {',
      '    window.addEventListener(\'someType\',',
      '    () => {});',
      '  }',
      '});'
    ].join('\n'),
    errors: [{
      message: 'Do not use window/document in componentWillMount'
    }]
  }, {
    code: [
      'class Hello extends React.Component {',
      '  componentWillMount() {',
      '    window.addEventListener(\'someType\',',
      '    () => {});',
      '  }',
      '}'
    ].join('\n'),
    parser: 'babel-eslint',
    errors: [{
      message: 'Do not use window/document in componentWillMount'
    }]
  }, {
    code: [
      'var Hello = createReactClass({',
      '  componentWillMount: function() {',
      '    window.addEventListener(\'someType\',',
      '    () => {});',
      '  }',
      '});'
    ].join('\n'),
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use window/document in componentWillMount'
    }]
  }, {
    code: [
      'class Hello extends React.Component {',
      '  componentWillMount() {',
      '    window.addEventListener(\'someType\',',
      '    () => {});',
      '  }',
      '}'
    ].join('\n'),
    parser: 'babel-eslint',
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use window/document in componentWillMount'
    }]
  }, {
    code: [
      'var Hello = createReactClass({',
      '  componentWillMount: function() {',
      '    someClass.onSomeEvent(function(data) {',
      '       window.addEventListener(\'someType\',',
      '       () => {});',
      '    })',
      '  }',
      '});'
    ].join('\n'),
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use window/document in componentWillMount'
    }]
  }, {
    code: [
      'class Hello extends React.Component {',
      '  componentWillMount() {',
      '    someClass.onSomeEvent(function(data) {',
      '       window.addEventListener(\'someType\',',
      '       () => {});',
      '    })',
      '  }',
      '}'
    ].join('\n'),
    parser: 'babel-eslint',
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use window/document in componentWillMount'
    }]
  }, {
    code: [
      'var Hello = createReactClass({',
      '  componentWillMount: function() {',
      '    if (true) {',
      '       window.addEventListener(\'someType\',',
      '       () => {});',
      '    }',
      '  }',
      '});'
    ].join('\n'),
    errors: [{
      message: 'Do not use window/document in componentWillMount'
    }]
  }, {
    code: [
      'class Hello extends React.Component {',
      '  componentWillMount() {',
      '    if (true) {',
      '       window.addEventListener(\'someType\',',
      '       () => {});',
      '    }',
      '  }',
      '}'
    ].join('\n'),
    parser: 'babel-eslint',
    errors: [{
      message: 'Do not use window/document in componentWillMount'
    }]
  }, {
    code: [
      'var Hello = createReactClass({',
      '  componentWillMount: function() {',
      '    someClass.onSomeEvent((data) => window.addEventListener(\'someType\', () => {}));',
      '  }',
      '});'
    ].join('\n'),
    parser: 'babel-eslint',
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use window/document in componentWillMount'
    }]
  }, {
    code: [
      'class Hello extends React.Component {',
      '  componentWillMount() {',
      '    someClass.onSomeEvent((data) => window.addEventListener(\'someType\', () => {}));',
      '  }',
      '}'
    ].join('\n'),
    parser: 'babel-eslint',
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use window/document in componentWillMount'
    }]
  }, {
    code: [
      'var Hello = createReactClass({',
      '  componentWillMount: function() {',
      '    document.getElementById(\'someElement\');',
      '  }',
      '});'
    ].join('\n'),
    errors: [{
      message: 'Do not use window/document in componentWillMount'
    }]
  }, {
    code: [
      'class Hello extends React.Component {',
      '  componentWillMount() {',
      '    document.getElementById(\'someElement\');',
      '  }',
      '}'
    ].join('\n'),
    parser: 'babel-eslint',
    errors: [{
      message: 'Do not use window/document in componentWillMount'
    }]
  }, {
    code: [
      'var Hello = createReactClass({',
      '  componentWillMount: function() {',
      '    document.getElementById(\'someElement\');',
      '  }',
      '});'
    ].join('\n'),
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use window/document in componentWillMount'
    }]
  }, {
    code: [
      'class Hello extends React.Component {',
      '  componentWillMount() {',
      '    document.getElementById(\'someElement\');',
      '  }',
      '}'
    ].join('\n'),
    parser: 'babel-eslint',
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use window/document in componentWillMount'
    }]
  }, {
    code: [
      'var Hello = createReactClass({',
      '  componentWillMount: function() {',
      '    someClass.onSomeEvent(function(data) {',
      '      document.getElementById(\'someElement\');',
      '    })',
      '  }',
      '});'
    ].join('\n'),
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use window/document in componentWillMount'
    }]
  }, {
    code: [
      'class Hello extends React.Component {',
      '  componentWillMount() {',
      '    someClass.onSomeEvent(function(data) {',
      '      document.getElementById(\'someElement\');',
      '    })',
      '  }',
      '}'
    ].join('\n'),
    parser: 'babel-eslint',
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use window/document in componentWillMount'
    }]
  }, {
    code: [
      'var Hello = createReactClass({',
      '  componentWillMount: function() {',
      '    if (true) {',
      '      document.getElementById(\'someElement\');',
      '    }',
      '  }',
      '});'
    ].join('\n'),
    errors: [{
      message: 'Do not use window/document in componentWillMount'
    }]
  }, {
    code: [
      'class Hello extends React.Component {',
      '  componentWillMount() {',
      '    if (true) {',
      '      document.getElementById(\'someElement\');',
      '    }',
      '  }',
      '}'
    ].join('\n'),
    parser: 'babel-eslint',
    errors: [{
      message: 'Do not use window/document in componentWillMount'
    }]
  }, {
    code: [
      'var Hello = createReactClass({',
      '  componentWillMount: function() {',
      '    someClass.onSomeEvent((data) => document.getElementById(\'someElement\'));',
      '  }',
      '});'
    ].join('\n'),
    parser: 'babel-eslint',
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use window/document in componentWillMount'
    }]
  }, {
    code: [
      'class Hello extends React.Component {',
      '  componentWillMount() {',
      '    someClass.onSomeEvent((data) => document.getElementById(\'someElement\'));',
      '  }',
      '}'
    ].join('\n'),
    parser: 'babel-eslint',
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use window/document in componentWillMount'
    }]
  }]
});
