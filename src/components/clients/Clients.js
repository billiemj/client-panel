import React, { Component } from "react";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn
} from "mdbreact";

class Clients extends Component {
  render() {
    const clients = [
      {
        id: "1234",
        firstName: "Billie",
        lastName: "Muzzy",
        email: "billiemj@gmail.com",
        phone: "763-218-7767",
        balance: "10.00"
      },
      {
        id: "1235",
        firstName: "Ben",
        lastName: "Muzzy",
        email: "muzz826@gmail.com",
        phone: "763-218-1595",
        balance: "1.00"
      }
    ];

    if (clients) {
      return (
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <h2 className="text-left">
                <MDBIcon icon="user-friends" />
                {""} Clients
              </h2>
            </MDBCol>
            <MDBCol md="6" />
          </MDBRow>
          <MDBTable striped>
            <MDBTableHead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>${parseFloat(client.balance).toFixed(2)}</td>
                  <td>
                    <MDBBtn
                      href={`/client/${client.id}`}
                      color="secondary"
                      size="sm"
                    >
                      <MDBIcon far icon="arrow-alt-circle-right" />
                      Details
                    </MDBBtn>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </MDBContainer>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

export default Clients;
