import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppNavbar from "./components/layouts/AppNavbar";

import "./App.css";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppNavbar />
          <h1>Hello</h1>
        </div>
      </Router>
    );
  }
}

export default App;
