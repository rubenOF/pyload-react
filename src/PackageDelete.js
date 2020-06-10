import React from 'react';
import { Component } from 'react';
import { MDBBtn } from 'mdbreact';
import cogoToast from 'cogo-toast';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class PackageDelete extends Component {
  toggle = () => {
    fetch("/api/deletePackages/[" + this.props.pid + "]")
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
        <FontAwesomeIcon icon={faTrash} size="lg" />
      </MDBBtn>
    </>;
  }
}
