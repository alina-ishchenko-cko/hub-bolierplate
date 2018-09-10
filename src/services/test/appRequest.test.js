import * as AppRequest from '../appRequest';
import moxios from 'moxios';

describe('AppRequest', () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should be clear on inital - url', () => {
    expect(AppRequest.getUrl()).toEqual('');
  });

  it('should set the url', () => {
    AppRequest.setUrl('http://192.168.1.253');
    expect(AppRequest.getUrl()).toEqual('http://192.168.1.253');
  });

  it('should be clear in inital - token', () => {
    expect(AppRequest.getToken()).toEqual('');
  });

  it('should set the token', () => {
    AppRequest.setToken('039d572a190d40ed8dabbd53c9767c8f');
    expect(AppRequest.getToken()).toEqual('039d572a190d40ed8dabbd53c9767c8f');
  });

  it('should be clear in inital - currencyId', () => {
    expect(AppRequest.getCurrencyId()).toEqual('');
  });

  it('should set the token', () => {
    AppRequest.setCurrencyId('126');
    expect(AppRequest.getCurrencyId()).toEqual('126');
  });

  it('should contain get method', () => {
    const request = AppRequest.ajxPromise;
    expect(request.get).toBeDefined();
    expect(typeof request.get).toEqual('function');
  });

  it('should contain post method', () => {
    const request = AppRequest.ajxPromise;
    expect(request.post).toBeDefined();
    expect(typeof request.post).toEqual('function');
  });

  it('should contain put method', () => {
    const request = AppRequest.ajxPromise;
    expect(request.put).toBeDefined();
    expect(typeof request.put).toEqual('function');
  });

  it('should contain delete method', () => {
    const request = AppRequest.ajxPromise;
    expect(request.delete).toBeDefined();
    expect(typeof request.delete).toEqual('function');
  });

  it('should return promise for ajxPromise methods', () => {
    const request = AppRequest.ajxPromise;
    expect(request.get().then).toBeDefined();
    expect(request.post().then).toBeDefined();
    expect(request.put().then).toBeDefined();
    expect(request.delete().then).toBeDefined();
  });

  it('should clear all the data', () => {
    AppRequest.clearAppData();
    expect(AppRequest.getCurrencyId()).toEqual('');
    expect(AppRequest.getToken()).toEqual('');
  });
});
