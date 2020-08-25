// Test suite for EducatorInputForm component
import React from 'react';
import { shallow } from 'enzyme';
import { Button, Checkbox } from 'react-bootstrap';
import EducatorInputForm, { EducatorDropdown } from '../../component/inputs/EducatorInputForm';
import InputCustom from '../../common/InputCustom';


// describe what we are testing
describe('EducatorInputForm Component', () => {
  let props;
  let wrapper;
  const languages = ['English'];
  const distanceFunctions = ['Cosine Similarity', 'Euclidean Distance',
    'Pearson Distance', 'Keselj Distance', 'Canberra Distance'];

  beforeAll(() => {
    props = {
      handleSubmit: () => ('sample handle submit'),
      username: 'username',
      studentEmail: 'email',
    };
    wrapper = shallow(<EducatorInputForm {...props} />);
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

    it('should render the dropdown lists', () => {
      const dropdDowns = wrapper.find(EducatorDropdown);
      expect(dropdDowns).toBeDefined();
      expect(dropdDowns).toHaveLength(2);
    });

    it('should render the input boxes', () => {
      const inputBoxes = wrapper.find(InputCustom);
      expect(inputBoxes).toBeDefined();
      expect(inputBoxes).toHaveLength(4);
    });

    it('should render the checkboxes', () => {
      const checkboxes = wrapper.find(Checkbox);
      expect(checkboxes).toBeDefined();
      expect(checkboxes).toHaveLength(4);
    });
  });

  describe('Dropdowns are populated', () => {
    it('should populate the language dropdown', () => {
      const languageDropDown = wrapper.find('#language');
      languages.forEach((l) => {
        expect(languageDropDown.props().options).toContain(l);
      });
    });

    it('should populate the distance function dropdown', () => {
      const languageDropDown = wrapper.find('#distanceFunction');
      distanceFunctions.forEach((f) => {
        expect(languageDropDown.props().options).toContain(f);
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
      const inputBoxes = wrapper.find(InputCustom);
      const nInput = inputBoxes.filterWhere(i => i.props().name === 'n');
      const mockSelectEvent = { target: { name: nInput.props().name, value: '5' } };
      nInput.prop('handleInput')(mockSelectEvent);
      expect(wrapper.state('n')).toEqual('5');
    });

    it('should change the state on checking/unchecking preprocessings', () => {
      const preprocessings = ['punctuation', 'number', 'lowercase', 'alphabet'];
      preprocessings.forEach((process) => {
        const checkbox = wrapper.find((`#${process}`));
        expect(checkbox).toBeDefined();

        // Checking works
        let mockCheckEvent = { target: { id: checkbox.props().id, checked: true } };
        checkbox.prop('onChange')(mockCheckEvent);
        expect(wrapper.state(process)).toEqual(true);

        // Uncheckng works
        mockCheckEvent = { target: { id: checkbox.props().id, checked: false } };
        checkbox.prop('onChange')(mockCheckEvent);
        expect(wrapper.state(process)).toEqual(false);
      });
    });
  });

  describe('Validations are processed correctly', () => {
    it('should not enable the submit button on invalid input', () => {
      const inputBoxes = wrapper.find(InputCustom);
      const language = wrapper.find('#language');
      const n = inputBoxes.filterWhere(i => i.props().name === 'n');
      const distanceFunction = wrapper.find('#distanceFunction');
      const profileUnknown = inputBoxes.filterWhere(i => i.props().name === 'profileSizeUnknown');
      const profileKnown = inputBoxes.filterWhere(i => i.props().name === 'profileSizeKnown');
      const threshold = inputBoxes.filterWhere(i => i.props().name === 'threshold');

      const mockSelectEventLanguage = { target: { name: language.props().name } };
      language.prop('handleSelect')('English', mockSelectEventLanguage);
      const mockSelectEventDist = { target: { name: distanceFunction.props().name } };
      distanceFunction.prop('handleSelect')('Euclidean Distance', mockSelectEventDist);
      const mockSelectEventN = { target: { name: n.props().name, value: '15' } };
      n.prop('handleInput')(mockSelectEventN);
      const mockSelectEventProUnk = { target: { name: profileUnknown.props().name, value: '80' } };
      profileUnknown.prop('handleInput')(mockSelectEventProUnk);
      const mockSelectEventProK = { target: { name: profileKnown.props().name, value: '80' } };
      profileKnown.prop('handleInput')(mockSelectEventProK);
      const mockSelectEventThresh = { target: { name: threshold.props().name, value: '2' } };
      threshold.prop('handleInput')(mockSelectEventThresh);

      expect(wrapper.find(Button).props().disabled).toEqual(true);
    });

    it('should enable the submit button on valid input', () => {
      const inputBoxes = wrapper.find(InputCustom);
      const language = wrapper.find('#language');
      const n = inputBoxes.filterWhere(i => i.props().name === 'n');
      const distanceFunction = wrapper.find('#distanceFunction');
      const profileUnknown = inputBoxes.filterWhere(i => i.props().name === 'profileSizeUnknown');
      const profileKnown = inputBoxes.filterWhere(i => i.props().name === 'profileSizeKnown');
      const threshold = inputBoxes.filterWhere(i => i.props().name === 'threshold');
      const mockSelectEventLanguage = { target: { name: language.props().name } };
      language.prop('handleSelect')('English', mockSelectEventLanguage);
      const mockSelectEventDist = { target: { name: distanceFunction.props().name } };
      distanceFunction.prop('handleSelect')('Euclidean Distance', mockSelectEventDist);
      const mockSelectEventN = { target: { name: n.props().name, value: '5' } };
      n.prop('handleInput')(mockSelectEventN);
      const mockSelectEventProUnk = { target: { name: profileUnknown.props().name, value: '200' } };
      profileUnknown.prop('handleInput')(mockSelectEventProUnk);
      const mockSelectEventProK = { target: { name: profileKnown.props().name, value: '200' } };
      profileKnown.prop('handleInput')(mockSelectEventProK);
      const mockSelectEventThresh = { target: { name: threshold.props().name, value: '0.5' } };
      threshold.prop('handleInput')(mockSelectEventThresh);

      // sample unknown and known files
      wrapper.setProps({ unknownFile: { file: 'sample' }, knownFiles: [{ file: 'sampleKnown' }] });

      expect(wrapper.find(Button).props().disabled).toEqual(false);
    });
  });
});
