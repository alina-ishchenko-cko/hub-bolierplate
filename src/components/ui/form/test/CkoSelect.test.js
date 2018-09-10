import * as React from 'react';
import FormWrapper from '__mocks__/FormWrapper';
import CkoSelect from '../CkoSelect';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form';
const FormItem = Form.Item;

describe.skip('CkoSelect', () => {
  let AppComp;
  const data = [
    {
      value: '1',
      label: '1',
      key: '1',
    },
    {
      value: '2',
      label: '2',
      key: '2',
    },
  ];

  beforeEach(() => {
    const Wrapper = FormWrapper(CkoSelect);
    AppComp = mount(<Wrapper id="ckoSelect" data={data} />);
  });

  afterAll(() => {
    AppComp = null;
  });

  it('should contain CkoSelect', () => {
    expect(AppComp.find(CkoSelect)).toHaveLength(1);
    expect(AppComp.find('.ant-select-arrow')).toHaveLength(1);
  });

  it('should contain FormItem', () => {
    expect(AppComp.find(FormItem)).toHaveLength(1);
  });
});
