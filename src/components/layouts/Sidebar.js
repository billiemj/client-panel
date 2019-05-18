import React from "react";
import { MDBBtn, MDBIcon } from "mdbreact";

export default function Sidebar() {
  return (
    <div>
      <MDBBtn href="/client/add" color="success">
        <MDBIcon icon="user-plus" /> New
      </MDBBtn>
    </div>
  );
}
