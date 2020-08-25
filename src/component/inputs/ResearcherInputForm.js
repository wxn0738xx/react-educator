// Researcher Input Form
// For user to input parameters for batch testing and submit test request to back end
import React from 'react';
import {
  Row, Col, ControlLabel, Checkbox,
  Button, Panel,
  FormGroup, FormControl,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { post } from '../../common/Request';
import FormValidation from '../../common/FormValidation';
import HelpPopover from '../../common/HelpPopover';
import HelpContent from '../../common/HelpContent';
import InputDropdown from '../../common/InputDropdown';

const feedBack = {
  paddingRight: '35px',
};

const verticalAlign = {
  transform: 'TranslateY(50%)',
};

class ResearcherInputForm extends React.Component {
  constructor(props) {
    super(props);

    // States for each of the parameter
    this.state = {
      canSubmit: false,
      dataset: null,
      language: null,
      nLow: '',
      nHigh: '',

      cosineSimilarity: false,
      euclideanDistance: false,
      pearsonDistance: false,
      keseljDistance: false,
      canberraDistance: false,
      distanceCheckbox: [],

      profileSizeUnknownLow: '',
      profileSizeUnknownHigh: '',
      profileSizeUnknownStep: '',
      profileSizeKnownLow: '',
      profileSizeKnownHigh: '',
      profileSizeKnownStep: '',
      threshold: '0.5', // eslint-disable-line react/no-unused-state

      prePunctuation: false, // eslint-disable-line react/no-unused-state
      preNumber: false, // eslint-disable-line react/no-unused-state
      preLowercase: false, // eslint-disable-line react/no-unused-state
      preAlphabet: false, // eslint-disable-line react/no-unused-state
    };

    ResearcherInputForm.defaultProps = {
      dataset: null,
    };

    ResearcherInputForm.propTypes = {
      handleSubmit: PropTypes.func.isRequired,
      dataset: PropTypes.arrayOf(String),
      username: PropTypes.string.isRequired,
    };

    this.stateNames = {
      language: 'language',
      nLow: 'nLow',
      nHigh: 'nHigh',

      cosineSimilarity: 'cosineSimilarity',
      euclideanDistance: 'euclideanDistance',
      pearsonDistance: 'pearsonDistance',
      keseljDistance: 'keseljDistance',
      canberraDistance: 'canberraDistance',
      distanceFunction: 'distanceFunction',

      profileSizeUnknownLow: 'profileSizeUnknownLow',
      profileSizeUnknownHigh: 'profileSizeUnknownHigh',
      profileSizeUnknownStep: 'profileSizeUnknownStep',
      profileSizeKnownLow: 'profileSizeKnownLow',
      profileSizeKnownHigh: 'profileSizeKnownHigh',
      profileSizeKnownStep: 'profileSizeKnownStep',

      threshold: 'threshold',

      prePunctuation: 'prePunctuation',
      preNumber: 'preNumber',
      preLowercase: 'preLowercase',
      preAlphabet: 'preAlphabet',
    };

    autoBind(this);
  }

  // Update this component on parent's update
  componentWillReceiveProps(nextProps) {
    this.setState({
      dataset: nextProps.dataset,
    }, () => this.getSubmitValidationState());
  }

  // Validate the parameters before submitting
  getSubmitValidationState() {
    if (
      (FormValidation.getValidationState(this.state.nLow, 2, 12) &&
          FormValidation.getValidationState(this.state.nHigh, 2, 12) &&
          FormValidation.getValidationState(this.state.profileSizeUnknownLow, 1, 100) &&
          FormValidation.getValidationState(this.state.profileSizeUnknownHigh, 1, 100) &&
          FormValidation.getValidationState(this.state.profileSizeUnknownStep, 1, 100) &&
          FormValidation.getValidationState(this.state.profileSizeKnownLow, 1, 100) &&
          FormValidation.getValidationState(this.state.profileSizeKnownHigh, 1, 100) &&
          FormValidation.getValidationState(this.state.profileSizeKnownStep, 1, 100)
      ) === 'success' &&
      this.state.language != null &&
      this.state.distanceCheckbox.length > 0 &&
      this.state.dataset != null
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

  // Check if the distance function is ticked and put the ticked function in an array
  handleDistanceCheck(e) {
    const disArray = this.state.distanceCheckbox;

    if (e.target.checked) {
      disArray.push(e.target.value);
    } else {
      disArray.splice(disArray.indexOf(e.target.value), 1);
    }
    this.setState({
      [e.target.name]: e.target.checked,
      distanceCheckbox: disArray,
    }, () => this.getSubmitValidationState());
  }

  // Submit the request with all parameters and known file list, unknown files
  // Then return the response to parent component
  handleSubmit(e) {
    const req = {
      username: this.props.username,
      dataset: this.props.dataset,
      parameters: this.state,
    };
    post('researcher/submit', req).then(res => this.props.handleSubmit(e, res));

    // post('researcher/submit', body).then(res => this.props.handleSubmit(e, res));

    // const formdata = new FormData();
    // formdata.append('dataset', this.state.dataset);
    // const parametersString = JSON.stringify(this.state);
    // formdata.append('parameters', parametersString);
    // formdata.append('username', this.props.username);
    // const body = {
    //   isFile: true,
    //   data: formdata,
    // };

  }

  render() {
    return (
      <div>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title componentClass="h4">Input Parameters for Batch Testing:</Panel.Title>
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
                colWidth="6"
              />

              <div>
                <Row>
                  <Col md={2}>
                    <ControlLabel>N-gram Range:</ControlLabel>
                  </Col>
                  <FormGroup
                    controlId="N Range"
                    validationState={
                      FormValidation.getNRangeValidationState(this.state.nLow,
                        this.state.nHigh)
                    }
                  >
                    <Col md={3}>
                      <FormControl
                        name="nLow"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Start ..."
                      />
                      <FormControl.Feedback style={feedBack} />
                    </Col>
                    <Col md={3}>
                      <FormControl
                        name="nHigh"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="End ..."
                      />
                      <FormControl.Feedback style={feedBack} />
                    </Col>
                    <Col md={1} style={verticalAlign}>
                      <HelpPopover
                        title="N Range"
                        content={HelpContent.N}
                      />
                    </Col>
                  </FormGroup>
                </Row>
                <Row><Col md={12}><br /></Col></Row>
              </div>

              <Row>
                <Col md={2}>
                  <ControlLabel>Distance Functions:</ControlLabel>
                </Col>
                <Col md={6}>
                  <p>
                    <input name="cosineSimilarity" type="checkbox" value="cosineSimilarity"
                       checked={this.state.cosineSimilarity}
                       onChange={this.handleDistanceCheck}/>
                      &nbsp; Cosine Similarity
                  </p>
                  <p>
                      <input name="euclideanDistance" type="checkbox" value="euclideanDistance"
                             checked={this.state.euclideanDistance}
                             onChange={this.handleDistanceCheck}/>
                      &nbsp; Euclidean Distance
                  </p>
                  <p>
                      <input name="pearsonDistance" type="checkbox" value="pearsonDistance"
                             checked={this.state.pearsonDistance}
                             onChange={this.handleDistanceCheck}/>
                      &nbsp; Pearson Distance
                  </p>
                  <p>
                      <input name="keseljDistance" type="checkbox" value="keseljDistance"
                             checked={this.state.keseljDistance}
                             onChange={this.handleDistanceCheck}/>
                      &nbsp; Keselj Distance
                  </p>
                  <p>
                      <input name="canberraDistance" type="checkbox" value="canberraDistance"
                             checked={this.state.canberraDistance}
                             onChange={this.handleDistanceCheck}/>
                      &nbsp; Canberra Distance
                  </p>
              </Col>
              <Col md={1}>
                  <HelpPopover
                      title="DistanceFunctions"
                      content={HelpContent.DISTANCE_FUNCTION}
                  />
                </Col>
              </Row>

                            <div>
                                <Row>
                                    <Col md={2}>
                                        <ControlLabel>Profile Size Range(Unknown Text):</ControlLabel>
                                    </Col>
                                    <FormGroup controlId="Profile Size (Unknown Text)"
                                               validationState=
                                                   {FormValidation.getUnknownRangeValidationState(
                                                       this.state.profileSizeUnknownLow,
                                                       this.state.profileSizeUnknownHigh,
                                                       this.state.profileSizeUnknownStep)} >
                                        <Col md={2}>
                                            <FormControl
                                                name="profileSizeUnknownLow"
                                                onChange={this.handleInputChange}
                                                type="text"
                                                placeholder="Start ..."
                                            />
                                            <FormControl.Feedback style={feedBack} />
                                        </Col>
                                        <Col md={2}>
                                            <FormControl
                                                name="profileSizeUnknownHigh"
                                                onChange={this.handleInputChange}
                                                type="text"
                                                placeholder="End ..."
                                            />
                                            <FormControl.Feedback style={feedBack} />
                                        </Col>
                                        <Col md={2}>
                                            <FormControl
                                                name="profileSizeUnknownStep"
                                                onChange={this.handleInputChange}
                                                type="text"
                                                placeholder="Step ..."
                                            />
                                            <FormControl.Feedback style={feedBack} />
                                        </Col>
                                        <Col md={1} style={verticalAlign}>
                                            <HelpPopover
                                                title="Profile Size (Unknown Text)"
                                                content={HelpContent.PROFILE_SIZE_UNKNOWN}
                                            />
                                        </Col>
                                    </FormGroup>
                                </Row>
                                <Row><Col md={12}><br /></Col></Row>
                            </div>

                            <div>
                                <Row>
                                    <Col md={2}>
                                        <ControlLabel>Profile Size Range(Known Text):</ControlLabel>
                                    </Col>
                                    <FormGroup controlId="Profile Size (Known Text)"
                                               validationState={FormValidation.getUnknownRangeValidationState(
                                                   this.state.profileSizeKnownLow,
                                                   this.state.profileSizeKnownHigh,
                                                   this.state.profileSizeKnownStep)} >
                                        <Col md={2}>
                                            <FormControl
                                                name="profileSizeKnownLow"
                                                onChange={this.handleInputChange}
                                                type="text"
                                                placeholder="Start ..."
                                            />
                                            <FormControl.Feedback style={feedBack} />
                                        </Col>
                                        <Col md={2}>
                                            <FormControl
                                                name="profileSizeKnownHigh"
                                                onChange={this.handleInputChange}
                                                type="text"
                                                placeholder="End ..."
                                            />
                                            <FormControl.Feedback style={feedBack} />
                                        </Col>
                                        <Col md={2}>
                                            <FormControl
                                                name="profileSizeKnownStep"
                                                onChange={this.handleInputChange}
                                                type="text"
                                                placeholder="Step ..."
                                            />
                                            <FormControl.Feedback style={feedBack} />
                                        </Col>
                                        <Col md={1} style={verticalAlign}>
                                            <HelpPopover
                                                title="Profile Size (Unknown Text)"
                                                content={HelpContent.PROFILE_SIZE_KNOWN}
                                            />
                                        </Col>
                                    </FormGroup>
                                </Row>
                                <Row><Col md={12}><br /></Col></Row>
                            </div>

                            <Row>
                                <Col md={2}>
                                    <ControlLabel>Preprocesses:</ControlLabel>
                                </Col>
                                <Col md={6}>
                                    <Checkbox id={this.stateNames.prePunctuation} onChange={this.handleCheck}>
                                        Strip Punctuation Marks
                                    </Checkbox>
                                    <Checkbox id={this.stateNames.preNumber} onChange={this.handleCheck}>
                                        Strip Numbers
                                    </Checkbox>
                                    <Checkbox id={this.stateNames.preLowercase} onChange={this.handleCheck}>
                                        Lowercase
                                    </Checkbox>
                                    <Checkbox id={this.stateNames.preAlphabet} onChange={this.handleCheck}>
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
                                    <Button disabled={!this.state.canSubmit}
                                            onClick={this.handleSubmit} bsStyle="primary">Submit</Button>
                                </Col>
                            </Row>
                        </form>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}

export default ResearcherInputForm;
