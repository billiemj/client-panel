import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { notifyUser } from "../../actions/notifyActions";
import Alert from "../layouts/Alert";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon,
  MDBModalFooter
} from "mdbreact";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;
    firebase
      .login({
        email,
        password
      })
      .catch(err => notifyUser("Invalid Login Credentials", "error"));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { message, messageType } = this.props.notify;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6" className="mx-auto mt-5 text-left">
            <MDBCard>
              <MDBCardBody>
                <MDBCardHeader className="form-header deep-purple darken-4 rounded">
                  <h3 className="my-3">
                    <MDBIcon icon="lock" /> Login
                  </h3>
                </MDBCardHeader>
                <form onSubmit={this.onSubmit}>
                  <div className="grey-text">
                    <MDBInput
                      label="Type your email"
                      icon="envelope"
                      group
                      type="email"
                      name="email"
                      validate
                      error="wrong"
                      success="right"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    <MDBInput
                      label="Type your password"
                      icon="lock"
                      value={this.state.password}
                      onChange={this.onChange}
                      group
                      type="password"
                      name="password"
                      validate
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>

                  <input
                    type="submit"
                    value="Login"
                    className="btn btn-deep-purple btn-block"
                  />
                </form>
                {message ? (
                  <Alert message={message} messageType={messageType} />
                ) : null}
                <MDBModalFooter>
                  {/* <div className="font-weight-light">
                    <p>Not a member? Sign Up</p>
                    <p>Forgot Password?</p>
                  </div> */}
                </MDBModalFooter>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
)(Login);
