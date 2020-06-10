import React from 'react';
import { Component } from 'react';
import { MDBProgress, MDBBtn, MDBCollapse } from 'mdbreact';
import { PackageDelete } from './PackageDelete';
import { PackageRestart } from './PackageRestart';
import { PackageMove } from './PackageMove';
import { PackageEdit } from './PackageEdit';
import { PackageAdd } from './PackageAdd';
import { PackageLink } from './PackageLink';

import { faFolder, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Helper from './Helper'

// import { PackageRestartFailed } from './PackageRestartFailed';

export class Package extends Component {
  state = {
    result: {
      links: []
    },
    isOpen: false,
    firstrun: true,
  };

  constructor(props){
    super(props);

    this.loadChildren = this.loadChildren.bind(this)
  }

  loadChildren() {
    fetch("/api/getPackageData/" + this.props.pid)
      .then(res => res.json())
      .then(
        (result) => {
          result.links = this.orderLinks(result.links)

          this.setState({
            result: result,
            isOpen: true,
            firstrun: false,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );

    if (process.env.NODE_ENV === 'development') {
      var result = {"name": "test", "links": [
        {"status": 0, "format_size": "196.23 MiB", "name": "001_plop.avi", "plugin": "ExampleORG", "url": "https://www.example.org/file/ABCdefJISDADOH123321/001_plop.avi", "packageID": this.props.pid, "fid": 2670, "error": "", "statusmsg": "finished", "order": 0, "size": 100908102},
        {"status": 0, "format_size": "498.13 MiB", "name": "002_plop.avi", "plugin": "ExampleORG", "url": "https://www.example.org/file/ABCdefJISDADOH123323/002_plop.avi", "packageID": this.props.pid, "fid": 2671, "error": "", "statusmsg": "finished", "order": 1, "size": 200908102}
      ], "dest": 1, "pid": 32, "site": "", "linksdone": null, "fids": null, "sizetotal": null, "sizedone": null, "linkstotal": null, "folder": "test", "password": "", "order": 5}
      this.setState({
        result: result,
        isOpen: true,
        firstrun: false,
      });
    }
  }

  orderLinks (links) {
    return links.sort( (p, p2) => {return p.order - p2.order; });
  }

  getChildren() {
    if (!this.state.isOpen) {
      this.loadChildren()
    }
    else {
      this.setState({
        ...this.state,
        isOpen: !this.state.isOpen
      })
    }
  }

  render() {
    const percentDone = Math.round(100 / this.props.linkstotal * this.props.linksdone);
    const folderIcon = !this.state.isOpen ? faFolder : faFolderOpen
    const bar = Helper.getLabelColors(this.props.pid)

    return <li id={"package_" + this.props.pid}>
      <div>
        <div className="order d-none">{this.props.order}</div>

        <div className="clearfix">
          <span className="font-weight-bold col-lg-6 col-12 float-left px-0">
            <MDBBtn className="peach-gradient" onClick={this.getChildren.bind(this, this.props.pid)}>
              <FontAwesomeIcon icon={folderIcon} size="lg" />
            </MDBBtn>

            <span className="font-weight-bold">{this.props.name}</span>
          </span>
        </div>
        <div className="col-12 col-sm-12 px-2">
          <MDBProgress height="20px" material value={percentDone} barClassName={bar} className="col-12 p-0">
            <div className="d-flex justify-content-between">
              <span className="text-left">{this.props.linksdone} / {this.props.linkstotal}</span>&nbsp;
              <span className="text-right">{Helper.humanFileSize(this.props.sizedone)} / {Helper.humanFileSize(this.props.sizetotal)}</span>
            </div>
          </MDBProgress>
        </div>

        <MDBCollapse isOpen={this.state.isOpen}>
          <span className="col-lg-4 col-12 float-right btn-group px-0">
            <PackageDelete title="Delete package" {...this.props} />
            <PackageRestart title="Restart package" {...this.props} />
            <PackageEdit title="Edit package" {...this.props} />
            <PackageMove title="Move package" {...this.props} />
            {/* <PackageRestartFailed title="Reverse entries" {...this.props} /> */}
            <PackageAdd title="Add to package" {...this.props} />
          </span>

          <div className="col-12 my-2">
            <span className="col-6">Folder: <span>{ this.props.folder }</span></span>
            <span className="col-3">Password: <span>{ this.props.password }</span></span>
          </div>

          <ul className="list-unstyled">
            {this.state.result.links.map((value, index) => {
              return <PackageLink key={ value.fid } reload={ this.loadChildren } { ...value } />
            })}
          </ul>
        </MDBCollapse>
      </div>
    </li>;
  }
}
