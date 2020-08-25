import React from 'react';
import { shallow } from 'enzyme';
import KnownText from '../../component/inputs/KnownTextSection';
import UploadModal from '../../common/UploadModal';
import FileTable from '../../common/FileTable';

describe('Testing the known text panel', () => {
  const props = {
    handleSelect: () => 'test known text panel',
    files: [
      {
        fileName: 'test.txt',
        time: '2018-9-1',
      },
    ],
    username: 'knownTextPanelUser',
    studentEmail: 'knownTextPanelUser@test.com',
  };

  const wrapper = shallow(<KnownText {...props} />);

  it('should render the component without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render the children without crashing', () => {
    expect(wrapper.find(UploadModal).length).toEqual(1);
    expect(wrapper.find(FileTable).length).toEqual(1);
  });
});
