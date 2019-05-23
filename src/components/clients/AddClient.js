import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBIcon
} from "mdbreact";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import NumberFormat from "react-number-format";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    balance: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const newClient = this.state;
    const { firestore, history } = this.props;
    //If no balance, make 0
    if (newClient.balance === "") {
      newClient.balance = 0;
    }
    firestore
      .add({ collection: "clients" }, newClient)
      .then(() => history.push("/"));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { disableBalanceOnAdd } = this.props.settings;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <Link to="/" className="btn btn-link">
              <MDBIcon far icon="arrow-alt-circle-left" /> Back to Dashboard
            </Link>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="12">
            <h1 className="display-4 mb-4">
              <span className="deep-purple-text darken-4">Add</span> Client
            </h1>
            <MDBCard className="deep-purple-text darken-4">
              <MDBCardBody className="text-left">
                <form onSubmit={this.onSubmit}>
                  <MDBInput
                    label="First Name"
                    name="firstName"
                    icon="user"
                    group
                    type="text"
                    value={this.state.firstName}
                    onChange={this.onChange}
                    minLength="2"
                    required
                  />
                  <MDBInput
                    label="Last Name"
                    name="lastName"
                    icon="user"
                    group
                    type="text"
                    value={this.state.lastName}
                    onChange={this.onChange}
                    minLength="2"
                    required
                  />
                  <MDBInput
                    label="Email"
                    icon="envelope"
                    group
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    required
                  />
                  {/*  <MDBInput
                    label="Phone"
                    icon="mobile-alt"
                    group
                    type="text"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChange}
                  /> */}
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <NumberFormat
                      type="text"
                      className="form-control"
                      name="phone"
                      format="(###) ###-####"
                      mask="_"
                      value={this.state.phone}
                      onChange={this.onChange}
                      required
                    />
                  </div>

                  <MDBInput
                    label="Balance"
                    icon="hand-holding-usd"
                    group
                    type="number"
                    name="balance"
                    value={this.state.balance}
                    onChange={this.onChange}
                    disabled={disableBalanceOnAdd}
                  />

                  <input
                    type="submit"
                    value="Add Client"
                    className="btn btn-deep-purple btn-block"
                  />
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};
export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddClient);
