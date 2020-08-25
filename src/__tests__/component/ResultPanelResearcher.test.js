// Testing suite for the Result Panel component for Researcher
import React from 'react';
import { mount, shallow } from 'enzyme';
import ResultPanelResearcher from '../../component/results/ResultPanelResearcher';
import ResultTableResearcher from '../../component/results/ResultTableResearcher'

describe('Result Panel component for researcher page tests', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ResultPanelResearcher {...props} />);
    });

    it('renders without crashing', () => {
        expect(wrapper).toBeDefined();
    });

    it('renders the main components without crashing', () => {
        const panel = wrapper.find('Panel');
        const resultTable = wrapper.find(ResultTableResearcher);

        expect(panel).toBeDefined();
        expect(resultTable).toBeDefined();
    });
});
