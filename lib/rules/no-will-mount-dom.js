/**
 * @fileoverview Prevent usage of window/document in componentWillMount()
 * @author Yuthasak Tanruengsri
 */
'use strict';

const makeNoMethodDomRule = require('../util/makeNoMethodDomRule');

module.exports = makeNoMethodDomRule('componentWillMount');
