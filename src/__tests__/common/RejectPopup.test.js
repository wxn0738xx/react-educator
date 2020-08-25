// Test suite for RejectPopup component
import React from 'react';
import { shallow } from 'enzyme';
import RejectPopup from '../../common/RejectPopup';

// describe what we are testing
describe('RejectPopup component', () => {
  let wrapper;

  const props = {
    show: true,
    handleClose: () => { props.show = false; },
    rejectedFiles: ['file1', 'file2', 'file3'],
  };

  beforeEach(() => {
    wrapper = shallow(<RejectPopup {...props} />);
  });

  it('renders the modal without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('renders the correct number of files in the rejectedFiles prop', () => {
    const modal = wrapper.find('ModalBody');
    expect((modal.find('ul')).find('li')).toHaveLength(3);
  });

  it('closes the modal upon clicking the confirm button', () => {
    const confirmButton = (wrapper.find('ModalFooter')).find('Button.confirmButton');
    confirmButton.simulate('click');
    wrapper.instance().handleClose();
    expect(props.show).toBe(false);
  });
});
