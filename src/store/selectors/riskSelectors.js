import { createSelector } from 'reselect';

export const getBlacklistAttributes = ({ risk }) => risk.attributes.data;

export const getBlacklistAttributesSelect = createSelector(
  [getBlacklistAttributes],
  attributes =>
    attributes.map(attribute => {
      return {
        key: attribute.attributeType,
        value: attribute.attributeType,
        label: attribute.description
      };
    })
);

export const getAvsActions = ({ risk }) => risk.avs.actions.data;

export const getAvsActionsSelect = createSelector([getAvsActions], actions =>
  actions.map(action => {
    return {
      key: action.id.toString(),
      value: action.id.toString(),
      label: action.action
    };
  })
);

export const getVelocityRules = ({ risk }) => risk.velocity.list.data;
export const getVelocityRulesSortedByType = createSelector(
  [getVelocityRules],
  rules =>
    rules.reduce((acc, rule, index) => {
      if (typeof acc[rule.velocityRuleType] === 'undefined')
        acc[rule.velocityRuleType] = [rule];
      else acc[rule.velocityRuleType].push(rule);
      return acc;
    }, {})
);
