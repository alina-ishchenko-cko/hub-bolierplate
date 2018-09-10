import * as React from 'react';
import FormWrapper from '__mocks__/FormWrapper';
import CkoCurrencies from '../CkoCurrencies';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form';
const FormItem = Form.Item;

describe.skip('CkoCurrencies', () => {
  let AppComp;

  beforeEach(() => {
    const Wrapper = FormWrapper(CkoCurrencies);
    AppComp = mount(<Wrapper id="currency" currencyIds={[]} />);
  });

  afterEach(() => {
    AppComp = null;
  });

  it('should contain Select tag', () => {
    expect(AppComp.find(Select)).toHaveLength(1);
    expect(AppComp.find('.ant-select-arrow')).toHaveLength(1);
  });

  it('should contain FormItem', () => {
    expect(AppComp.find(FormItem)).toHaveLength(1);
  });
});
