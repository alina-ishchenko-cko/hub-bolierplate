import { OPERATION } from 'config';
import { isUndefined } from 'utils';

const Authorisation = {
  user: {},
  implicit: {},
  permissions: {},

  // Set the user
  setUser(user) {
    this.user = user;
  },

  // Set the permissions
  setPermissions() {
    this.permissions = (this.user.permissions || []).reduce(
      (permissionsObject, item) => {
        // store permissions as object, its keys being the permission names - easier for lookup
        let itemName = item.name.toUpperCase().replace(/ /g, '');

        this.implicit[itemName] = false;
        permissionsObject[itemName] = item.permission;

        if (itemName.match(/[^:]:[^:]/)) {
          let msg =
            'Possibly invalid permission name with a single ":" character => ' +
            item.name;
          if (process.env.NODE_ENV === 'development') console.warn(msg);
        }

        while (itemName.indexOf('::') >= 0) {
          itemName = itemName.match(/(.*)::[^:]*$/)[1];

          if (
            isUndefined(permissionsObject[itemName]) ||
            this.implicit[itemName]
          ) {
            // when top-level permission is unspecified, implicitly set it to the sum of sub-level permissions
            this.implicit[itemName] = true;
            permissionsObject[itemName] =
              permissionsObject[itemName] | item.permission;
          }
        }

        return permissionsObject;
      },
      {}
    );
  },

  /**
   * Checks for the allowed permissions
   * @param {Int} operation
   * @return {function}
   */
  checkPermission(operation) {
    const cache = {};
    return resource => {
      if (typeof cache[resource] === 'boolean') {
        return cache[resource];
      }

      let msg;
      let normalisedName = resource.toUpperCase().replace(/ /g, '');
      let permissionLevel = this.permissions[normalisedName];

      if (normalisedName.match(/[^:]:[^:]/)) {
        msg =
          'Possibly invalid permission name with a single ":" character => ' +
          resource;
        if (process.env.NODE_ENV === 'development') console.warn(msg);
      }

      while (
        isUndefined(permissionLevel) &&
        normalisedName.indexOf('::') >= 0
      ) {
        // no permission is set explicitly, but may have been set at a higher level - check that.
        normalisedName = normalisedName.match(/(.*)::[^:]*$/)[1];

        if (!this.implicit[normalisedName]) {
          permissionLevel = this.permissions[normalisedName];
        }
      }

      if (isUndefined(permissionLevel)) {
        msg = 'Authorisation denied for unknown component: ' + resource;
        if (process.env.NODE_ENV === 'development') console.warn(msg);
      }

      return (cache[resource] = !!(operation & permissionLevel)); // bitwise inside brackets, not conditional - casted to a boolean
    };
  },
};

/**
 * Initalise the Auth service
 * @param {object} user
 */
export const initAuthorisation = user => {
  Authorisation.setUser(user);
  Authorisation.setPermissions();
};

/**
 * Map the user permissions to
 * canCreate, canDelete, canRead and canUpdate
 */
export const auth = {
  canCreate: Authorisation.checkPermission(OPERATION.CREATE),
  canDelete: Authorisation.checkPermission(OPERATION.DELETE),
  canRead: Authorisation.checkPermission(OPERATION.READ),
  canView: Authorisation.checkPermission(OPERATION.READ),
  canUpdate: Authorisation.checkPermission(OPERATION.UPDATE),
};
