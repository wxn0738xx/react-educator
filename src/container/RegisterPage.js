// Register page
// Contains the register form
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import RegisterForm from '../component/authentication/RegisterForm';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <div>
        <RegisterForm />
      </div>
    );
  }
}

export default RegisterPage;
