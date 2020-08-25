// Testing Suite for the Result Table component of the Researcher Page

import React from 'react';
import { mount } from 'enzyme';
import ResultTableResearcher from '../../component/results/ResultTableResearcher';

describe('test Result Table components for researcher page', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            results: [{
                resultId: '12345',
                state: 0,
                size: 32,
                dataset: ['pan13', 'pan14'],
                parameters: {
                    language: 'English',
                    nLow: '3',
                    nHigh: '7',
                    distanceFunction: 'Cosine Similarity',
                    profileSizeUnknownLow: '100',
                    profileSizeUnknownHigh: '150',
                    profileSizeUnknownStep: '10',
                    profileSizeKnownLow: '400',
                    profileSizeKnownHigh: '450',
                    profileSizeKnownStep: '5',
                    threshold: '0.6',
                    prePunctuation: true,
                    preNumbers: true,
                    preLowercase: true,
                    preAlphabet: true,
                },
                time: '2018-7-11',
            },
                {
                    resultId: '54321',
                    state: 1,
                    size: 30,
                    dataset: ['pan13', 'pan14'],
                    parameters: {
                        language: 'English',
                        nLow: '2',
                        nHigh: '8',
                        distanceFunction: 'Cosine Similarity',
                        profileSizeUnknownLow: '100',
                        profileSizeUnknownHigh: '150',
                        profileSizeUnknownStep: '10',
                        profileSizeKnownLow: '400',
                        profileSizeKnownHigh: '450',
                        profileSizeKnownStep: '5',
                        threshold: '0.5',
                        prePunctuation: true,
                        preNumbers: false,
                        preLowercase: true,
                        preAlphabet: true,
                    },
                    time: '2018-8-11',
                },
            ],
        };
        wrapper = mount(<ResultTableResearcher {...props} />);
    });

    it('renders without crashing', () => {
        expect(wrapper).toBeDefined();
    });

    it('is default sorted by time', () => {
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

});
