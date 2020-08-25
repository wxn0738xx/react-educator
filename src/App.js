
import React from 'react';
import autoBind from 'react-autobind';
import { Switch, Route } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import Nav from './common/Nav';
import PrivateRoute from './container/PrivateRoute';
import EducatorPage from './container/EducatorPage';
import SimplifiedEducatorPage from './container/SimplifiedEducatorPage';
import LoginPage from './container/LoginPage';
import RegisterPage from './container/RegisterPage';
import ResearcherPage from './container/ResearcherPage';

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    const { cookies } = props;

    this.state = {
      username: cookies.get('user'),
      isEducator: cookies.get('role') === '0',
      isResearcher: cookies.get('role') === '1',
    };

    autoBind(this);
  }

  handleLogin(user, userRole) {
    const { cookies } = this.props;
    cookies.set('user', user);
    cookies.set('role', userRole);

    this.setState({ username: user }, () => {
      if (userRole === 0) {
        this.setState({ isEducator: true });
      }
      if (userRole === 1) {
        this.setState({ isResearcher: true });
      }
    });
  }

  handleLogout() {
    const { cookies } = this.props;
    cookies.set('user', null);
    cookies.set('role', null);
  }

  isAuthenticated() {
    const { cookies } = this.props;
    return cookies.get('user') !== 'null';
  }

  render() {
    return (
      <div className="App">
        <Nav
          isAuthenticated={this.isAuthenticated}
          handleLogout={this.handleLogout}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={props =>
              (<LoginPage
                {...props}
                isEducator={this.state.isEducator}
                isResearcher={this.state.isResearcher}
                handleLogin={this.handleLogin}
              />)}
          />
          <Route path="/register" component={RegisterPage} />
          <PrivateRoute
            path="/educator"
            component={EducatorPage}
            authenticated={this.state.isEducator}
            username={this.state.username}
          />
          <PrivateRoute
            path="/newEducator"
            component={SimplifiedEducatorPage}
            authenticated={this.state.isEducator}
            username={this.state.username}
          />
          <PrivateRoute
            path="/researcher"
            component={ResearcherPage}
            authenticated={this.state.isResearcher}
            username={this.state.username}
          />
          <Route
            path="/login"
            render={props =>
              (<LoginPage
                {...props}
                isEducator={this.state.isEducator}
                isResearcher={this.state.isResearcher}
                handleLogin={this.handleLogin}
              />)}
          />
        </Switch>
      </div>
    );
  }
}

export default withCookies(App);
