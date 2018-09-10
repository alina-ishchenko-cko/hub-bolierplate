let cachedBusinesses = {};

/**
 * Cache the accounts
 * @param {object} businesses
 */
export function storeBusinesses(businesses: any): void {
  cachedBusinesses = { ...businesses };
}

/**
 * Get business by propertyId
 * @param {number} accountId
 * @param {number} propertyId
 * @return {object}
 */
export function getBusinessById(accountId: number, propertyId: number): any {
  if (!accountId || !propertyId) {
    return {};
  }

  // Get the Account by accountId
  const businesses = cachedBusinesses[accountId];

  // If no account match, return empty object
  if (!businesses) {
    return {};
  }

  // Return business that matches the propertyId
  const business = businesses.find(
    business => business.propertyId === propertyId
  );
  return business || {};
}
