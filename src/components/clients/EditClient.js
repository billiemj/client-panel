import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBIcon
} from "mdbreact";
import Spinner from "../layouts/Spinner";

class EditClient extends Component {
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    const { client } = this.props;

    if (client) {
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
                <span className="deep-purple-text darken-4">Edit</span> Client
              </h1>
              <MDBCard className="deep-purple-text darken-4">
                <MDBCardBody className="text-left">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        minLength="2"
                        required
                        defaultValue={client.firstName}
                      />
                      <MDBInput
                        type="text"
                        label="First Name"
                        name="firstName"
                        icon="user"
                        group
                        minLength="2"
                        required
                        defaultValue={client.firstName}
                      />
                    </div>
                    <MDBInput
                      label="Last Name"
                      name="lastName"
                      icon="user"
                      group
                      type="text"
                      defaultValue={client.lastName}
                      minLength="2"
                      required
                    />
                    <MDBInput
                      label="Email"
                      icon="envelope"
                      group
                      name="email"
                      type="email"
                      defaultValue={client.email}
                      required
                    />
                    <MDBInput
                      label="Phone"
                      icon="mobile-alt"
                      group
                      type="text"
                      name="phone"
                      defaultValue={client.phone}
                      minLength="10"
                    />

                    <MDBInput
                      label="Balance"
                      icon="hand-holding-usd"
                      group
                      type="text"
                      name="balance"
                      defaultValue={client.balance}
                    />

                    <div className="text-center btn-block">
                      <MDBBtn color="deep-purple darken-4" type="submit">
                        Edit Client
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(EditClient);
