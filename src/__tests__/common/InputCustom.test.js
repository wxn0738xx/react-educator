import React from 'react';
import { shallow } from 'enzyme';

import InputCustom from '../../common/InputCustom';

describe('InputCustom component', () => {
  let props;
  let wrapper;

  beforeAll(() => {
    props = {
      label: 'test input box',
      name: 'test input box',
      placeholder: 'placeholder for test input box',
      content: 'test content',
      validation: 'test validation',
      handleInput: () => 'test function',
      fieldLength: 3,
      type: 'text',
    };

    wrapper = shallow(<InputCustom {...props} />);
  });

  describe('Component is rendered', () => {
    it('should render the component without crashing', () => {
      expect(wrapper).toBeDefined();
    });
  });
});
