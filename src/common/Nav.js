// Nav Bar
// Displays the "Authorship verification" on top of the page
import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Nav = props => (
  <Navbar fluid>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Authorship Verification</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Form>
        {props.isAuthenticated() &&
          <Button
            className="pull-right"
            bsStyle="link"
            href="/"
            onClick={props.handleLogout}
          >Logout
          </Button>
        }
        {props.isAuthenticated() &&
          <Button
            className="pull-right"
            bsStyle="link"
            href="#/educator"
          >Educator Page
          </Button>
        }
      </Navbar.Form>
    </Navbar.Collapse>
  </Navbar>
);

Nav.propTypes = {
  isAuthenticated: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Nav;
