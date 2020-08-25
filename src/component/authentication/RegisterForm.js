// RegisterForm component
// Displays the register page, and handle the register request
import React from 'react';
import { Button, Panel, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import autoBind from 'react-autobind';
import FormValidation from '../../common/FormValidation';
import HelpContent from '../../common/HelpContent';
import InputCustom from '../../common/InputCustom';
import AlertCustom from '../../common/AlertCustom';
import { post } from '../../common/Request';
import RadioCustom from '../../common/RadioCustom';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      role: 0,
      canSubmit: false,
      showAlert: false,
      isRegistered: false,
    };

    autoBind(this);
  }

  getSubmitValidationState() {
    if (FormValidation.getEmailValidationState(this.state.email) === 'success' &&
       FormValidation.getPasswordConfirmationState(this.state.password,
         this.state.confirmPassword) === 'success' &&
        this.state.role !== '' &&
        FormValidation.getPasswordValidationState(this.state.password)) {
      this.setState({
        canSubmit: true,
      });
    }
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    }, () => this.getSubmitValidationState());
  }

  handleSelectChange(e) {
    this.setState({
      role: e,
    });
  }

  handleRegister() {
    const req = {
      username: this.state.email,
      password: this.state.password,
      role: this.state.role,
    };
    console.log(req);
    post('auth/signup', req).then((resp) => {
      console.log(resp);
      if (resp.message === 'success') {
        // Need popup to show success register
        this.setState({ isRegistered: true });
      } else {
        this.setState({ showAlert: true });
      }
    });
  }

  handleHideAlert() {
    this.setState({ showAlert: false });
  }

  render() {
    if (this.state.isRegistered === true) {
      return (
        <Redirect to="/login" />
      );
    }

    return (
      <div>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title componentClass="h4">Register as new user</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <AlertCustom
              show={this.state.showAlert}
              handleDismiss={this.handleHideAlert}
              heading="Registration unsuccessful."
              content="The username already exists. Please try again."
              alertStyle="danger"
            />
            <form>
              <InputCustom
                label="E-Mail"
                name="email"
                placeholder="Enter mail"
                validation={FormValidation.getEmailValidationState(this.state.email)}
                handleInput={this.handleInputChange}
                content={HelpContent.LOGIN_EMAIL}
              />
              <RadioCustom
                label="Role"
                name="role"
                placeholder="Role"
                validation={FormValidation.getRoleConfirmationState(this.state.role)}
                handleChange={this.handleSelectChange}
                content="Pick One Role"
                keyValues={new Map([['0', 'Educator'], ['1', 'Researcher']])}
              />
              <InputCustom
                label="Password"
                name="password"
                placeholder="Enter Password"
                handleInput={this.handleInputChange}
                validation={FormValidation.getPasswordValidationState(this.state.password)}
                content={HelpContent.LOGIN_PASS}
                type="password"
                fieldLength={3}
              />
              <InputCustom
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Re-enter Password"
                handleInput={this.handleInputChange}
                validation={FormValidation.getPasswordConfirmationState(this.state.password,
                  this.state.confirmPassword)}
                content={HelpContent.REG_PASS}
                type="password"
                fieldLength={3}
              />
              <Col md={1}>
                <Button disabled={!this.state.canSubmit} onClick={this.handleRegister} bsStyle="primary">Register</Button>
              </Col>
              <LinkContainer to="/login">
                <Button>Cancel</Button>
              </LinkContainer>
            </form>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default RegisterForm;
