// Login Page
// Contains the login form
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import LoginForm from '../component/authentication/LoginForm';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    LoginPage.propTypes = {
      isResearcher: PropTypes.bool.isRequired,
      isEducator: PropTypes.bool.isRequired,
      handleLogin: PropTypes.func.isRequired,
    };
    autoBind(this);
  }

  componentDidMount() {
    this.route();
  }

  componentDidUpdate() {
    this.route();
  }

  route() {
    if (this.props.isEducator) {
      this.props.history.push('/newEducator'); // eslint-disable-line
    }
    if (this.props.isResearcher) {
      this.props.history.push('/researcher');
    }
  }

  render() {
    return (
      <div>
        <LoginForm
          handleLogin={this.props.handleLogin}
        />
      </div>
    );
  }
}


export default LoginPage;
