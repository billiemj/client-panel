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
  MDBCardHeader
} from "mdbreact";
import { Link } from "react-router-dom";
import classnames from "classnames";

class ClientDetails extends Component {
  render() {
    const { client } = this.props;

    if (client) {
      return (
        <div>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="6">
                <Link to="/" className="btn btn-link">
                  <MDBIcon far icon="arrow-alt-circle-left" /> Back to Dashboard
                </Link>
              </MDBCol>
              <MDBCol md="6">
                <div
                  class="btn-group float-right"
                  role="group"
                  aria-label="Basic example"
                >
                  <MDBBtn
                    href={"/client/edit/${client.id}"}
                    type="button"
                    className="btn btn-outline-deep-purple waves-effect"
                  >
                    <i className="fas fa-user-edit pr-2" aria-hidden="true" />{" "}
                    Edit
                  </MDBBtn>
                  <MDBBtn
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
                  <MDBCol md-8 sm-6>
                    <h4>
                      Client ID{" "}
                      <span className="text-secondary">{client.id}</span>
                    </h4>
                  </MDBCol>

                  <MDBCol md-4 sm-6>
                    <h3 className="pull-right">
                      Balance:{" "}
                      <span
                        className={classnames({
                          "text-danger": client.balance > 0,
                          "text-success": client.balance == 0
                        })}
                      >
                        ${parseFloat(client.balance).toFixed(2)}
                      </span>
                    </h3>
                    {/*@tod -balancefore */}
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
