import React from 'react';
import { Component } from 'react';
import { MDBBtn } from 'mdbreact';
import cogoToast from 'cogo-toast';

import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class PackageRestart extends Component {
  toggle = () => {
    fetch("/api/restartPackage/" + this.props.pid)
      .then((result) => {
        cogoToast.success("Success!", { heading: this.props.title });

        this.props.reload();
      }, (error) => {
        cogoToast.error("Error!", { heading: this.props.title });
      });
  };
  render() {
    return <>
      <MDBBtn className="aqua-gradient" onClick={this.toggle} title={ this.props.title }>
        <FontAwesomeIcon icon={faSync} size="lg" />
      </MDBBtn>
    </>;
  }
}
