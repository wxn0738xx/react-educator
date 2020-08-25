// InputCustom component
// Input text field
import React from 'react';
import { Row, Col, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import HelpPopover from './HelpPopover';

const verticalAlign = {
  transform: 'TranslateY(50%)',
};

const feedBack = {
  paddingRight: '35px',
};

const InputCustom = (props) => {
  InputCustom.defaultProps = {
    content: '',
    validation: '',
    handleInput: null,
    fieldLength: 3,
    type: 'text',
  };

  InputCustom.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    content: PropTypes.string,
    validation: PropTypes.string,
    handleInput: PropTypes.func,
    fieldLength: PropTypes.number,
    type: PropTypes.string,
  };

  return (
    <div>
      <Row>
        <Col md={2}>
          <ControlLabel>{props.label}:</ControlLabel>
        </Col>
        <FormGroup controlId={props.label} validationState={props.validation}>
          <Col md={props.fieldLength}>
            <FormControl
              name={props.name}
              onChange={props.handleInput}
              type={props.type}
              placeholder={props.placeholder}
            />
            <FormControl.Feedback style={feedBack} />
          </Col>
          <Col md={1} style={verticalAlign}>
            <HelpPopover
              title={props.label}
              content={props.content}
            />
          </Col>
        </FormGroup>
      </Row>
      <Row><Col md={12}><br /></Col></Row>
    </div>
  );
};

export default InputCustom;
