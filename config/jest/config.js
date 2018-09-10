import { shallow, render, mount } from 'enzyme';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

// Promise request mock up
global.moxios = moxios;

// Redux
global.thunk = thunk;
global.configureMockStore = configureMockStore;

/**
 * Get the API path
 * @returns {string}
 */
global.getApiPath = urlString => {
  const path = urlString.split('hub')[1];
  return path;
};

// Local storage Mock
global.localStorage = {
  store: {},
  getItem: function(key) {
    return this.store[key];
  },
  setItem: function(key, value) {
    this.store[key] = value;
  },
  clear: function() {
    this.store = {};
  },
  removeItem: function(key) {
    delete this.store[key];
  },
};

// Window Mock
global.window.open = jest.fn();
global.window.__ckoHub__ = {
  version: 1,
};
global.window.matchMedia =
  global.window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
    };
  };

global.renderer = renderer;

Object.values = obj => Object.keys(obj).map(key => obj[key]);
