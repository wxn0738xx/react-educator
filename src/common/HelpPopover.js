// HelpPopover Component
// Shows help information on the question mark icon for each item
import React from 'react';
import { Glyphicon, OverlayTrigger, Popover } from 'react-bootstrap';
import PropTypes from 'prop-types';

const helpIcon = {
  margin: 'auto',
  cursor: 'help',
};

const HelpPopover = (props) => {
  HelpPopover.propTypes = {
    content: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };
  const popoverHover = (
    <Popover id="popover-trigger-hover" title={props.title}>
      {props.content}
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement="right"
      overlay={popoverHover}
      delayShow={500}
    >
      <Glyphicon glyph="info-sign" className={helpIcon} />
    </OverlayTrigger>
  );
};

export default HelpPopover;
