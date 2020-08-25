import React from 'react';
import { Row, Col, ControlLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DropdownCustom from './DropdownCustom';
import HelpPopover from './HelpPopover';

const verticalAlign = {
  transform: 'TranslateY(50%)',
};

const InputDropdown = props => (
  <div>
    <Row>
      <Col md={2}>
        <ControlLabel>{props.label}:</ControlLabel>
      </Col>
      <Col md={props.colWidth}>
        <DropdownCustom
          name={props.name}
          value={props.value}
          defaultLabel={props.defaultLabel}
          id={props.id}
          options={props.options}
          handleSelect={props.handleSelect}
        />
      </Col>
      <Col md={1} style={verticalAlign}>
        <HelpPopover
          title={props.label}
          content={props.content}
        />
      </Col>
    </Row>
    <Row><Col md={12}><br /></Col></Row>
  </div>
);

InputDropdown.defaultProps = {
  value: '',
  colWidth: 3,
};

InputDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  defaultLabel: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(String).isRequired,
  handleSelect: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  colWidth: PropTypes.number,
};

export default InputDropdown;
