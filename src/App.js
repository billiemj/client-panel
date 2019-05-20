import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";

import { Provider } from "react-redux";
import store from "./store";

import { MDBContainer } from "mdbreact";
import AppNavbar from "./components/layouts/AppNavbar";
import Dashboard from "./components/layouts/Dashboard";
import AddClient from "./components/clients/AddClient";
import EditClient from "./components/clients/EditClient";
import ClientDetails from "./components/clients/ClientDetails";
import Login from "./components/auth/Login";
import Settings from "./components/settings/Settings";

import "./App.css";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <MDBContainer />
            <Switch>
              <Route
                exact
                path="/"
                component={UserIsAuthenticated(Dashboard)}
              />
              <Route
                exact
                path="/client/add"
                component={UserIsAuthenticated(AddClient)}
              />
              <Route
                exact
                path="/client/edit/:id"
                component={UserIsAuthenticated(EditClient)}
              />
              <Route
                exact
                path="/client/:id"
                component={UserIsAuthenticated(ClientDetails)}
              />
              <Route
                exact
                path="/client/:id"
                component={UserIsAuthenticated(ClientDetails)}
              />
              <Route
                exact
                path="/settings"
                component={UserIsAuthenticated(Settings)}
              />
              <Route
                exact
                path="/login"
                component={UserIsNotAuthenticated(Login)}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
