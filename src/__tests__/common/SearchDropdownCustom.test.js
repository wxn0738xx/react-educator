// Testing for the SearchDropdownCustom common component

import React from 'react';
import { mount } from 'enzyme';

import SearchDropdownCustom from '../../common/SearchDropdownCustom';

// Describe what we are testing
describe('DropdownCustom component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      name: 'SearchDropdownCustom',
      defaultLabel: 'Select Author',
      options: ['Bob', 'Steve', 'Matthew'],
      handleSelect: () => 'Mock Function',
    };

    wrapper = mount(<SearchDropdownCustom {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('sorts the menu items alphabetically', () => {
    const authorOptions = wrapper.find('Typeahead').props().options;
    expect(authorOptions[0]).toBe('Bob');
    expect(authorOptions[1]).toBe('Matthew');
    expect(authorOptions[2]).toBe('Steve');
  });

  it('remains sorted after another author is added', () => {
    // Update the props
    wrapper.setProps({ options: ['Bob', 'Steve', 'Matthew', 'Danielle'] });
    // Check the options are in alphabetical order.
    const newAuthorOptions = wrapper.find('Typeahead').props().options;
    expect(newAuthorOptions[0]).toBe('Bob');
    expect(newAuthorOptions[1]).toBe('Danielle');
    expect(newAuthorOptions[2]).toBe('Matthew');
    expect(newAuthorOptions[3]).toBe('Steve');
  });
});
