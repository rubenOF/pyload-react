import React from 'react';
import { MDBBtn } from 'mdbreact';
import { Component } from 'react';
import cogoToast from 'cogo-toast';

import { faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class ActionCancel extends Component {
  toggle = () => {
    fetch("/api/pauseServer")
      .then((result) => {
        cogoToast.success("Success!", { heading: this.props.title });

        this.props.status.refresh();
      }, (error) => {
        cogoToast.error("Error!", { heading: this.props.title });
      });
  };
  render() {
    return <>
      <MDBBtn className="peach-gradient" onClick={this.toggle} {...this.props}>
        <FontAwesomeIcon icon={faPause} size="lg" />
      </MDBBtn>
    </>;
  }
}
