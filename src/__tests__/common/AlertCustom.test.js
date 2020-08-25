// Test suite for AlertCustom component
import React from 'react';
import { mount } from 'enzyme';
import { Alert } from 'react-bootstrap';

import AlertCustom from '../../common/AlertCustom';

// describe what we are testing
describe('AlertCustom component', () => {
  let props;
  let wrapper;
  let showAlert = true;

  beforeEach(() => {
    props = {
      show: showAlert,
      handleDismiss: () => { showAlert = false; },
      heading: 'Test Alert Heading',
      content: 'Test Alert Message',
      alertStyle: 'danger',
    };
    wrapper = mount(<AlertCustom {...props} />);
  });

  // make our assertion and what we expect to happen
  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('renders the Alert component when show prop is true', () => {
    expect(wrapper.find(Alert)).toHaveLength(1);
  });

  it('renders the correct heading', () => {
    const alert = wrapper.find(Alert);
    expect(alert.find('strong').text()).toEqual('Test Alert Heading');
  });

  it('renders the correct message', () => {
    const alert = wrapper.find(Alert);
    expect(alert.find('p').text()).toEqual('Test Alert Message');
  });

  it('hides the Alert component when show prop is false', () => {
    wrapper.setProps({ show: false });
    expect(wrapper.find(Alert)).toHaveLength(0);
  });
});
