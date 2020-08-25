// EducatorInputForm
// For user to input parameters and submit test request to back end
import React from 'react';
import {
  Row, Col, ControlLabel,
  Checkbox, Button, Panel,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { post } from '../../common/Request';
import FormValidation from '../../common/FormValidation';
import HelpPopover from '../../common/HelpPopover';
import HelpContent from '../../common/HelpContent';
import InputDropdown from '../../common/InputDropdown';
import InputCustom from '../../common/InputCustom';

class EducatorInputForm extends React.Component {
  constructor(props) {
    super(props);

    // States for each of the parameter
    this.state = {
      canSubmit: false,
      unknownFile: null,
      language: null,
      n: '',
      distanceFunction: null,
      profileSizeUnknown: '',
      profileSizeKnown: '',
      threshold: '',
      punctuation: false, // eslint-disable-line react/no-unused-state
      number: false, // eslint-disable-line react/no-unused-state
      lowercase: false, // eslint-disable-line react/no-unused-state
      alphabet: false, // eslint-disable-line react/no-unused-state
      // All parameters stringified, so unused eslint error is incorrect
    };

    EducatorInputForm.defaultProps = {
      unknownFile: null,
      knownFiles: null,
    };

    EducatorInputForm.propTypes = {
      handleSubmit: PropTypes.func.isRequired,
      unknownFile: PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        lastModifiedDate: PropTypes.instanceOf(Date),
        size: PropTypes.number,
      }),
      knownFiles: PropTypes.arrayOf(String),
      username: PropTypes.string.isRequired,
      studentEmail: PropTypes.string.isRequired,
    };

    this.eventKeys = {
      english: 'English',
      cosinesimilarity: 'Cosine Similarity',
      euclideandistance: 'Euclidean Distance',
      pearsondistance: 'Pearson Distance',
      keseljdistance: 'Keselj Distance',
      canberradistance: 'Canberra Distance',
    };

    this.stateNames = {
      language: 'language',
      n: 'n',
      distanceFunction: 'distanceFunction',
      profileSizeUnknown: 'profileSizeUnknown',
      profileSizeKnown: 'profileSizeKnown',
      threshold: 'threshold',
      punctuation: 'punctuation',
      number: 'number',
      lowercase: 'lowercase',
      alphabet: 'alphabet',
    };

    autoBind(this);
  }

  // Update this component on parent's update
  componentWillReceiveProps(nextProps) {
    this.setState({
      unknownFile: nextProps.unknownFile,
      knownFiles: nextProps.knownFiles,
    }, () => this.getSubmitValidationState());
  }

  // Validate the parameters before submitting
  getSubmitValidationState() {
    if (
      (FormValidation.getValidationState(this.state.n, 2, 12) &&
      FormValidation.getValidationState(this.state.profileSizeUnknown, 1, 100) &&
      FormValidation.getValidationState(this.state.profileSizeKnown, 1, 100) &&
      FormValidation.getValidationState(this.state.threshold, 0, 1)) === 'success' &&
      this.state.language != null &&
      this.state.distanceFunction != null &&
      this.state.unknownFile != null &&
      this.state.knownFiles.length > 0
    ) {
      this.setState({
        canSubmit: true,
      });
    } else {
      this.setState({
        canSubmit: false,
      });
    }
  }

  // Update the form validation on parameter's change
  handleSelectChange(value, e) {
    this.setState({
      [e.target.name]: value,
    }, () => this.getSubmitValidationState());
  }

  // Update the form validation on parameter's change
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    }, () => this.getSubmitValidationState());
  }

  handleCheck(e) {
    this.setState({
      [e.target.id]: e.target.checked,
    });
  }

  // Submit the request with all parameters and known file list, unknown files
  // Then return the response to parent component
  handleSubmit(e) {
    const formdata = new FormData();
    formdata.append('file', this.state.unknownFile);
    formdata.append('lastModified', this.state.unknownFile.lastModified);
    const parametersString = JSON.stringify(this.state);
    formdata.append('parameters', parametersString);
    formdata.append('knownFileList', JSON.stringify(this.props.knownFiles));
    formdata.append('studentEmail', this.props.studentEmail);
    formdata.append('username', this.props.username);
    const body = {
      isFile: true,
      data: formdata,
    };
    post('educator/submit', body).then(res => this.props.handleSubmit(e, res));
  }

  render() {
    return (
      <div>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title componentClass="h4">Input Parameters:</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <form>
              <InputDropdown
                label="Language"
                name="language"
                defaultLabel="Select Language"
                value={this.state.language}
                id="language"
                options={['English']}
                handleSelect={this.handleSelectChange}
                content={HelpContent.LANGUAGE}
              />
              <InputCustom
                label="N"
                name="n"
                placeholder="Enter n-gram"
                validation={FormValidation.getNValidationState(this.state.n)}
                handleInput={this.handleInputChange}
                content={HelpContent.N}
                fieldLength={3}
              />
              <InputDropdown
                label="Distance Function"
                name="distanceFunction"
                value={this.state.distanceFunction}
                defaultLabel="Select Distance Function"
                id="distanceFunction"
                options={['Cosine Similarity', 'Euclidean Distance',
                'Pearson Distance', 'Keselj Distance', 'Canberra Distance']}
                handleSelect={this.handleSelectChange}
                content={HelpContent.DISTANCE_FUNCTION}
              />
              <InputCustom
                label="Profile Size (Unknown Text)"
                name="profileSizeUnknown"
                placeholder="Enter profile size of the unknown text"
                validation={FormValidation.getUnknownValidationState(this.state.profileSizeUnknown)}
                handleInput={this.handleInputChange}
                content={HelpContent.PROFILE_SIZE_UNKNOWN}
                fieldLength={3}
              />
              <InputCustom
                label="Profile Size (Known Text)"
                name="profileSizeKnown"
                placeholder="Enter profile size of the known text"
                validation={FormValidation.getKnownValidationState(this.state.profileSizeKnown)}
                handleInput={this.handleInputChange}
                content={HelpContent.PROFILE_SIZE_KNOWN}
                fieldLength={3}
              />
              <InputCustom
                label="Threshold"
                name="threshold"
                placeholder="Enter threshold"
                validation={FormValidation.getThresholdValidationState(this.state.threshold)}
                handleInput={this.handleInputChange}
                content={HelpContent.THRESHOLD}
                fieldLength={3}
              />
              <Row>
                <Col md={2}>
                  <ControlLabel>Preprocesses:</ControlLabel>
                </Col>
                <Col md={3}>
                  <Checkbox id={this.stateNames.punctuation} onChange={this.handleCheck}>
                    Strip Punctuation Marks
                  </Checkbox>
                  <Checkbox id={this.stateNames.number} onChange={this.handleCheck}>
                    Strip Numbers
                  </Checkbox>
                  <Checkbox id={this.stateNames.lowercase} onChange={this.handleCheck}>
                    Lowercase
                  </Checkbox>
                  <Checkbox id={this.stateNames.alphabet} onChange={this.handleCheck}>
                    Basic Alphabet
                  </Checkbox>
                </Col>
                <Col md={1}>
                  <HelpPopover
                    title="Preprocessing"
                    content={HelpContent.PRE_PROCESSING}
                  />
                </Col>
              </Row>
              <Row><Col md={12}><br /></Col></Row>
              <Row>
                <Col md={2}>
                  <Button disabled={!this.state.canSubmit} onClick={this.handleSubmit} bsStyle="primary">Submit</Button>
                </Col>
              </Row>
            </form>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default EducatorInputForm;
