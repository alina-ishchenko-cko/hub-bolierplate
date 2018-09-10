import { tz as momentTz, utc as momentUtc } from 'moment-timezone';
import every from 'lodash/every';

let timezones;

/**
 * Get the time zones options
 * @returns {object}
 */
export const getTimezones = () => {
  if (timezones) {
    return timezones;
  }

  timezones = momentTz
    .names()
    .filter(name => {
      return isStandardGMT() || (!isExplicitOffset() && !isAcronym());

      function isStandardGMT() {
        return name.toUpperCase() === 'GMT';
      }

      function isExplicitOffset() {
        return (
          name.indexOf('-') >= 0 ||
          name.indexOf('+') >= 0 ||
          name.indexOf('Etc/') === 0
        );
      }

      function isAcronym() {
        return every(name, c => {
          return c.toUpperCase() === c;
        });
      }
    })
    .map(name => {
      const timezone = momentTz.zone(name);

      const utcOffset = -timezone.utcOffset(momentUtc());
      const offsetStringRep = (() => {
        let prefix = utcOffset >= 0 ? 'UTC+' : 'UTC-';

        let absOffset = Math.abs(utcOffset);
        let hours = Math.floor(absOffset / 60);
        let minutes = absOffset % 60;
        hours = (hours < 10 ? '0' : '') + hours;
        minutes = (minutes < 10 ? '0' : '') + minutes;

        return prefix + hours + ':' + minutes;
      })();

      return {
        name: timezone.name,
        label: '(' + offsetStringRep + ') ' + timezone.name.replace(/_/g, ' '),
        offset: utcOffset
      };
    });

  timezones.forEach(timezone => {
    timezones[timezone.name] = timezone;
  });

  return timezones;
};
