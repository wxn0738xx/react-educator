import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Redirect } from 'react-router-dom';
import LoginForm from '../../component/authentication/LoginForm';

// describe what we are testing
describe('Login Form component', () => {
  let wrapper;
  let isOpen = true;

  const props = {
    username: 'newUser2',
    show: isOpen,
    onHide: () => { isOpen = false; },
  };

  beforeEach(() => {
    wrapper = mount(<MemoryRouter><LoginForm {...props} /></MemoryRouter>);
  });

  it('renders the page without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  // it('redirects to the register page when register button is pressed', () => {
  //
  // });
  // it('Login i s initially disabled', () => {
  //   const LoginButton = wrapper.find(Button);
  //   expect(LoginButton.prop('display')).toEqual(false);
  // });

  // it('Login is disabled with invalid email', () => {
  //   const LoginButton = wrapper.find(Button);
  //   const Emailbox = wrapper.find(InputCustom);
  //   Emailbox.simulate('change', { target: { value: 'notAnEmail' } });
  //   expect(LoginButton.prop('display')).toEqual(true);
  // });

  // it('Login is enabled with valid email', () => {
  //   const LoginButton = wrapper.find(Button);
  //   const Emailbox = wrapper.find(InputCustom);
  //   Emailbox.simulate('change', { target: { value: 'definitelyanemail@website.com' } });
  //   expect(LoginButton.prop('display')).toEqual(true);
  // });
});
