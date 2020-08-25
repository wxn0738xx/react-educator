// UnknownText component
// Handles uploading the unknown file under test
import React from 'react';
import { Row, Col, ControlLabel, FormControl, Panel, Button } from 'react-bootstrap';
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
    width: '15%',
    opacity: 0,
  },
};

export const FilePicker = ({
  name, title, size, handleSelect,
}) => (
  <div>
    <Row>
      <Col md={5} >
        <Button>
          {name}
          <FormControl
            type="file"
            style={styles.fileInput}
            onChange={handleSelect}
            accept=".txt"
          />
        </Button>
      </Col>
    </Row>
    <br />
    <Row>
      <Col md={2}>
        <ControlLabel>File Name: </ControlLabel>
      </Col>
      <Col md={10} >
        <ControlLabel>{title}</ControlLabel>
      </Col>
    </Row>
    <Row>
      <Col md={2}>
        <ControlLabel>File Size : </ControlLabel>
      </Col>
      <Col md={10}>
        <ControlLabel>{size}</ControlLabel>
      </Col>
    </Row>
  </div>
);

FilePicker.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  size: PropTypes.string,
  handleSelect: PropTypes.func.isRequired,
};

FilePicker.defaultProps = {
  title: '',
  size: '',
};

export default class UnknownText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      size: null,
    };

    UnknownText.propTypes = {
      getUnknownFile: PropTypes.func.isRequired,
    };

    autoBind(this);
  }

  // Select the unknown file from file system and call parent's function
  // to store the unknown file
  handleSelect(e) {
    if (e.target.files.length > 0) {
      this.setState({
        title: e.target.files[0].name,
        size: `${(e.target.files[0].size / 1024).toFixed(2)}KB`,
      });
      this.props.getUnknownFile(e.target.files);
    }
  }

  render() {
    return (
      <div>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title componentClass="h3">Work to be Checked</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <FilePicker
              name="Select file"
              title={this.state.title}
              size={this.state.size}
              handleSelect={this.handleSelect}
            />
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}
