// Test suite for ResearcherInputForm component
import React from 'react';
import { shallow } from 'enzyme';
import { Button, Checkbox, FormControl } from 'react-bootstrap';
import ResearcherInputForm, {ResearcherDropdown} from '../../component/inputs/ResearcherInputForm';

describe('test Researcher Input Form Component', () => {
    let props;
    let wrapper;
    const languages = ['English'];

    beforeAll(() => {
        props = {
            handleSubmit: () => { console.log('testing researcher input form'); },
            username: 'username',
            dataset: ["pan13", "pan14"],
        };
        wrapper = shallow(<ResearcherInputForm {...props} />);
    });

    describe('Component is rendered', () => {
        it('should render without throwing an error', () => {
            expect(wrapper).toBeDefined();
        });
    });

    describe('Children components are rendered', () => {
        it('should render a disabled submit button', () => {
            const submitButton = wrapper.find(Button);
            expect(submitButton).toBeDefined();
            expect(submitButton).toHaveLength(1);
            expect(submitButton.props().disabled).toEqual(true);
        });

        it('should render the dropdown list', () => {
            const dropdDown = wrapper.find(ResearcherDropdown);
            expect(dropdDown).toBeDefined();
            expect(dropdDown).toHaveLength(1);
        });

        it('should render all the checkboxes', () => {
            const checkboxes = wrapper.find(Checkbox);
            expect(checkboxes).toBeDefined();
            expect(checkboxes).toHaveLength(4);
        });
    });

    describe('Dropdown for language is populated', () => {
        it('should populate the language dropdown', () => {
            const languageDropDown = wrapper.find('#language');
            languages.forEach((l) => {
                expect(languageDropDown.props().options).toContain(l);
            });
        });
    });


    describe('State changes correctly', () => {
        it('should change the state on selecting a dropdown item', () => {
            const languageDropDown = wrapper.find('#language');
            const mockSelectEvent = { target: { name: languageDropDown.props().name } };
            languageDropDown.prop('handleSelect')('English', mockSelectEvent);
            expect(wrapper.state('language')).toEqual('English');
        });

        it('should change the state on giving input', () => {
            const inputBoxes = wrapper.find(FormControl);
            const nInput = inputBoxes.filterWhere(i => i.props().name === 'nLow');
            const mockInputChange = { target: { name: nInput.props().name, value: '5' } };
            nInput.prop('onChange')(mockInputChange);
            expect(wrapper.state('nLow')).toEqual('5');
        });
    });

    describe('Validations are processed correctly', () => {
        it('should not enable the submit button on invalid input', () => {
            const inputBoxes = wrapper.find(FormControl);
            const language = wrapper.find('#language');
            const nStart = inputBoxes.filterWhere(i => i.props().name === 'nLow');
            const profileUnknownStart = inputBoxes.filterWhere(i => i.props().name === 'profileSizeUnknownLow');
            const profileKnownStart = inputBoxes.filterWhere(i => i.props().name === 'profileSizeKnownHigh');

            const mockSelectEventLanguage = { target: { name: language.props().name } };
            language.prop('handleSelect')('English', mockSelectEventLanguage);
            const mockSelectEventN = { target: { name: nStart.props().name, value: '15' } };
            nStart.prop('onChange')(mockSelectEventN);
            const mockSelectEventProUnk = { target: { name: profileUnknownStart.props().name, value: '80' } };
            profileUnknownStart.prop('onChange')(mockSelectEventProUnk);
            const mockSelectEventProK = { target: { name: profileKnownStart.props().name, value: '80' } };
            profileKnownStart.prop('onChange')(mockSelectEventProK);

            expect(wrapper.find(Button).props().disabled).toEqual(true);
        });

        it('should enable the submit button on valid input', () => {
            const inputBoxes = wrapper.find(FormControl);
            const language = wrapper.find('#language');
            const distanceFunctions = wrapper.find('input');

            const nStart = inputBoxes.filterWhere(i => i.props().name === 'nLow');
            const nEnd = inputBoxes.filterWhere(i => i.props().name === 'nHigh');
            const profileUnknownStart = inputBoxes.filterWhere(i => i.props().name === 'profileSizeUnknownLow');
            const profileUnknownEnd = inputBoxes.filterWhere(i => i.props().name === 'profileSizeUnknownHigh');
            const profileUnknownStep = inputBoxes.filterWhere(i => i.props().name === 'profileSizeUnknownStep');
            const profileKnownStart = inputBoxes.filterWhere(i => i.props().name === 'profileSizeKnownLow');
            const profileKnownEnd = inputBoxes.filterWhere(i => i.props().name === 'profileSizeKnownHigh');
            const profileKnownStep = inputBoxes.filterWhere(i => i.props().name === 'profileSizeKnownStep');
            const cosineFunction = distanceFunctions.filterWhere(i => i.props().name === 'cosineSimilarity');

            const mockSelectEventLanguage = { target: { name: language.props().name } };
            language.prop('handleSelect')('English', mockSelectEventLanguage);

            const mockSelectEventNStart = { target: { name: nStart.props().name, value: '5' } };
            nStart.prop('onChange')(mockSelectEventNStart);
            const mockSelectEventNEnd = { target: { name: nEnd.props().name, value: '8' } };
            nEnd.prop('onChange')(mockSelectEventNEnd);

            const mockSelectEventProUnkLow = { target: { name: profileUnknownStart.props().name, value: '80' } };
            profileUnknownStart.prop('onChange')(mockSelectEventProUnkLow);
            const mockSelectEventProUnkHigh = { target: { name: profileUnknownEnd.props().name, value: '80' } };
            profileUnknownEnd.prop('onChange')(mockSelectEventProUnkHigh);
            const mockSelectEventProUnkStep = { target: { name: profileUnknownStep.props().name, value: '20' } };
            profileUnknownStep.prop('onChange')(mockSelectEventProUnkStep);

            const mockSelectEventProKLow = { target: { name: profileKnownStart.props().name, value: '80' } };
            profileKnownStart.prop('onChange')(mockSelectEventProKLow);
            const mockSelectEventProKHigh = { target: { name: profileKnownEnd.props().name, value: '80' } };
            profileKnownEnd.prop('onChange')(mockSelectEventProKHigh);
            const mockSelectEventProKStep = { target: { name: profileKnownStep.props().name, value: '20' } };
            profileKnownStep.prop('onChange')(mockSelectEventProKStep);

            const mockDistanceFunctionSelect = {target: { name: cosineFunction.props().name, checked: true } };
            cosineFunction.prop('onChange')(mockDistanceFunctionSelect);

            // sample unknown file
            wrapper.setProps({ unknownFile: { file: 'sample' } });

            expect(wrapper.find(Button).props().disabled).toEqual(false);
        });
    });
});
