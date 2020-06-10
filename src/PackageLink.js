import React from 'react';
import { Component } from 'react';
import Helper from './Helper';
import { MDBBtn } from 'mdbreact';
import cogoToast from 'cogo-toast';

import { faTrash, faSync, faCheckCircle, faClock, faBan, faExclamationCircle, faArrowCircleRight, faCog, faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class PackageLink extends Component {
  getStatusIcon(status) {
    switch (status) {
      case 0:
        return faCheckCircle;
      case 2:
      case 3:
      case 5:
        return faClock;
      case 1:
      case 9:
        return faBan;
      case 8:
        return faExclamationCircle;
      case 4:
        return faArrowCircleRight;
      case 11:
      case 13:
        return faCog;
      default:
        return faCloudDownloadAlt;
    }
  }

  restartFile(fid) {
    let url = "/api/restartFile/" + fid;

    fetch(url)
      .then((result) => {
        cogoToast.success("Success!", { heading: "Restart link" });

        this.props.reload();
      }, (error) => {
        cogoToast.error("Error!", { heading: "Restart link" });
      });
  }

  deleteFile(fid) {
    let url = "/api/deleteFiles/[" + fid + "]";

    fetch(url)
      .then((result) => {
        cogoToast.success("Success!", { heading: "Delete link" });

        this.props.reload();
      }, (error) => {
        cogoToast.error("Error!", { heading: "Delete link" });
      });
  }

  render() {
    const value = this.props;

    return <li>
      <div className="pl-4">
        <span>
          <FontAwesomeIcon className="text-primary" icon={this.getStatusIcon(value.status)} />
        </span>
        <span className="font-weight-bold"><a href={value.url}>{value.name}</a></span>

        <div className="col-12 pb-1">
          <div>
            <small>{value.statusmsg}&nbsp;&nbsp;</small>
            <small>{value.error}&nbsp;&nbsp;</small>
            <small>{Helper.humanFileSize(value.size)}&nbsp;&nbsp;</small>
            <small>{value.plugin}&nbsp;&nbsp;</small>
          </div>

          <div className="btn-group">
            <MDBBtn className="aqua-gradient btn-sm" onClick={this.deleteFile.bind(this, value.fid)} title="Delete link">
              <FontAwesomeIcon icon={faTrash} size="lg" />
            </MDBBtn>
            <MDBBtn className="aqua-gradient btn-sm" onClick={this.restartFile.bind(this, value.fid)} title="Restart link">
              <FontAwesomeIcon icon={faSync} size="lg" />
            </MDBBtn>
          </div>
        </div>
      </div>
    </li>;
  }
}
