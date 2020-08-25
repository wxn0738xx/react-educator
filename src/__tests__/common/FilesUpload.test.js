// Test suite for FilesUpload Component
import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'react-bootstrap';
import FilesUpload from '../../common/FilesUpload';
import FileSelector from '../../common/FileSelector';
// import RejectPopup from '../../common/RejectPopup';
import UploadInformModal from '../../common/UploadInformModal';

describe('FilesUpload Component', () => {
  let props;
  let wrapper;

  beforeAll(() => {
    props = {

    };
    wrapper = shallow(<FilesUpload {...props} />);
  });

  describe('Component is rendered', () => {
    it('should render the component without errors', () => {
      expect(wrapper).toBeDefined();
    });
  });

  describe('Children components are rendered correctly', () => {
    it('should render the FileSelector component', () => {
      const selector = wrapper.find(FileSelector);
      expect(selector).toBeDefined();
      expect(selector).toHaveLength(1);
    });

    // it('should render the RejectPopup component that is invisible', () => {
    //   const reject = wrapper.find(RejectPopup);
    //   expect(reject).toBeDefined();
    //   expect(reject).toHaveLength(1);
    //   expect(reject.prop('show')).toEqual(false);
    // });

    it('should render the UploadInformModal component that is invisible', () => {
      const reject = wrapper.find(UploadInformModal);
      expect(reject).toBeDefined();
      expect(reject).toHaveLength(1);
      expect(reject.prop('show')).toEqual(false);
    });

    it('should render the confirm button', () => {
      const confirm = wrapper.find(Button);
      expect(confirm).toBeDefined();
      expect(confirm).toHaveLength(1);
    });
  });
});
