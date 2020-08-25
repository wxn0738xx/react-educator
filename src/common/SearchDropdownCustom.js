// InlineDropdownCustom
// Dropdown component that displays different options
import React from 'react';
import PropTypes from 'prop-types';
import { Typeahead } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import './styles/InlineDropdownCustom.css';


const SearchDropdownCustom = (props) => {
  const isMatch = (value) => {
    if (value.length === 1 && props.options.includes(value[0])) {
      props.handleSelect(value);
    }
  };

  SearchDropdownCustom.defaultProps = {
    name: '',
    value: '',
  };

  SearchDropdownCustom.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    defaultLabel: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleSelect: PropTypes.func.isRequired,
  };

  return (
    <Typeahead
      labelKey={props.name}
      options={props.options.sort()}
      placeholder={props.defaultLabel}
      onChange={selected => isMatch(selected)}
      selected={props.value ? [props.value] : null}
    />
  );
};

export default SearchDropdownCustom;
