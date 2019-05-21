import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Clients from "../clients/Clients";
import Sidebar from "../layouts/Sidebar";

export default function Dashboard() {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="10">
          <Clients />
        </MDBCol>
        <MDBCol md="2">
          <Sidebar />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
