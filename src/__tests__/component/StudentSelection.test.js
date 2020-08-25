// Test suite for StudentSelection component
import React from 'react';
import { shallow } from 'enzyme';
import StudentSelection from '../../component/author/StudentSelection';
import AddAuthorModal from '../../component/author/AddAuthorModal';

// describe what we are testing
describe('StudentSelection component', () => {
  // let props;
  let wrapper;
  let studentToParent;

  beforeAll(() => {
    const fetchSpy = jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => {},
      }));

    const props = {
      username: 'newUser2',
      selectStudent: (value) => { studentToParent = value; },
    };
    wrapper = shallow(<StudentSelection {...props} />);
  });

  describe('Component is rendered', () => {
    it('should render without crashing', () => {
      expect(wrapper).toBeDefined();
    });


    it('renders the add author Button', () => {
      const addAuthorButton = wrapper.find('Button.addAuthorButton');
      expect(addAuthorButton).toHaveLength(1);
    });

    it('renders the add author Modal', () => {
      expect(wrapper.find(AddAuthorModal)).toHaveLength(1);
    });
  });

  describe('add author modal function properly', () => {
    it('shows the add author Modal only after the add author Button has been clicked', () => {
      const modalPre = wrapper.find(AddAuthorModal);
      expect(modalPre.prop('show')).toEqual(false);
      wrapper.find('Button.addAuthorButton').simulate('click');
      const modalPost = wrapper.find(AddAuthorModal);
      expect(modalPost.prop('show')).toEqual(true);
    });
  });

  describe('file list display function properly', () => {
    it('refreshes author state after new author is created', () => {
      wrapper.setState({ author: 'Author1' });
      wrapper.instance().handleAddAuthor('newAuthor2');
      wrapper.update();
      expect(wrapper.state('author')).toEqual('newAuthor2');
    });

    it('passes change in author state to parent', () => {
      wrapper.setState({ author: 'Author1' });
      wrapper.instance().handleAddAuthor('newAuthor2');
      wrapper.update();
      expect(studentToParent).toEqual('newAuthor2');
    });


    it('refreshes studentlist after new author is created', () => {
      wrapper.setState({ author: 'Author1' });
      const spy = jest.spyOn(wrapper.instance(), 'fetchStudents');
      wrapper.instance().handleAddAuthor('newAuthor2');
      wrapper.update();
      // ensure fetchStudents method is called
      expect(spy).toHaveBeenCalled();
    });
  });
});
