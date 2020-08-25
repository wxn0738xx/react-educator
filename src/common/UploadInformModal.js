// UploadInformModal component
// Shows the info about successfully/unscuuessfully upload files
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

class UploadInformModal extends React.Component {
  constructor(props) {
    super(props);
    UploadInformModal.propTypes = {
      show: PropTypes.bool.isRequired,
      handleClose: PropTypes.func.isRequired,
      rejectedFiles: PropTypes.arrayOf(Object).isRequired,
      confirmedFiles: PropTypes.arrayOf(Object).isRequired,
    };

    autoBind(this);
  }

  handleClose() {
    this.props.handleClose();
  }

  confirmFilesList() {
    const listItems = this.props.confirmedFiles.map((file, i) => (
      <li key={i}>{file}</li>));
    return (
      <ul>{listItems}</ul>
    );
  }

  renderFileList() {
    const listItems = this.props.rejectedFiles.map((file, i) => (
      <li key={i}>{file}</li>));
    return (
      <ul>{listItems}</ul>
    );
  }

  render() {
    return (
      <div>
        <Modal className="UploadInformModal" bsSize="small" aria-labelledby="contained-modal-title-sm" show={this.props.show} onHide={this.handleClose}>
          <Modal.Header closeButton />
          <Modal.Body>
            Successful uploads:
            {this.confirmFilesList()}
            Unsuccessful uploads(file already exist):
            {this.renderFileList()}
          </Modal.Body>
          <Modal.Footer>
            <Button className="confirmButton" onClick={this.handleClose} bsStyle="primary">OK</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default UploadInformModal;
