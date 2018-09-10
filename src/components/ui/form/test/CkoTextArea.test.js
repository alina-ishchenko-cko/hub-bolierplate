import * as React from 'react';
import { mount } from 'enzyme';
import FormWrapper from '__mocks__/FormWrapper';
import CkoTextArea from '../CkoTextArea';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
const FormItem = Form.Item;
const { TextArea } = Input;

describe.skip('CkoTextArea', () => {
  let AppComp;

  beforeEach(() => {
    const Wrapper = FormWrapper(CkoTextArea);
    AppComp = mount(<Wrapper id="ckoTextArea" />);
  });

  afterAll(() => {
    AppComp = null;
  });

  it('should contain TextArea tag', () => {
    expect(AppComp.find(TextArea)).toHaveLength(1);
    expect(AppComp.find('textarea')).toHaveLength(1);
  });

  it('should contain FormItem', () => {
    expect(AppComp.find(FormItem)).toHaveLength(1);
  });
});
