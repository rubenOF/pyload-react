import React from 'react';
import { MDBBtn } from 'mdbreact';
import { Component } from 'react';
import cogoToast from 'cogo-toast';

import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class ActionRestart extends Component {
  toggle = () => {
    fetch("/api/restartFailed")
      .then((result) => {
        cogoToast.success("Success!", { heading: this.props.title });

        this.props.status.refresh();
      }, (error) => {
        cogoToast.error("Error!", { heading: this.props.title });
      });
  };
  render() {
    return <>
      <MDBBtn className="btn-default" onClick={this.toggle} {...this.props}>
        <FontAwesomeIcon icon={faSync} size="lg" />
      </MDBBtn>
    </>;
  }
}
