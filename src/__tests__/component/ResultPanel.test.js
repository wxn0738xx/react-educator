// Testing suite for the Result Panel component

import React from 'react';
import { mount, shallow } from 'enzyme';

import ResultsPanel from '../../component/results/ResultsPanel';

describe('Result Panel component tests', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      title: 'rachel@test.com',
    };

    wrapper = shallow(<ResultsPanel {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('renders the correct title', () => {
    wrapper = mount(<ResultsPanel {...props} />);
    const authorTitle = wrapper.find('Col').at(1).find('div').text();
    expect(authorTitle).toBe('rachel@test.com');
  });
});
