// Test suite for MainPage component
import React from 'react';
import { shallow } from 'enzyme';

import MainPage from '../../container/MainPage';

// describe what we are testing
describe('MainPage component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MainPage />);
  });

  // make our assertion and what we expect to happen
  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('renders the Nav child component', () => {
    expect(wrapper.find('Nav')).toHaveLength(1);
  });

  it('renders the EducatorPage child componenet', () => {
    expect(wrapper.find('EducatorPage')).toHaveLength(1);
  });
});
