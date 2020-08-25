// SelectText component
// For selecting the known files, uses UploadModal and FileTable components
// Does nothing by itself
import React from 'react';
import { Row, Col, ControlLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import UploadModal from '../../common/UploadModal';
import FileTable from '../../common/FileTable';

class KnownText extends React.Component {
  constructor(props) {
    super(props);

    KnownText.propTypes = {
      handleSelect: PropTypes.func.isRequired,
      files: PropTypes.arrayOf(Object).isRequired,
      username: PropTypes.string.isRequired,
      studentEmail: PropTypes.string.isRequired,
      refreshList: PropTypes.func.isRequired,
    };
    autoBind(this);
  }

  render() {
    return (
      <div>
        <Row md={2}>
          <Col md={10}>
            <ControlLabel>Known Text by Student: </ControlLabel>
          </Col>
          <Col md={1}>
            <UploadModal
              username={this.props.username}
              studentEmail={this.props.studentEmail}
              refreshList={this.props.refreshList}
            />
          </Col>
        </Row>

        <FileTable
          files={this.props.files}
          handleSelect={this.props.handleSelect}
        />
      </div>
    );
  }
}

export default KnownText;
