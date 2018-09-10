import * as utils from '../';
import { LOGIN_TYPE } from 'store/constants';
import moment from 'moment';
import { ENTITY_TYPE } from 'config';

describe('Utils', () => {
  describe('getParameterByName()', () => {
    it('should get URL Param by name', () => {
      const urlParams = utils.getParameterByName(
        'token',
        'token=1234567&id=500'
      );
      expect(urlParams).toEqual('1234567');
    });
  });

  describe('urlParamsToJson()', () => {
    it('should convert URL params to object', () => {
      const urlParams = utils.urlParamsToJson('?token=1234567&id=500');
      expect(urlParams.token).toEqual('1234567');
      expect(urlParams.id).toEqual('500');
    });
  });

  describe('urlParamsToJson()', () => {
    it('should convert URL params to object', () => {
      const urlParams = utils.urlParamsToJson('?token=1234567&id=500');
      expect(urlParams.token).toEqual('1234567');
      expect(urlParams.id).toEqual('500');
    });
  });

  describe('getFrequencyString()', () => {
    it('Retrieves a human readable frequency string', () => {
      let cycle, frequencyString;

      cycle = '2d';
      frequencyString = utils.getFrequencyString(cycle);
      expect(frequencyString).toEqual('Every 2 Days');

      cycle = '2w';
      frequencyString = utils.getFrequencyString(cycle);
      expect(frequencyString).toEqual('Every 2 Weeks');

      cycle = '2m';
      frequencyString = utils.getFrequencyString(cycle);
      expect(frequencyString).toEqual('Every 2 Months');

      cycle = '2y';
      frequencyString = utils.getFrequencyString(cycle);
      expect(frequencyString).toEqual('Every 2 Years');

      cycle = '1y';
      frequencyString = utils.getFrequencyString(cycle);
      expect(frequencyString).toEqual('Every Year');

      cycle = '2z';
      frequencyString = utils.getFrequencyString(cycle);
      expect(frequencyString).toEqual('Unknown');
    });
  });

  describe('getAutoCaptureTimeString()', () => {
    it('Retrieves a human readable auto capture time string', () => {
      let autoCapTime, autoCapTimeString;

      autoCapTime = 0;
      autoCapTimeString = utils.getAutoCaptureTimeString(autoCapTime);
      expect(autoCapTimeString).toEqual('Immediately');

      autoCapTime = 5;
      autoCapTimeString = utils.getAutoCaptureTimeString(autoCapTime);
      expect(autoCapTimeString).toEqual('5 Hours');

      autoCapTime = -1;
      autoCapTimeString = utils.getAutoCaptureTimeString(autoCapTime);
      expect(autoCapTimeString).toEqual('Unknown');

      autoCapTime = 'Garbage';
      autoCapTimeString = utils.getAutoCaptureTimeString(autoCapTime);
      expect(autoCapTimeString).toEqual('Unknown');

      autoCapTime = 1;
      autoCapTimeString = utils.getAutoCaptureTimeString(autoCapTime);
      expect(autoCapTimeString).toEqual('1 Hour');
    });
  });

  describe('getDurationString()', () => {
    it('Retrieves a human readable duration string', () => {
      let duration, cycle, durationString;

      duration = '5';
      cycle = '1d';
      durationString = utils.getDurationString(duration, cycle);
      expect(durationString).toEqual('5 Days');

      duration = '5';
      cycle = '1w';
      durationString = utils.getDurationString(duration, cycle);
      expect(durationString).toEqual('5 Weeks');

      duration = '5';
      cycle = '1m';
      durationString = utils.getDurationString(duration, cycle);
      expect(durationString).toEqual('5 Months');

      duration = '5';
      cycle = '1y';
      durationString = utils.getDurationString(duration, cycle);
      expect(durationString).toEqual('5 Years');

      duration = '1';
      cycle = '1y';
      durationString = utils.getDurationString(duration, cycle);
      expect(durationString).toEqual('1 Year');

      duration = '5';
      cycle = '1z';
      durationString = utils.getDurationString(duration, cycle);
      expect(durationString).toEqual('Unknown');
    });
  });

  describe('isUndefined()', () => {
    it('should be true', () => {
      const id = undefined;
      expect(utils.isUndefined(id)).toEqual(true);
    });
    it('should  be true', () => {
      const data = {};
      expect(utils.isUndefined(data.id)).toEqual(true);
    });
    it('should  be true', () => {
      const data = 'undefined';
      expect(utils.isUndefined(data)).toEqual(true);
    });
    it('should be defined', () => {
      const data = 'test';
      expect(utils.isUndefined(data)).toEqual(false);
    });
  });
});
