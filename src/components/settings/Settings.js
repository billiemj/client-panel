import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit
} from "../../actions/settingsAction";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBSwitch
} from "mdbreact";
import { Link } from "react-router-dom";

class Settings extends Component {
  state = {
    switch1: true
  };
  handleSwitchChange = nr => () => {
    let switchNumber = `switch${nr}`;
    this.setState({
      [switchNumber]: !this.state[switchNumber]
    });
  };

  disableBalanceOnAddChange = () => {
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };

  disableBalanceOnEditChange = () => {
    const { setDisableBalanceOnEdit } = this.props;
    setDisableBalanceOnEdit();
  };

  allowRegistrationChange = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };

  render() {
    const {
      disableBalanceOnAdd,
      disableBalanceOnEdit,
      allowRegistration
    } = this.props.settings;
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
              <span className="deep-purple-text darken-4">Edit </span>Settings
            </h1>
            <MDBCard className="deep-purple-text darken-4">
              <MDBCardBody className="text-left">
                <form onSubmit={this.onSubmit}>
                  <MDBRow className="mb-5">
                    <MDBCol md="4">
                      <label>Allow Registraton</label>
                      <MDBSwitch
                        name="allowRegistration"
                        checked={!!allowRegistration}
                        onChange={this.allowRegistrationChange}
                      />
                    </MDBCol>
                    <MDBCol md="4">
                      <label>Disable Balance On Add</label>
                      <MDBSwitch
                        name="disableBalanceOnAdd"
                        checked={!!disableBalanceOnAdd}
                        onChange={this.disableBalanceOnAddChange}
                      />
                    </MDBCol>
                    <MDBCol md="4">
                      <label>Disable Balance On Edit</label>
                      <MDBSwitch
                        name="disableBalanceOnEdit"
                        checked={!!disableBalanceOnEdit}
                        onChange={this.disableBalanceOnEditChange}
                      />
                    </MDBCol>
                  </MDBRow>

                  <input
                    type="submit"
                    value="Update Settings"
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

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired
};

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings);
