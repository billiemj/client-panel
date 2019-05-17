import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MDBContainer } from "mdbreact";
import AppNavbar from "./components/layouts/AppNavbar";
import Dashboard from "./components/layouts/Dashboard";

import "./App.css";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppNavbar />
          <MDBContainer />
          <Switch>
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
