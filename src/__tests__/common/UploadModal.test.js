import React from 'react';
import { mount, shallow } from 'enzyme';

import ConfirmTable from '../../common/ConfirmTable';
import FilesUpload from '../../common/FilesUpload';
import UploadModal from '../../common/UploadModal';

describe('FileSelector component', () => {
  let wrapper;
  let modal;

  const props = {
    username: 'username test',
    studentEmail: 'studentEmail@test.com',
    refreshList: () => 'test refresgList function',
  };

  beforeAll(() => {
    wrapper = shallow(<UploadModal {...props} />);
    modal = wrapper.find('Modal.UploadModal');
  });


  it('renders the modal without crashing', () => {
    expect(wrapper).toBeDefined();
    expect(modal).toHaveLength(1);
  });

  it('renders the ConfirmTable component', () => {
    wrapper.setState({ show: true });
    const confirm = wrapper.find(ConfirmTable);
    expect(confirm).toHaveLength(1);
  });

  it('renders the FilesUpload component', () => {
    const filupload = (modal.find('ModalFooter')).find(FilesUpload);
    expect(filupload).toHaveLength(1);
  });

  it('pass correct props to the FilesUpload component', () => {
    const filupload = (modal.find('ModalFooter')).find(FilesUpload);
    expect(filupload.prop('username')).toEqual('username test');
    expect(filupload.prop('studentEmail')).toEqual('studentEmail@test.com');
  });


  it('pass the correct files to FilesUpload component', () => {
    wrapper.setState({
      knownFiles: [
        {
          fileName: 'sample1.txt',
          time: '2000-5-5',
        },
        {
          fileName: 'sample2.txt',
          time: '2010-7-10',
        },
      ],
    });
    modal = wrapper.find('Modal.UploadModal');
    const fileupload = (modal.find('ModalFooter')).find(FilesUpload);

    expect(fileupload.prop('files')).toEqual([
      {
        fileName: 'sample1.txt',
        time: '2000-5-5',
      },
      {
        fileName: 'sample2.txt',
        time: '2010-7-10',
      },
    ]);
  });

  it('renders the cancelButton component', () => {
    expect((modal.find('ModalFooter')).find('Button.cancelButton')).toHaveLength(1);
  });

  it('renders the uploadButton component', () => {
    wrapper = mount(<UploadModal {...props} />);
    expect(wrapper.find('Button.uploadButton')).toHaveLength(1);
  });

  it('closes the modal upon clicking the cancel button', () => {
    const cancelButton = (modal.find('ModalFooter')).find('Button.cancelButton');
    cancelButton.simulate('click');
    expect(wrapper.state('show')).toBe(false);
  });

  it('opens the modal upon clicking the upload button', () => {
    wrapper = mount(<UploadModal {...props} />);
    const uploadButton = wrapper.find('Button.uploadButton');
    uploadButton.simulate('click');
    expect(wrapper.state('show')).toBe(true);
  });
});
