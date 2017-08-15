/**
 * @fileoverview Prevent usage of window/document in constructor()
 * @author Yuthasak Tanruengsri
 */
'use strict';

const makeNoMethodDomRule = require('../util/makeNoMethodDomRule');

module.exports = makeNoMethodDomRule('constructor');
