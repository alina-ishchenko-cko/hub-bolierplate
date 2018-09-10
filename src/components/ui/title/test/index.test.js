import * as React from 'react';
import CkoTitle from '../index';

describe('CkoTitle', () => {
  it('should render default', () => {
    const AppComp = shallow(
      <CkoTitle size="h1" value="Dashbord title" />
    ).dive();
    expect(AppComp.find('div.cko-title')).toHaveLength(1);
    expect(AppComp.find('div.cko-title').text()).toEqual('Dashbord title');
  });

  it('should add id attribute', () => {
    const AppComp = shallow(
      <CkoTitle size="h1" value="Dashbord title" id="title-test" />
    ).dive();
    expect(AppComp.find('div.cko-title')).toHaveLength(1);
    expect(AppComp.prop('id')).toEqual('title-test');
  });

  it('should add size attribute', () => {
    let AppComp = shallow(
      <CkoTitle size="h1" value="Dashbord title" id="title-test" />
    ).dive();
    expect(AppComp.prop('size')).toEqual('h1');

    AppComp = shallow(
      <CkoTitle size="h2" value="Dashbord title" id="title-test" />
    ).dive();
    expect(AppComp.prop('size')).toEqual('h2');
  });
});
