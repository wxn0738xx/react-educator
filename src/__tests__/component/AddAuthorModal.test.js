// Test suite for AddAuthorModel Component
import React from 'react';
import { mount } from 'enzyme';

import AddAuthorModal from '../../component/author/AddAuthorModal';

// describe what we are testing
describe('AddAuthorModal component', () => {
  let wrapper;
  let modal;
  let isOpen = true;

  const props = {
    handleAddAuthor: () => 'test function',
    username: 'newUser2',
    show: isOpen,
    onHide: () => { isOpen = false; },
  };

  beforeEach(() => {
    wrapper = mount(<AddAuthorModal {...props} />);
    modal = wrapper.find('Modal.addAuthorModal');
  });

  describe('Component is rendered', () => {
    it('renders the modal without crashing', () => {
      expect(wrapper).toBeDefined();
      expect(modal).toHaveLength(1);
    });
  });

  describe('Children components are rendered correctly', () => {
    it('should render the InputCustom component for student identifier with the correct label', () => {
      const emailInput = (modal.find('ModalBody')).find('InputCustom');
      expect(emailInput).toHaveLength(1);
      expect(emailInput.prop('label')).toEqual('Identifier');
    });

    it('should initially hides the alert message', () => {
      const alert = (modal.find('ModalBody')).find('AlertCustom');
      expect(alert.prop('show')).toEqual(false);
    });

    it('should initially disables confirm button', () => {
      const confirmButton = (modal.find('ModalFooter')).find('Button.confirmButton');
      expect(confirmButton.prop('disabled')).toEqual(true);
    });
  });

  describe('Children components function properly', () => {
    it('should enable confirm button for valid author identifier', () => {
      wrapper.setState({ identifier: 'a@uni.com' });
      wrapper.instance().getAddAuthorValidationState();
      expect(wrapper.state('canAddAuthor')).toEqual(true);
    });

    it('disables confirm button for empty identifier string', () => {
      wrapper.setState({ identifier: '' });
      wrapper.instance().getAddAuthorValidationState();
      expect(wrapper.state('canAddAuthor')).toEqual(false);
    });

    it('closes the modal upon clicking the cancel button', () => {
      const confirmButton = (modal.find('ModalFooter')).find('Button.cancelButton');
      confirmButton.simulate('click');
      expect(isOpen).toEqual(false);
    });
  });
});
