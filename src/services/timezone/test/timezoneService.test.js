import { getTimezones } from '../timezoneService';

describe('timezoneService', () => {
  it('should return the correct time zone', () => {
    let ldnTimezone = '(UTC+01:00) Europe/London';
    const userTimeZone = getTimezones()['Europe/London'];
    expect(userTimeZone.label).toEqual(ldnTimezone);
  });
});
