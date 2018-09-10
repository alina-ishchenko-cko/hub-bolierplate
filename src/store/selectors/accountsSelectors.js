import { createSelector } from 'reselect';

export const getAccountsArray = ({ global }) => global.data.accounts;
export const getBusinessesArray = ({ global }) => global.data.businesses;
export const getSelectedAccount = ({ global }) => global.selected.account.id;
export const getSelectedBusiness = ({ global }) => global.selected.business.id;

/**
 * Get the list of channels for selected business. Returns [] if no business were selected
 */
export const getBusinessChannels = createSelector(
  [
    getSelectedAccount,
    getSelectedBusiness,
    getAccountsArray,
    getBusinessesArray,
  ],
  (selectedAccountId, selectedBusinessId, accounts, businesses) => {
    if (!selectedBusinessId) {
      return [];
    }
    const selectedBusiness = businesses[selectedAccountId].find(
      business => business.propertyId === selectedBusinessId
    );

    return selectedBusiness.channels;
  }
);
