// Test suite for page routing for this App
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, HashRouter as Router } from 'react-router-dom';

import App from '../App';

describe('App ', () => {
  let wrapper;
  let app;
  let router;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter
        initialEntries={['/']}
        initialIndex={0}
      >
        <App />
      </MemoryRouter>,
    );
    app = wrapper.find('App');
    router = wrapper.find(Router);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
    expect(app).toBeDefined();
    expect(router).toBeDefined();
  });

  it('renders the LoginPage initially', () => {
    expect(app.find('LoginPage')).toHaveLength(1);
  });

  // No tests are included to test that route works when location/address changes
  // since it has been tested extensively in the react-router-dom library
  // see https://reacttraining.com/react-router/web/guides/testing/navigating
});
