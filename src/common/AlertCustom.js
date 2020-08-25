// AlertCustom component
// Shows warning on register and login
import React from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

import autoBind from 'react-autobind';

class AlertCustom extends React.Component {
  constructor(props) {
    super(props);

    AlertCustom.defaultProps = {
      alertStyle: 'danger',
    };

    AlertCustom.propTypes = {
      show: PropTypes.bool.isRequired,
      handleDismiss: PropTypes.func.isRequired,
      heading: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      alertStyle: PropTypes.string,
    };

    autoBind(this);
  }

  render() {
    if (this.props.show) {
      return (
        <Alert bsStyle={this.props.alertStyle} onDismiss={this.props.handleDismiss}>
          <strong>{this.props.heading}</strong>
          <p>
            {this.props.content}
          </p>
        </Alert>
      );
    }
    return null;
  }
}

export default AlertCustom;
