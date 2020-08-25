// Test suite for DropdownCustom component
import React from 'react';
import { shallow } from 'enzyme';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import DropdownCustom from '../../common/DropdownCustom';
import SearchDropdownCustom from '../../common/SearchDropdownCustom';

// describe what we are testing
describe('DropdownCustom component', () => {
  let props;
  let wrapper;

  beforeAll(() => {
    props = {
      name: 'Dropdown Test',
      defaultLabel: 'DropdownCustom',
      id: 'dropdowntest',
      options: ['option1', 'option2'],
      handleSelect: () => 'sample dropdown select',
    };

    wrapper = shallow(<DropdownCustom {...props} />);
  });

  describe('Components are rendered', () => {
    // make our assertion and what we expect to happen
    it('should render without crashing', () => {
      expect(wrapper).toBeDefined();
    });
  });

  describe('Children components are rendered', () => {
    // console.log(wrapper.debug());
    it('should render the DropdownButton', () => {
      wrapper.setProps({ isSearchable: false });
      expect(wrapper.find(DropdownButton)).toHaveLength(1);
    });

    it('should render the SearchDropdownCustom', () => {
      wrapper.setProps({ isSearchable: true });
      expect(wrapper.find(SearchDropdownCustom)).toHaveLength(1);
    });
  });

  describe('Populates the options', () => {
    it('should populate the dropdown menu', () => {
      wrapper.setProps({ isSearchable: false });
      const dropdown = wrapper.find(DropdownButton);
      const items = dropdown.find(MenuItem);
      expect(items).toHaveLength(2);
      expect(items.find('#option1')).toHaveLength(1);
      expect(items.find('#option2')).toHaveLength(1);
    });

    it('should populate the SearchDropdownCustom', () => {
      wrapper.setProps({ isSearchable: true });
      const searchDropdown = wrapper.find(SearchDropdownCustom);
      const options = searchDropdown.prop('options');
      expect(options).toEqual(['option1', 'option2']);
    });
  });
});
