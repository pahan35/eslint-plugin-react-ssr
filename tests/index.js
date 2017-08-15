/* eslint-env mocha */
'use strict';

const plugin = require('..');

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const ruleFiles = fs.readdirSync(path.resolve(__dirname, '../lib/rules/'))
  .map(f => path.basename(f, '.js'));

describe('all rule files should be exported by the plugin', () => {
  ruleFiles.forEach(ruleName => {
    it(`should export ${ruleName}`, () => {
      assert.equal(
        plugin.rules[ruleName],
        require(path.join('../lib/rules', ruleName))
      );
    });
  });
});

describe('deprecated rules', () => {
  it('marks all deprecated rules as deprecated', () => {
    ruleFiles.forEach(ruleName => {
      const inDeprecatedRules = Boolean(plugin.deprecatedRules[ruleName]);
      const isDeprecated = plugin.rules[ruleName].meta.deprecated;
      if (inDeprecatedRules) {
        assert(isDeprecated, `${ruleName} metadata should mark it as deprecated`);
      } else {
        assert(!isDeprecated, `${ruleName} metadata should not mark it as deprecated`);
      }
    });
  });
});

describe('configurations', () => {
  it('should export a \'all\' configuration', () => {
    assert(plugin.configs.all);
    Object.keys(plugin.configs.all.rules).forEach(configName => {
      assert.equal(configName.indexOf('react/'), 0);
      assert.equal(plugin.configs.all.rules[configName], 2);
    });
    ruleFiles.forEach(ruleName => {
      const inDeprecatedRules = Boolean(plugin.deprecatedRules[ruleName]);
      const inAllConfig = Boolean(plugin.configs.all.rules[`react/${ruleName}`]);
      assert(inDeprecatedRules ^ inAllConfig);
    });
  });
});
