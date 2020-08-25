// UploadModal component
// Select and upload known files to the backend. Uses the FilesUpload component
import React from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import ConfirmTable from './ConfirmTable';
import FilesUpload from './FilesUpload';

class UploadModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      knownFiles: [],
    };
    UploadModal.propTypes = {
      username: PropTypes.string.isRequired,
      studentEmail: PropTypes.string.isRequired,
      refreshList: PropTypes.func.isRequired,
    };
    autoBind(this);
  }

  // Finish the upload and refresh the file list
  handleClose() {
    this.setState({ show: false, knownFiles: [] });
    this.props.refreshList();
  }

  // Show the file table of selected files for upload
  handleShow() {
    this.setState({ show: true });
  }

  // Delete the selected file in the table
  handleDeleteButtonClick = (row) => {
    this.setState({
      knownFiles: this.state.knownFiles.filter(file => !row.includes(file.name)),
    }, () => this.FilesUploadComponent.handleUpdate(this.state.knownFiles));
  }

  // Add the select known file to the file list
  // and calls parent to store the selected file
  handleKnownFileSelect(files) {
    const newArray = this.state.knownFiles;
    const nameArray = [];
    for (let i = 0; i < newArray.length; i += 1) {
      nameArray.push(newArray[i].name);
    }
    for (let i = 0; i < files.length; i += 1) {
      if (!nameArray.includes(files[i].name)) newArray.push(files[i]);
    }
    this.setState({ knownFiles: newArray },
      () => this.FilesUploadComponent.handleUpdate(this.state.knownFiles));
  }

  render() {
    const condition = this.state.show ? (<ConfirmTable
      files={this.state.knownFiles}
      handleDeleteButtonClick={this.handleDeleteButtonClick}
    />) : <br />;

    return (
      <div>
        <Button className="uploadButton" onClick={this.handleShow}>Upload Now</Button>
        <Modal className="UploadModal" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Upload Files</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {condition}
          </Modal.Body>
          <Modal.Footer>
            <Row>
              <FilesUpload
                ref={(c) => { this.FilesUploadComponent = c; }}
                files={this.state.knownFiles}
                label="Select Files"
                supportMultiple
                handleSelect={this.handleKnownFileSelect}
                handleSuccessUpload={this.handleClose}
                username={this.props.username}
                studentEmail={this.props.studentEmail}
                refreshList={this.props.refreshList}
              />
              <Col md={2}>
                <Button className="cancelButton" onClick={this.handleClose} bsStyle="primary">Cancel</Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>
        <Row><Col md={12}><br /></Col></Row>
      </div>
    );
  }
}

export default UploadModal;
