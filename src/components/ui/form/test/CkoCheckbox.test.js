import * as React from 'react';
import FormWrapper from '__mocks__/FormWrapper';
import CkoCheckbox from '../CkoCheckbox';
import Checkbox from 'antd/lib/checkbox';

describe('CkoCheckbox', () => {
  let AppComp, inputField;

  // Clear console warning
  console.warn = null;

  beforeEach(() => {
    const Wrapper = FormWrapper(CkoCheckbox);
    AppComp = mount(<Wrapper id="cardExp" />);
    inputField = AppComp.find(Checkbox);
  });

  afterEach(() => {
    AppComp = null;
  });

  it('should contain input tag', () => {
    expect(inputField).toHaveLength(1);
  });

  // it('should show error for invalid value', () => {
  //   inputField.simulate('click');
  //   //const inputWrap = inputField.find('span.ant-checkbox');
  //   expect(inputField.find('.ant-checkbox-checked')).toHaveLength(1);
  // });

  // ant-checkbox ant-checkbox-checked
  // it('should show error allow invalid date', () => {
  //   inputField.simulate('blur', { target: { value: '01/10' } });
  //   const inputWrap = AppComp.find('div.ant-form-item-control');
  //   expect(inputWrap.hasClass('has-error')).toEqual(true);
  // });

  // it('should not show error message', () => {
  //   inputField.simulate('blur', { target: { value: '06/60' } });
  //   expect(inputField.instance().value).toEqual('06/60');
  //   const inputWrap = AppComp.find('div.ant-form-item-control');
  //   expect(inputWrap.hasClass('has-error')).toEqual(false);
  // });
});
