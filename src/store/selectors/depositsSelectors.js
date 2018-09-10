import { createSelector } from 'reselect';

export const getListStatements = ({ deposits }) => deposits.list.statements;
export const getGroupsStatements = ({ deposits }) => deposits.groups;
export const isAccountLevel = ({ accounts }) =>
  accounts.selection.businessSelected === null;

export const getStatementsData = createSelector(
  [getListStatements, getGroupsStatements, isAccountLevel],
  (listStatements = [], groupStatements, isAccountLevel) => {
    const filteredStatements = listStatements.filter(
      statement => statement.isValidated
    );
    if (!isAccountLevel) return filteredStatements;
    return filteredStatements.map(statementGroup => {
      const dataGroup = {
        ...statementGroup
      };
      const children = groupStatements[statementGroup.statementId];
      dataGroup.children =
        typeof children === 'undefined' ? [] : children.statements;
      return dataGroup;
    });
  }
);
