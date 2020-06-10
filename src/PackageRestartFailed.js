import React from 'react';
import { Component } from 'react';
import { MDBBtn } from 'mdbreact';
import cogoToast from 'cogo-toast';

import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export class PackageRestartFailed extends Component {
  toggle = () => {
    cogoToast.error("Error!", { heading: this.props.title });
    let url = "/api/pushToQueue/" + this.props.pid;
    if (this.props.dest === 1) {
      url = "/api/pullFromQueue/" + this.props.pid;
    }
    fetch(url)
      .then((result) => {
        // print OK
        this.props.reload();
      }, (error) => {
        // print NOT OK
      });
  };
  render() {
    return <>
      <MDBBtn className="aqua-gradient" onClick={this.toggle} title={ this.props.title }>
        <FontAwesomeIcon icon={faSort} size="lg" />
      </MDBBtn>
    </>;
  }
}
