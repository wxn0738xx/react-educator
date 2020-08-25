// UploadModal component
// Select and upload known files to the backend. Uses the FilesUpload component
import React from 'react';
import { Row, Col, Button, Modal, FormControl } from 'react-bootstrap';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { post } from '../common/Request';
import AlertCustom from '../common/AlertCustom';

class UploadModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      newDataset: '',
      showAlert: false,
    };

    UploadModal.propTypes = {
      refreshList: PropTypes.func.isRequired,
    };
    autoBind(this);
  }

  // Finish the upload and refresh the file list
  handleClose() {
    this.setState({ show: false, newDataset: null });
    this.props.refreshList();
  }

  // Show the file table of selected files for upload
  handleShow() {
    this.setState({ show: true });
  }

  handleFileSelect(e) {
    this.setState({
      [e.target.name]: e.target.files[0],
    });
  }

  uploadFile(f) {
    const formdata = new FormData();
    formdata.append('file', f);
    const body = {
      isFile: true,
      data: formdata,
    };
    post('researcher/upload', body).then((res) => {
      if (res.message === 'success') {
        this.handleClose();
      } else {
        this.setState({ showAlert: true });
      }
    });
  }

  handleUpload() {
    // Upload each file as a separate request
    if (this.state.newDataset != null) {
      this.uploadFile(this.state.newDataset);
    } else {
      this.setState({ showAlert: true });
    }
  }
  handleHideAlert() {
    this.setState({ showAlert: false });
  }
  render() {
    return (
      <div>
        <Button onClick={this.handleShow}>Upload New</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Upload Files</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AlertCustom
              alertStyle="danger"
              show={this.state.showAlert}
              handleDismiss={this.handleHideAlert}
              heading="Upload unsuccessful."
              content="Upload Failed. Try again. Check your file structure."
            />
            <FormControl
              type="file"
              name="newDataset"
              // value={this.state.newDataset}
              placeholder="select file"
              autoComplete="off"
              onChange={this.handleFileSelect}
            />
          </Modal.Body>
          <Modal.Footer>
            <Row>
              <Col md={2}>
                <Button name="uploadButton" onClick={this.handleUpload} bsStyle="primary">Upload</Button>
              </Col>
              <Col md={2}>
                <Button name="cancelButton" onClick={this.handleClose} bsStyle="primary">Cancel</Button>
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
