import * as React from 'react';
import CkoIcon from 'components/ui/icon/';
import Logo from './';
import { Logo as LogoWrapStyled } from './Logo.sc';

describe('Logo', () => {
  let wrapper;
  let mockProps;
  beforeAll(() => {
    wrapper = shallow(<Logo />);
  });

  afterAll(() => {
    wrapper = null;
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders contains the styled components', () => {
    expect(wrapper.find(LogoWrapStyled)).toHaveLength(1);
  });

  it('renders contains the required components', () => {
    expect(wrapper.find(CkoIcon)).toHaveLength(1);
  });
});
