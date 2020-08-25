// Test suite for the Help Popover component

import React from 'react';
import { shallow } from 'enzyme';

import HelpPopover from '../../common/HelpPopover';

describe('Help Popover component render tests', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      title: 'Help',
      content: 'This component shows useful help information',
    };

    wrapper = shallow(<HelpPopover {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });
});
