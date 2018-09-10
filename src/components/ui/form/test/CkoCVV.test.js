import * as React from 'react';
import FormWrapper from '__mocks__/FormWrapper';
import CkoCVV from '../CkoCVV';

describe('CkoCVV', () => {
  let AppComp, inputField;

  beforeEach(() => {
    const Wrapper = FormWrapper(CkoCVV);
    AppComp = mount(<Wrapper id="ckoCvv" />);
    inputField = AppComp.find('input.ant-input');
  });

  afterEach(() => {
    AppComp = null;
  });

  it('should contain input tag', () => {
    expect(inputField).toHaveLength(1);
  });

  it('should not allow non-numeric characters onKeypress', () => {
    const keyEventObj = {
      which: 'a'.charCodeAt(),
      target: { value: 'a' },
      preventDefault: jest.fn(),
    };
    inputField.simulate('keypress', keyEventObj);
    expect(keyEventObj.preventDefault).toHaveBeenCalledTimes(1);
  });

  it('should allow numeric characters onKeypress', () => {
    const keyEventObj = {
      which: '3'.charCodeAt(),
      target: { value: '3' },
      preventDefault: jest.fn(),
    };
    inputField.simulate('keypress', keyEventObj);
    expect(keyEventObj.preventDefault).toHaveBeenCalledTimes(0);
  });
});
