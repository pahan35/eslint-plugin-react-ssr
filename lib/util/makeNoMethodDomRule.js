/**
 * @fileoverview Prevent usage of window/document in lifecycle methods
 * @author Yuthasak Tanruengsri
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

function makeNoMethodSetStateRule(methodName) {
  return {
    meta: {
      docs: {
        description: `Prevent usage of window/document in ${methodName}`,
        category: 'Best Practices',
        recommended: true,
        deprecated: false
      },

      schema: [{
        enum: ['disallow-in-func']
      }]
    },

    create: function(context) {
      const mode = context.options[0] || 'allow-in-func';

      // --------------------------------------------------------------------------
      // Public
      // --------------------------------------------------------------------------

      return {

        CallExpression: function(node) {
          const callee = node.callee;

          const useWindow =
            (callee.name === 'window') ||
            (callee.object && callee.object.name === 'window')
          ;
          const useDocument =
            (callee.name === 'document') ||
            (callee.object && callee.object.name === 'document')
          ;

          if (
            !useWindow && !useDocument
          ) {
            return;
          }

          const ancestors = context.getAncestors(callee).reverse();
          let depth = 0;
          for (let i = 0, j = ancestors.length; i < j; i++) {
            if (/Function(Expression|Declaration)$/.test(ancestors[i].type)) {
              depth++;
            }
            if (
              (ancestors[i].type !== 'Property' && ancestors[i].type !== 'MethodDefinition') ||
              ancestors[i].key.name !== methodName ||
              (mode !== 'disallow-in-func' && depth > 1)
            ) {
              continue;
            }

            context.report({
              node: callee,
              message: `Do not use window/document in ${methodName}`
            });
            break;
          }
        }
      };
    }
  };
}

module.exports = makeNoMethodSetStateRule;
