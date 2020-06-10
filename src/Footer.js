import React, { Component } from 'react';
import { MDBFooter, MDBContainer } from "mdbreact";

export class Footer extends Component {
  render() {
    return <MDBFooter color="purple-gradient" className="font-small pt-4 mt-4">
    <div className="footer-copyright text-center py-3">
      <MDBContainer fluid>
        &copy; {new Date().getFullYear()} Copyright: <a href="https://www.neuqt.be"> Neuqt.be </a>
      </MDBContainer>
    </div>
  </MDBFooter>
  }
}