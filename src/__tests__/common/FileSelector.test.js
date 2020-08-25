import React from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { mount } from 'enzyme';
import FileSelector from '../../common/FileSelector';

// describe what we are testing
describe('FileSelector component', () => {
  let props;
  let wrapper;
  const isSupportMultiple = true;

  beforeAll(() => {
    props = {
      label: 'FileSelector Test',
      supportMultiple: isSupportMultiple,
      handleSelect: () => 'FileSelector Test',
    };
    wrapper = mount(<FileSelector {...props} />);
  });


  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('renders the FileSelector Button component', () => {
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('renders the FormControl', () => {
    expect(wrapper.find(FormControl)).toHaveLength(1);
  });

  it('passes the correct supportMultiple value', () => {
    const formcontrol = wrapper.find(FormControl);
    expect(formcontrol.prop('multiple')).toEqual(true);
  });
});
