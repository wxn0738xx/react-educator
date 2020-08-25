// Test suite for DropdownCustom component
import React from 'react';
import { mount } from 'enzyme';
import { ControlLabel, ToggleButton } from 'react-bootstrap';

import RadioCustom from '../../common/RadioCustom';
import HelpPopover from '../../common/HelpPopover';

// describe what we are testing
describe('DropdownCustom component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      label: 'Role',
      name: 'role',
      keyValues: new Map([['0', 'Educator'], ['1', 'Researcher']]),
      id: 'dropdowntest',
      fieldLength: 3,
      handleChange: () => { console.log('sample dropdown select'); },
    };
    wrapper = mount(<RadioCustom {...props} />);
  });

  // make our assertion and what we expect to happen
  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('renders all the values', () => {
    expect(wrapper.find(ToggleButton)).toHaveLength(2);
  });

  it('renders the correct label', () => {
    const controlLabel = wrapper.find(ControlLabel);
    expect(controlLabel.text()).toEqual('Role:');
  });

  it('renders the HelpPopover component', () => {
    expect(wrapper.find(HelpPopover)).toHaveLength(1);
  });
});
