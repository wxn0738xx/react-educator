// AddAuthorModal component
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { post } from '../../common/Request';
import AlertCustom from '../../common/AlertCustom';
import InputCustom from '../../common/InputCustom';
import FormValidation from '../../common/FormValidation';
import HelpContent from '../../common/HelpContent';

// Modal dialog for adding a new author for an user

export default class AddAuthorModal extends React.Component {
  constructor(props) {
    super(props);

    AddAuthorModal.defaultProps = {
      show: false,
      onHide: null,
    };

    AddAuthorModal.propTypes = {
      username: PropTypes.string.isRequired,
      show: PropTypes.bool,
      onHide: PropTypes.func,
      handleAddAuthor: PropTypes.func.isRequired,
    };

    this.state = {
      identifier: '',
      canAddAuthor: false,
      showAlert: false,
    };

    autoBind(this);
  }

  // Determines whether the confirmButton should be disabled
  getAddAuthorValidationState() {
    if (FormValidation.getIdentifierValidationState(this.state.identifier)) {
      this.setState({
        canAddAuthor: true,
      });
    } else {
      this.setState({
        canAddAuthor: false,
      });
    }
  }

  // Call the create student api in back end and create author in database
  // Auto select created author on successful creation
  handleAddAuthor() {
    const req = {
      username: this.props.username,
      studentEmail: this.state.identifier,
    };
    post('student/create', req).then((resp) => {
      if (resp.message === 'success') {
        this.props.handleAddAuthor(this.state.identifier);
        this.handleClose();
      } else {
        this.handleShowAlert();
      }
    });
  }

  // Handle closure of component
  handleClose() {
    this.setState({ identifier: '' });
    this.setState({ canAddAuthor: false });
    this.setState({ showAlert: false });
    this.props.onHide();
  }

  // Save user input on changes
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    }, () => this.getAddAuthorValidationState());
  }

  // Show and hide alert
  handleShowAlert() {
    this.setState({ showAlert: true });
  }

  handleHideAlert() {
    this.setState({ showAlert: false });
  }

  render() {
    return (
      <div>
        <Modal className="addAuthorModal" show={this.props.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Author</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AlertCustom
              alertStyle="danger"
              show={this.state.showAlert}
              handleDismiss={this.handleHideAlert}
              heading="Author cannot be added."
              content="The identifier you have entered already exist.
              Please try again."
            />
            <InputCustom
              label="Identifier"
              name="identifier"
              placeholder="Enter an identifier for the author"
              validation={FormValidation.getIdentifierValidationState(this.state.identifier)}
              handleInput={this.handleInputChange}
              content={HelpContent.AUTHORID}
              fieldLength={6}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button className="confirmButton" disabled={!this.state.canAddAuthor} bsStyle="primary" onClick={this.handleAddAuthor}>
              Confirm
            </Button>
            <Button className="cancelButton" onClick={this.handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
