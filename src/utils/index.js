// @flow
export const getParameterByName = (name: string, url?: string) => {
  if (!url) {
    url = window.location.href;
  }

  if (!url.includes('?')) {
    url += `?${url}`;
  }

  name = name.replace(/[[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

/**
 * Converts URL Params to object
 */
export function urlParamsToJson(search: string = ''): Object {
  if (!search) return {};
  search = search.substring(1);
  return JSON.parse(
    `{"${decodeURI(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`
  );
}

/**
 * List of Frequency values for payment subscriptions.
 * @type {array}
 */
const frequencies = [
  { name: 'Daily', noun: 'Day', code: '1d', unit: 'd' },
  { name: 'Weekly', noun: 'Week', code: '1w', unit: 'w' },
  { name: 'Monthly', noun: 'Month', code: '1m', unit: 'm' },
  { name: 'Every 3 Months', noun: 'Month', code: '3m', unit: 'm' },
  { name: 'Every 6 Months', noun: 'Month', code: '6m', unit: 'm' },
  { name: 'Yearly', noun: 'Year', code: '1y', unit: 'y' },
  { name: 'Custom', noun: undefined, code: undefined, unit: undefined },
];

export function getFrequencyString(cycle: string): string {
  // Get all leading digits
  const regex = /^(\d+)/;
  const unit = cycle.slice(-1);
  let frequencyString = 'Unknown';

  const found = frequencies.find(frequency => unit === frequency.unit);

  if (found) {
    const result = regex.exec(cycle);

    if (result) {
      if (result[0] > 1) {
        frequencyString = `Every ${result[0]} ${found.noun || ''}s`;
      } else {
        frequencyString = `Every ${found.noun || ''}`;
      }
    }
  }

  return frequencyString;
}

/**
 * Returns a human readable duration string given a duration and cycle
 * (i.e. '5', '1y' returns '5 years')
 * @param {number} duration - The duration (i.e '5')
 * @param {string} cycle - The cycle (i.e. '1y')
 * @returns {string} The human readable duration string
 */
export function getDurationString(duration: number, cycle: string): string {
  let durationString = 'Unknown';
  const unit = cycle.slice(-1);
  const found = frequencies.find(frequency => unit === frequency.unit);
  if (found) {
    durationString = `${duration} ${found.noun || ''}`;

    if (duration > 1) {
      durationString += 's';
    }
  }
  return durationString;
}

/**
 * Returns a human readable auto capture time string given an auto capture
 * (i.e. '5' returns '5 Hours')
 * @param {number} autoCapTime - The auto capture time
 * @returns {string} The human readable auto capture time string
 */
export function getAutoCaptureTimeString(autoCapTime: number): string {
  let autoCapTimeString = '';

  if (autoCapTime === 0) {
    autoCapTimeString = 'Immediately';
  } else if (autoCapTime > 0) {
    autoCapTimeString = `${autoCapTime} Hour`;

    if (autoCapTime > 1) {
      autoCapTimeString += 's';
    }
  } else {
    autoCapTimeString = 'Unknown';
  }

  return autoCapTimeString;
}

export const paymentPlanStatusCodes = {
  FAILED_INITIAL: 0,
  ACTIVE: 1,
  CANCELLED: 2,
  IN_ARREARS: 3,
  SUSPENDED: 4,
  COMPLETED: 5,
  AUTO_SUSPENDED: 6,
};

export const paymentPlanStatuses: Map<number, Object> = new Map([
  [
    0,
    {
      status: 'Failed Initial',
      allowedActions: {
        suspend: false,
        enable: false,
        edit: false,
        delete: false,
      },
    },
  ],
  [
    1,
    {
      status: 'Active',
      allowedActions: {
        suspend: true,
        enable: false,
        edit: true,
        delete: true,
      },
    },
  ],
  [
    2,
    {
      status: 'Cancelled',
      allowedActions: {
        suspend: false,
        enable: false,
        edit: false,
        delete: false,
      },
    },
  ],
  [
    3,
    {
      status: 'In Arrears',
      allowedActions: {
        suspend: false,
        enable: false,
        edit: false,
        delete: false,
      },
    },
  ],
  [
    4,
    {
      status: 'Suspended',
      allowedActions: {
        suspend: false,
        enable: true,
        edit: false,
        delete: true,
      },
    },
  ],
  [
    5,
    {
      status: 'Completed',
      allowedActions: {
        suspend: false,
        enable: false,
        edit: false,
        delete: true,
      },
    },
  ],
  [
    6,
    {
      status: 'Auto Suspended',
      allowedActions: {
        suspend: false,
        enable: false,
        edit: false,
        delete: false,
      },
    },
  ],
]);

/**
 * Check if value is undefined
 * @param {Any} value
 * @return {Boolean}
 */
export function isUndefined(value: any): boolean {
  return !!(
    value === void 0 ||
    value === 'undefined' ||
    (typeof value === 'string' && value.indexOf('undefined') >= 0)
  );
}
