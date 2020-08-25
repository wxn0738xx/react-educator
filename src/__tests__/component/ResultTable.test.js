// Testing Suite for the Result Table component of the Educator Page

import React from 'react';
import { mount } from 'enzyme';

import ResultTable from '../../component/results/ResultTable';

// Decribe the component that we are testing
describe('ResultTable component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      results: [{
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
      },
      ],
    };
    wrapper = mount(<ResultTable {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('is default sorted by time', () => {
    // Find the first Row of the Results Table and then the 4th column which is the time Cell.
    const firstTimeCell = wrapper.find('Row').first().find('Cell').at(3);
    expect(firstTimeCell.text()).toBe('Saturday, August 11, 2018, 12:00 AM');
  });

  it('can be sorted by time', () => {
    // Find the Time Header Cell
    const timeHeaderCell = wrapper.find('HeaderCell').at(3).find('th');

    // Confirm the time of the first row before chaning sort order
    let topTime = wrapper.find('Row').first().find('Cell').at(3);
    expect(topTime.text()).toBe('Saturday, August 11, 2018, 12:00 AM');

    // Simulate clicking the header to change sorting
    timeHeaderCell.simulate('click');

    // Confirm the time of the first row after changing sort order
    topTime = wrapper.find('Row').first().find('Cell').at(3);
    expect(topTime.text()).toBe('Wednesday, July 11, 2018, 12:00 AM');
  });

  it('can be sorted by decision', () => {
    const decisionHeaderCell = wrapper.find('HeaderCell').at(4).find('th');

    let topDecision = wrapper.find('Row').first().find('Cell').at(4);
    expect(topDecision.text()).toBe('No');

    decisionHeaderCell.simulate('click');

    topDecision = wrapper.find('Row').first().find('Cell').at(4);
    expect(topDecision.text()).toBe('Yes');
  });

  it('can be sorted by score', () => {
    const scoreHeaderCell = wrapper.find('HeaderCell').at(5).find('th');

    let topScore = wrapper.find('Row').first().find('Cell').at(5);
    expect(topScore.text()).toBe('0.15');

    scoreHeaderCell.simulate('click');

    topScore = wrapper.find('Row').first().find('Cell').at(5);
    expect(topScore.text()).toBe('0.96');
  });
});
