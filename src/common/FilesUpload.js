// FilesUpload component
// For uploading multiple files as known files to back end
import React from 'react';
import { Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { post } from './Request';
import FileSelector from './FileSelector';
import UploadInformModal from './UploadInformModal';

class FilesUpload extends React.Component {
  constructor(props) {
    super(props);

    // Props including username, author, and functions for handling upload
    FilesUpload.propTypes = {
      label: PropTypes.string.isRequired,
      handleSelect: PropTypes.func.isRequired,
      handleSuccessUpload: PropTypes.func.isRequired,
      files: PropTypes.arrayOf(Object).isRequired,
      username: PropTypes.string.isRequired,
      studentEmail: PropTypes.string.isRequired,
    };

    this.state = {
      files: props.files,
      showInform: false,
      rejectedFiles: [],
      confirmedFiles: [],
    };

    autoBind(this);
  }

  // Upload one file as formdata to back end
  uploadFile(f, callback) {
    const formdata = new FormData();
    formdata.append('file', f);
    formdata.append('lastModified', f.lastModified);
    formdata.append('username', this.props.username);
    formdata.append('studentEmail', this.props.studentEmail);
    const body = {
      isFile: true,
      data: formdata,
    };

    // Showing the successful/ unsuccessful uploaded file list
    post('educator/upload', body).then((res) => {
      if (!res.testUpload) {
        const newarray = this.state.rejectedFiles;
        newarray.push(`${f.name}\n`);
        this.setState({ rejectedFiles: newarray });
        // console.log(`reject list${  newarray}`);
        this.setState({ showInform: true });
      } else {
        const confirmarray = this.state.confirmedFiles;
        confirmarray.push(`${f.name}\n`);
        this.setState({ confirmedFiles: confirmarray });
        // console.log(`confrim list${  confirmarray}`);
        this.setState({ showInform: true });
      }
      callback();
    });
  }

  // Set the current selected file
  handleUpdate(f) {
    this.setState({ files: f },
      () => console.log(this.state.files)); // eslint-disable-line no-console
  }

  // Update the selected file to parent component
  handleSelect(f) {
    const newFiles = this.state.files;
    const nameArray = [];
    for (let i = 0; i < newFiles.length; i += 1) {
      nameArray.push(newFiles[i].name);
    }
    for (let i = 0; i < f.length; i += 1) {
      if (!nameArray.includes(f[i].name)) newFiles.push(f[i]);
    }
    this.setState({ files: newFiles });
    this.props.handleSelect(f);
  }

  handleUpload() {
    // Upload each file as a separate request
    if (this.state.files != null) {
      Array.from(this.state.files).forEach((f) => {
        this.uploadFile(f, () => {
          // If no file rejected then close the window
          if (this.state.showInform === false) this.props.handleSuccessUpload();
        });
      });
    } else {
      console.log('No files selected'); // eslint-disable-line no-console
    }

    // set state.files back into empty
    this.setState({ files: [] });
  }

  // Close the UploadInformModal and Upload Modal
  closeInformModal() {
    this.setState({ showInform: false });
    this.setState({ rejectedFiles: [] });
    this.setState({ confirmedFiles: [] });
    this.props.handleSuccessUpload();
  }

  render() {
    return (
      <div>
        <FileSelector
          label={this.props.label}
          handleSelect={this.handleSelect}
          supportMultiple
        />
        <Col md={2}>
          <Button onClick={this.handleUpload} bsStyle="primary">Confirm</Button>
        </Col>
        <UploadInformModal
          show={this.state.showInform}
          handleClose={this.closeInformModal}
          rejectedFiles={this.state.rejectedFiles}
          confirmedFiles={this.state.confirmedFiles}
        />
      </div>
    );
  }
}

export default FilesUpload;
