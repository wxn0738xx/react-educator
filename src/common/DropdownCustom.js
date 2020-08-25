// DropdownCustom
// Dropdown component that displays different options
import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SearchDropdownCustom from './SearchDropdownCustom';

const getMenuItems = (name, options, onSelect) => {
  const items = [];
  if (options) {
    options.sort().forEach((option, i) => {
      items.push(
        <MenuItem
          id={option}
          key={i}
          name={name}
          eventKey={option}
          onSelect={onSelect}
        >{option}
        </MenuItem>,
      );
    });
  }
  return items;
};

const DropdownCustom = (props) => {
  DropdownCustom.defaultProps = {
    name: '',
    value: '',
    isSearchable: false,
  };

  DropdownCustom.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    defaultLabel: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleSelect: PropTypes.func.isRequired,
    isSearchable: PropTypes.bool,
  };

  if (props.isSearchable === false) {
    return (
      <DropdownButton
        title={props.value ? props.value : props.defaultLabel}
        id={props.id}
      >
        {getMenuItems(props.name, props.options, props.handleSelect)}
      </DropdownButton>
    );
  }
  return (
    <SearchDropdownCustom
      name={props.name}
      value={props.value}
      defaultLabel={props.defaultLabel}
      options={props.options}
      handleSelect={props.handleSelect}
    />
  );
};

export default DropdownCustom;
