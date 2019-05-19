import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layouts/Spinner";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBCardHeader,
  MDBInput
} from "mdbreact";
import { Link } from "react-router-dom";
import classnames from "classnames";

class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ""
  };

  //Update balance
  balanceSubmit = e => {
    e.preventDefault();
    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    };

    // Update in Firestore
    firestore.update({ collection: "clients", doc: client.id }, clientUpdate);
  };

  // Delete Client
  onDeleteClick = () => {
    const { client, firestore, history } = this.props;

    firestore
      .delete({ collection: "clients", doc: client.id })
      .then(history.push("/"));
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    let balanceForm = "";
    //If balance form shoould display
    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className="input-group mb-3">
            <input
              type="number"
              name="balanceUpdateAmount"
              placeholder="Add New Balance"
              value={balanceUpdateAmount}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input
                className="btn btn-outline-deep-purple waves-effect m-0 px-3 py-2 z-depth-0 waves-effect"
                type="submit"
                value="Update"
              />
            </div>
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }

    if (client) {
      return (
        <div>
          <MDBContainer className="text-left">
            <MDBRow>
              <MDBCol md="6">
                <Link to="/" className="btn btn-link">
                  <MDBIcon far icon="arrow-alt-circle-left" /> Back to Dashboard
                </Link>
              </MDBCol>
              <MDBCol md="6">
                <div
                  className="btn-group float-right"
                  role="group"
                  aria-label="Basic example"
                >
                  <MDBBtn
                    href={`/client/edit/${client.id}`}
                    type="button"
                    className="btn btn-outline-deep-purple waves-effect"
                  >
                    <i className="fas fa-user-edit pr-2" aria-hidden="true" />{" "}
                    Edit
                  </MDBBtn>
                  <MDBBtn
                    onClick={this.onDeleteClick}
                    type="button"
                    className="btn btn-outline-deep-purple waves-effect"
                  >
                    <i className="fas fa-user-times pr-2" aria-hidden="true" />
                    Delete
                  </MDBBtn>
                </div>
              </MDBCol>
            </MDBRow>
            <hr />
            <MDBCard>
              <MDBCardHeader>
                <h3>
                  {client.firstName} {client.lastName}
                </h3>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol md="8" sm="6">
                    <h4>
                      Client ID:{" "}
                      <span className="text-secondary">{client.id}</span>
                    </h4>
                  </MDBCol>

                  <MDBCol md="4" sm-sm="6">
                    <h3>
                      Balance:{" "}
                      <span
                        className={classnames({
                          "text-danger": client.balance > 0,
                          "text-success": client.balance == 0
                        })}
                      >
                        ${parseFloat(client.balance).toFixed(2)}
                      </span>
                      <small>
                        <a
                          href="#!"
                          onClick={() =>
                            this.setState({
                              showBalanceUpdate: !this.state.showBalanceUpdate
                            })
                          }
                        >
                          {" "}
                          <MDBIcon
                            icon="pencil-alt"
                            className="text-secondary"
                          />
                        </a>
                      </small>
                    </h3>

                    {balanceForm}
                  </MDBCol>
                </MDBRow>
                <hr />
                <ul className="list-group text-left">
                  <li className="list-group-item">
                    Contact Email: {client.email}
                  </li>
                  <li className="list-group-item">
                    Contact Phone:{client.phone}
                  </li>
                </ul>
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}
ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);
