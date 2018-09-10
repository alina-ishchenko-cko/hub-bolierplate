import * as React from 'react';
import { mount } from 'enzyme';
import FormWrapper from '__mocks__/FormWrapper';
import CkoCountries from '../CkoCountries';
import CkoSelect from '../CkoSelect';

describe.skip('CkoCountries', () => {
  let AppComp;

  beforeEach(() => {
    const Wrapper = FormWrapper(CkoCountries);
    AppComp = mount(<Wrapper id="countries" countries={[]} />);
  });

  afterEach(() => {
    AppComp = null;
  });

  it('should contain CkoSelect', () => {
    expect(AppComp.find(CkoSelect)).toHaveLength(1);
    expect(AppComp.find('.ant-select-arrow')).toHaveLength(1);
  });
});
