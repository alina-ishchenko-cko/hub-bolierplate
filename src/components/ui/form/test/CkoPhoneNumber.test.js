import * as React from 'react';
import FormWrapper from '__mocks__/FormWrapper';
import CkoPhoneNumber from '../CkoPhoneNumber';
import CkoInput from '../CkoInput';
import CkoSelect from '../CkoSelect';

describe.skip('CkoPhoneNumber', () => {
  let AppComp;
  const data = [
    {
      name: '1',
      countryId: '1',
      countryPhoneCode: '1',
      key: '1',
    },
  ];

  beforeEach(() => {
    const Wrapper = FormWrapper(CkoPhoneNumber);
    AppComp = mount(
      <Wrapper
        id="ckoPhoneNumber"
        countries={data}
        defaultValue={{
          number: '12233',
          countryCode: '1',
        }}
      />
    );
  });

  afterAll(() => {
    AppComp = null;
  });

  it('should contain CkoInput tag', () => {
    expect(AppComp.find(CkoInput)).toHaveLength(1);
    expect(AppComp.find('input.ant-input')).toHaveLength(1);
  });

  it('should contain CkoSelect', () => {
    expect(AppComp.find(CkoSelect)).toHaveLength(1);
    expect(AppComp.find('.ant-select-arrow')).toHaveLength(1);
  });
});
