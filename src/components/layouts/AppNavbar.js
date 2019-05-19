import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink
} from "mdbreact";

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isAuthenticated: false
    };

    this.onClick = this.onClick.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  onLogoutClick = e => {
    e.preventDefault();

    const { firebase } = this.props;
    firebase.logout();
  };
  render() {
    const { isAuthenticated } = this.state;
    const { auth } = this.props;
    return (
      <div className="pb-5">
        <header className="mb-5">
          <MDBNavbar
            color=" deep-purple darken-4"
            dark
            expand="md"
            scrolling
            fixed="top"
          >
            <MDBNavbarBrand href="/">
              <strong>Client Panel</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.onClick} />
            <MDBCollapse isOpen={this.state.collapse} navbar>
              <MDBNavbarNav left>
                {isAuthenticated ? (
                  <MDBNavItem active>
                    <MDBNavLink to="/">Dashboard</MDBNavLink>
                  </MDBNavItem>
                ) : null}
              </MDBNavbarNav>
              {isAuthenticated ? (
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBNavLink to="#!">{auth.email}</MDBNavLink>
                  </MDBNavItem>

                  <MDBNavItem>
                    <MDBNavLink to="#!" onClick={this.onLogoutClick}>
                      Logout
                    </MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
              ) : null}
            </MDBCollapse>
          </MDBNavbar>
        </header>
      </div>
    );
  }
}

AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }))
)(AppNavbar);
