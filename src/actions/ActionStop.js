import React from 'react';
import { MDBBtn } from 'mdbreact';
import { Component } from 'react';
import cogoToast from 'cogo-toast';

import { faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class ActionStop extends Component {
  toggle = () => {
    fetch("/api/stopAllDownloads")
      .then(() => {
        cogoToast.success("Success!", { heading: this.props.title });

        this.props.status.refresh();
      }, (error) => {
        cogoToast.error("Error!", { heading: this.props.title });
      });
  };
  render() {
    return <>
      <MDBBtn className="peach-gradient" onClick={this.toggle} {...this.props}>
        <FontAwesomeIcon icon={faStop} size="lg" />
      </MDBBtn>
    </>;
  }
}
