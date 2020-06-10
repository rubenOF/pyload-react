import React from 'react';
import { MDBBtn } from 'mdbreact';
import { Component } from 'react';
import cogoToast from 'cogo-toast';

import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class ActionPlay extends Component {
  toggle = () => {
    fetch("/api/unpauseServer")
      .then((result) => {
        cogoToast.success("Success!", { heading: this.props.title });

        this.props.status.refresh();
      }, (error) => {
        cogoToast.error("Error!", { heading: this.props.title });
      });
  };
  render() {
    return <>
      <MDBBtn className="peach-gradient" onClick={ this.toggle } title={ this.props.title }>
        <FontAwesomeIcon icon={faPlay} size="lg" />
      </MDBBtn>
    </>;
  }
}
