// Test suite for EducatorPage component
import React from 'react';
import { shallow } from 'enzyme';

import EducatorPage from '../../container/EducatorPage';
import KnownAuthor from '../../component/author/KnownAuthorPanel';
import Unknown from '../../component/inputs/UnknownTextPanel';
import EducatorInputForm from '../../component/inputs/EducatorInputForm';
import ResultsPanel from '../../component/results/ResultsPanel';

// describe what we are testing
describe('EducatorPage component', () => {
  let props;
  let wrapper;
  const testUser = 'newUser2';
  const testStudent = 'newStudent2';
  const testAllFiles = ['assignment1.txt', 'assignment2.txt'];
  const testUnknownFile = 'unknown1.txt';
  const testSelectFiles = ['assignment2.txt'];
  const testResults = [{
    unknownFileName: '123.txt',
    knownFiles: ['assignment1.txt', 'assignment2.txt'],
    parameters: {
      language: 'English',
      n: '3',
      distanceFunction: 'Euclidean',
      profileSizeUnknown: '100',
      profileSizeKnown: '400',
      threshold: '0.6',
      prePunctuation: true,
      preNumbers: true,
      preLowercase: true,
      preAlphabet: true,
    },
    time: '2018-7-11',
    decision: true,
    score: '0.96',
  },
  {
    unknownFileName: '123.txt',
    knownFiles: ['assignment1.txt', 'assignment3.txt'],
    parameters: {
      language: 'English',
      n: '3',
      distanceFunction: 'Euclidean',
      profileSizeUnknown: '100',
      profileSizeKnown: '400',
      threshold: '0.6',
      prePunctuation: true,
      preNumbers: true,
      preLowercase: false,
      preAlphabet: true,
    },
    time: '2018-8-11',
    decision: false,
    score: '0.15',
  }];

  beforeEach(() => {
    props = {
      username: testUser,
    };
    wrapper = shallow(<EducatorPage {...props} />);
  });

  describe('Component is rendered', () => {
    it('should render without throwing an error', () => {
      expect(wrapper).toBeDefined();
    });
  });

  describe('Children components are rendered', () => {
    it('should render KnownAuthorPanel for the correct username', () => {
      const knownAuthor = wrapper.find(KnownAuthor);
      expect(knownAuthor).toHaveLength(1);
      expect(knownAuthor.prop('username')).toEqual(testUser);
    });

    it('should pass the state of all files for that username into KnownAuthorPanel', () => {
      wrapper.setState({ allFiles: testAllFiles });
      const knownAuthor = wrapper.find(KnownAuthor);
      expect(knownAuthor.prop('allFiles')).toEqual(testAllFiles);
    });

    it('should render UnknownTextPanel', () => {
      expect(wrapper.find(Unknown)).toHaveLength(1);
    });

    it('should render EducatorInputForm for the correct username', () => {
      const educatorInputForm = wrapper.find(EducatorInputForm);
      expect(educatorInputForm).toHaveLength(1);
      expect(educatorInputForm.prop('username')).toEqual(testUser);
    });

    it('should render EducatorInputForm for the correct username', () => {
      const educatorInputForm = wrapper.find(EducatorInputForm);
      expect(educatorInputForm).toHaveLength(1);
      expect(educatorInputForm.prop('username')).toEqual(testUser);
    });

    it('should correctly pass the state of selected student, known and unknown files into EducatorInputForm as props', () => {
      wrapper.setState({
        studentEmail: testStudent,
        selectFiles: testSelectFiles,
        unknownFile: testUnknownFile,
      });
      const educatorInputForm = wrapper.find(EducatorInputForm);
      expect(educatorInputForm.prop('studentEmail')).toEqual(testStudent);
      expect(educatorInputForm.prop('knownFiles')).toEqual(testSelectFiles);
      expect(educatorInputForm.prop('unknownFile')).toEqual(testUnknownFile);
    });

    it('should render ResultPanel with the state of selected student and result as props', () => {
      wrapper.setState({
        studentEmail: testStudent,
        results: testResults,
      });
      const resultPanel = wrapper.find(ResultsPanel);
      expect(resultPanel).toHaveLength(1);
      expect(resultPanel.prop('title')).toEqual(testStudent);
    });

    it('initially hides the result table', () => {
      const resultPanel = wrapper.find(ResultsPanel);
      expect(resultPanel.prop('show')).toEqual(false);
    });

    it('shows the result able if the showResult state is updated', () => {
      wrapper.setState({ showResults: true });
      const resultPanel = wrapper.find(ResultsPanel);
      expect(resultPanel.prop('show')).toEqual(true);
    });
  });
});
