import React from "react";
import { MDBBtn, MDBIcon } from "mdbreact";

export default function Sidebar() {
  return (
    <div>
      <MDBBtn
        href="/client/add"
        type="button"
        className="btn btn-outline-deep-purple waves-effect"
      >
        <MDBIcon icon="user-plus" className="pr-2" />
        New
      </MDBBtn>
    </div>
  );
}
