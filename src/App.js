import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import Dashboard from './components/Dashboard';
import Documentation from './components/Documentation';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'fullcalendar/dist/fullcalendar.css';
import './layout/layout.css';
import './App.css';
import CustomerList from './pages/secure/Customers/CustomerList';
import Customer from './pages/secure/Customers/Customer';
import SecurityContext from './pages/routing/SecurityContext';
import LandingPageSwitcher from './pages/routing/LandingPageSwitcher.js';
import * as AuthorizationActions from './framework/redux/modules/Authorization';

class App extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    authorization: PropTypes.shape({
      auth: PropTypes.object,
      token: PropTypes.string,
      user: PropTypes.shape({
        username: PropTypes.string,
      }),
    }).isRequired,
  };

  setAuth = auth => {
    this.props.dispatch(AuthorizationActions.initialize(auth));
  };

  render = () => {
    const { auth } = this.props.authorization;
    return (
      <SecurityContext.Provider value={{ ...auth, setAuth: this.setAuth }}>
        <I18nextProvider i18n={i18next}>
          <Switch>
            <Route exact path="/" component={LandingPageSwitcher} />
            {/* Public Routes */}
            {/* End Public Routes */}
            {/* Secure Routes */}
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/customers/:type/:id" component={Customer} />
            <Route path="/customers/:type" component={Customer} />
            <Route path="/customers" component={CustomerList} />
            <Route path="/documentation" component={Documentation} />
            {/* End Secure Routes */}
            <Route path="*" render={() => <Redirect to="/not-found" />} />
          </Switch>
        </I18nextProvider>
      </SecurityContext.Provider>
    );
  };
}

export default connect(state => ({
  authorization: state.authorization,
}))(App);
