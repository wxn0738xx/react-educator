// LoginForm component
// For submitting the login info
import React from 'react';
import { Button, Panel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import FormValidation from '../../common/FormValidation';
import HelpContent from '../../common/HelpContent';
import InputCustom from '../../common/InputCustom';
import AlertCustom from '../../common/AlertCustom';
import { post } from '../../common/Request';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      canSubmit: false,
      showAlert: false,
    };
    LoginForm.propTypes = {
      handleLogin: PropTypes.func.isRequired,
    };
    autoBind(this);
  }

  // Validate the input info
  getSubmitValidationState() {
    if (FormValidation.getEmailValidationState(this.state.email) === 'success') {
      this.setState({
        canSubmit: true,
      });
    }
  }

  // Send the login detail to backend
  handleLogin() {
    const req = {
      username: this.state.email,
      password: this.state.password,
    };
    post('auth/login', req).then((resp) => {
      if (Object.prototype.hasOwnProperty.call(resp, 'error')) {
        this.setState({ showAlert: true });
      } else {
        this.props.handleLogin(this.state.email, resp.role);
      }
    });
  }

  // Hide warning
  handleHideAlert() {
    this.setState({ showAlert: false });
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    }, () => this.getSubmitValidationState());
  }

  render() {
    return (
      <div>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title componentClass="h4">Login</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <AlertCustom
              alertStyle="danger"
              show={this.state.showAlert}
              handleDismiss={this.handleHideAlert}
              heading="Login unsuccessful."
              content="Your username or password is incorrect.
                Please try again."
            />
            <form>
              <InputCustom
                label="E-Mail"
                name="email"
                placeholder="Enter mail"
                validation={FormValidation.getEmailValidationState(this.state.email)}
                handleInput={this.handleInputChange}
                content={HelpContent.LOGIN_EMAIL}
                fieldLength={3}
              />
              <InputCustom
                label="Password"
                name="password"
                placeholder="Enter Password"
                validation={null}
                handleInput={this.handleInputChange}
                content={HelpContent.LOGIN_PASS}
                type="password"
                fieldLength={3}
              />
              <Button disabled={!this.state.canSubmit} onClick={this.handleLogin} bsStyle="primary">
                Login
              </Button>
              <br /><br />
              <br /><br />
              <LinkContainer to="/register">
                <Button
                  bsStyle="link"
                >
                Register as a new user
                </Button>
              </LinkContainer>
            </form>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default LoginForm;
