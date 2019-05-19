import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { firestoreConnect, firestoreReducer } from "react-redux-firebase";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon
} from "mdbreact";
import Spinner from "../layouts/Spinner";

class EditClient extends Component {
  constructor(props) {
    super(props);
    //Create refs
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();
    const { client, firestore, history } = this.props;

    //Updated Client
    const updClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance:
        this.balanceInput.current.value === ""
          ? 0
          : this.balanceInput.current.value
    };

    //Update client in firestore
    firestore
      .update({ collection: "clients", doc: client.id }, updClient)
      .then(history.push("/"));
  };
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
                        ref={this.firstNameInput}
                        defaultValue={client.firstName}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        minLength="2"
                        required
                        ref={this.lastNameInput}
                        defaultValue={client.lastName}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        ref={this.emailInput}
                        defaultValue={client.email}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        minLength="10"
                        required
                        ref={this.phoneInput}
                        defaultValue={client.phone}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="balance">Balance</label>
                      <input
                        type="number"
                        className="form-control"
                        name="balance"
                        ref={this.balanceInput}
                        defaultValue={client.balance}
                      />
                    </div>
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-deep-purple btn-block"
                    />
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
