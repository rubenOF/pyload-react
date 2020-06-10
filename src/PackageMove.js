import React from 'react';
import { Component } from 'react';
import { MDBBtn } from 'mdbreact';
import cogoToast from 'cogo-toast';

import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class PackageMove extends Component {
  toggle = () => {
    let url = "/api/pushToQueue/" + this.props.pid;
    if (this.props.dest === 1) {
      url = "/api/pullFromQueue/" + this.props.pid;
    }
    fetch(url)
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
        <FontAwesomeIcon icon={faExchangeAlt} size="lg" />
      </MDBBtn>
    </>;
  }
}