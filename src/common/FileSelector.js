// FileSelector Component
// For select files from user's local machine
import React from 'react';
import { Col, FormGroup, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';


const styles = {
  fileInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

class FileSelector extends React.Component {
  constructor(props) {
    super(props);

    FileSelector.propTypes = {
      label: PropTypes.string.isRequired,
      supportMultiple: PropTypes.bool.isRequired,
      handleSelect: PropTypes.func.isRequired,
    };

    autoBind(this);
  }

  handleSelect(e) {
    this.props.handleSelect(e.target.files);
  }

  render() {
    return (
      <div className="text_center">
        <Col md={4}>
          <FormGroup>
            <Button>
              {this.props.label}
            </Button>
            <FormControl
              type="file"
              multiple={this.props.supportMultiple}
              onChange={this.handleSelect}
              style={styles.fileInput}
              accept=".txt,.doc,.docx"
            />
          </FormGroup>
        </Col>
      </div>
    );
  }
}

export default FileSelector;
