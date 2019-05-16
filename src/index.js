//import packages
import React from "react";
import ReactDOM from "react-dom";

//import CSS
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";

//import components
import App from "./App";
import AppNavbar from "./components/layouts/AppNavbar";

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(<App />, document.getElementById("root"));
