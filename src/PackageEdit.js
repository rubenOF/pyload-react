import React from 'react';
import { Component } from 'react';
import { MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

import cogoToast from 'cogo-toast';

import { faEdit, faName } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class PackageEdit extends Component {
  state = {
    modal: false,
    data: {
      name: this.props.name,
      folder: this.props.folder,
      password: this.props.password,
    }
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    this.props.reload();
  };

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value,
      },
    }));
  };
  submitHandler = event => {
    event.preventDefault();

    event.target.className += " was-validated";
    let url = "/api/setPackageData";
    url += "?pid=" + this.props.pid;
    url += "&data=" + JSON.stringify(this.state.data);
    fetch(url)
      .then(res => res.json())
      .then(result => {
        this.toggle();

        cogoToast.success("Success!", { heading: this.props.title });
      }, (error) => {
        this.setState({
          isLoaded: true,
          error
        });

        cogoToast.error("Error!", { heading: this.props.title });
      });
  };
  render() {
    return <>
      <MDBBtn className="aqua-gradient" onClick={this.toggle} title={ this.props.title }>
        <FontAwesomeIcon icon={faEdit} size="lg" />
      </MDBBtn>

      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <form id="add_form" className="form-group needs-validation" action="/json/add_package" method="POST" onSubmit={this.submitHandler} noValidate>
          <MDBModalHeader toggle={this.toggle}>Edit Package</MDBModalHeader>
          <MDBModalBody>
            <div>Edit the package detais below.</div>
            <div className="form-group">
              <MDBInput type="text" label="Name" value={this.state.data.name} onChange={this.changeHandler} name="name" icon="name" required>
                <p className="font-small grey-text d-flex">The name of the package</p>
              </MDBInput>
            </div>
            <div className="form-group">
              <MDBInput type="text" label="Folder" name="folder" value={this.state.data.folder} onChange={this.changeHandler} icon="link" required>
                <p className="font-small grey-text d-flex">Name of subfolder for these downloads</p>
              </MDBInput>
            </div>
            <div className="form-group">
              <MDBInput type="text" label="Password" name="password" value={this.state.data.password} onChange={this.changeHandler} icon="key">
                <p className="font-small grey-text d-flex">The package password</p>
              </MDBInput>
            </div>

          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="warning" onClick={this.toggle}>Cancel</MDBBtn>
            <MDBBtn className="aqua-gradient" onClick={this.submit} type="submit" title={ this.props.title }>Edit Package</MDBBtn>
          </MDBModalFooter>
        </form>
      </MDBModal>
    </>;
  }
}
