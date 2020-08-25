import React from 'react';
import { shallow } from 'enzyme';
import { FormControl, Button, Modal } from 'react-bootstrap';
import UploadZipModal from '../../common/UploadZipModal';
import AlertCustom from '../../common/AlertCustom';

describe('FileSelector component', () => {
  let wrapper;
  let modal;

  const props = {
    refreshList: () => 'test refreshList function',
  };

  beforeAll(() => {
    wrapper = shallow(<UploadZipModal {...props} />);
    modal = wrapper.find(Modal);
  });


  it('renders the modal without crashing', () => {
    expect(wrapper).toBeDefined();
    expect(modal).toHaveLength(1);
  });

  it('renders the Alert component', () => {
    wrapper.setState({ show: true });
    const confirm = wrapper.find(AlertCustom);
    expect(confirm).toHaveLength(1);
  });

  it('renders the FormControl component', () => {
    wrapper.setState({ show: true });
    const filupload = wrapper.find(FormControl);
    expect(filupload).toHaveLength(1);
  });


  it('renders the three buttons. Upload, browse, close', () => {
    const buttons = wrapper.find(Button);
    console.log(buttons, 'buttons here');
    expect(buttons).toHaveLength(3);
  });

});
