// Test suite for RegisterForm
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Redirect } from 'react-router-dom';
import RegisterForm from '../../component/authentication/RegisterForm';

// describe what we are testing
describe('Register Form component', () => {
  let wrapper;
  let isOpen = true;

  const props = {
    username: 'newUser2',
    show: isOpen,
    onHide: () => { isOpen = false; },
  };

  beforeEach(() => {
    wrapper = mount(<MemoryRouter><RegisterForm {...props} /></MemoryRouter>);
  });

  it('renders the modal without crashing', () => {
    expect(wrapper).toBeDefined();
  });
});
