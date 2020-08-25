// RadioCustom
// Dropdown component that displays different options
import React from 'react';
import { Row, Col, ControlLabel, FormGroup, ToggleButtonGroup, ToggleButton, ButtonToolbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import HelpPopover from './HelpPopover';

const verticalAlign = {
  transform: 'TranslateY(50%)',
};

const feedBack = {
  paddingRight: '35px',
};

const RadioCustom = (props) => {
  RadioCustom.defaultProps = {
    name: '',
    fieldLength: 3,
    content: '',
  };

  RadioCustom.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    keyValues: PropTypes.instanceOf(Map).isRequired,
    id: PropTypes.string.isRequired,
    content: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    fieldLength: PropTypes.number,
  };

  const getMenuItems = (name, keyValues) => {
    const items = [];
    keyValues.forEach((value, key) => {
      items.push(
        <ToggleButton
          value={key}
          name={name}
          key={key}
        >
          {value}
        </ToggleButton>,
      );
    });
    return items;
  };

  return (
    <div>
      <Row>
        <Col md={2}>
          <ControlLabel>{props.label}:</ControlLabel>
        </Col>
        <FormGroup controlId={props.label}>
          <Col md={props.fieldLength}>
            <ButtonToolbar style={feedBack}>
              <ToggleButtonGroup
                type="radio"
                id={props.id}
                name={props.name}
                onChange={props.handleChange}
                defaultValue={['0']}
              >
                {getMenuItems(props.name, props.keyValues)}
              </ToggleButtonGroup>
            </ButtonToolbar>
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

export default RadioCustom;
