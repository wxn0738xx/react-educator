// Test suite for KnownAuthor component
import React from 'react';
import { shallow } from 'enzyme';
import KnownAuthor from '../../component/author/KnownAuthorPanel';
import StudentSelection from '../../component/author/StudentSelection';
import KnownText from '../../component/inputs/KnownTextSection';

// describe what we are testing
describe('KnownAuthor component', () => {
  // let props;
  let wrapper;

  beforeAll(() => {
    const props = {
      selectFiles: () => 'selectFiles called test',
      username: 'newUser2',
      allFiles: [
        {
          fileName: 'sample1.txt',
          time: '2000-5-5',
        },
        {
          fileName: 'sample2.txt',
          time: '2010-7-10',
        },
      ],
      selectStudent: () => { 'value passed to parent'; },
    };
    wrapper = shallow(<KnownAuthor {...props} />);
  });

  describe('Component is rendered', () => {
    it('should render without crashing', () => {
      expect(wrapper).toBeDefined();
    });


    it('renders the student selection component', () => {
      const studentSelector = wrapper.find(StudentSelection);
      expect(studentSelector).toHaveLength(1);
    });

    it('renders KnownText Table', () => {
      expect(wrapper.find(KnownText)).toHaveLength(1);
    });
  });

  describe('file list display function properly', () => {
    it('refreshes author state after new author is selected', () => {
      wrapper.setState({ author: 'Author1' });
      wrapper.instance().handleSelect('newAuthor2');
      wrapper.update();
      expect(wrapper.state('author')).toEqual('newAuthor2');
      expect(wrapper.find(KnownText).prop('studentEmail')).toEqual('newAuthor2');
    });

    it('files list update is correctly passed to known text component', () => {
      // set allFiles props for new author as response
      wrapper.setProps({ allFiles: [] });
      const known = wrapper.find(KnownText);
      expect(known.prop('files')).toEqual([]);
    });
  });
});
