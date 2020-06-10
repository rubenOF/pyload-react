import React from 'react';
import { Component } from 'react';
import { MDBInput, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import cogoToast from 'cogo-toast';

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class ActionAdd extends Component {
  state = {
    modal: false,
    data: {
      add_name: '',
      add_links: '',
      add_dest: "1",
      add_password: ''
    }
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });

    this.props.status.refresh();
  };

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(prevState => ({
      ...prevState,
      data: {
        ...prevState.data,
        [name]: value,
      },
    }));
  };

  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";

    for (let name in this.state.data) {
      let data = this.state.data[name];

      if (data === ''
        && this.refs[name].props.required) {
        return;
      }
    }

    var formData  = new FormData();
    for (let name in this.state.data) {
      let data = this.state.data[name];

      formData.append(name, data);
    }

    fetch("/json/add_package", {
      method: 'post',
      body: formData
    })
      .then(
        (result) => {
          this.toggle();

          cogoToast.success("Success!", { heading: this.props.title });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });

          cogoToast.error("Error!", { heading: this.props.title });
        }
      )
    };

  render() {
    return <>
      <MDBBtn className="peach-gradient" onClick={this.toggle}>
        <FontAwesomeIcon icon={faPlus} size="lg" />
      </MDBBtn>

      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
      <form id="add_form"
            className="form-group needs-validation"
            action="/json/add_package" method="POST"
            onSubmit={this.submitHandler}
            noValidate>
        <MDBModalHeader toggle={this.toggle}>Add Package</MDBModalHeader>
        <MDBModalBody>
          <div>Paste your links or upload a container.</div>
          <div className="form-group">
            <MDBInput
              ref="add_name"
              type="text"
              label="Name"
              value={this.state.data.add_name}
              onChange={this.changeHandler}
              name="add_name"
              icon="name"
              required>
                <p className="font-small grey-text d-flex">The name of the package</p>
            </MDBInput>
          </div>
          <div className="form-group">
            <MDBInput
              ref="add_links"
              type="textarea"
              rows="4"
              label="Links"
              name="add_links"
              value={this.state.data.add_links}
              onChange={this.changeHandler}
              icon="link"
              required>
                <p className="font-small grey-text d-flex">Add a list of links</p>
            </MDBInput>
          </div>
          <div className="form-group">
            <MDBInput
              ref="add_password"
              type="text"
              label="Password"
              name="add_password"
              value={this.state.data.add_password}
              onChange={this.changeHandler}
              icon="key">
                <p className="font-small grey-text d-flex">Type the package password</p>
            </MDBInput>
          </div>
          {/* <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">
                  Upload
                </span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose file
                </label>
              </div>
            </div>
            <p className="font-small grey-text d-flex">Upload a package</p>
          </div> */}
          <div className="form-group">
           <label className="grey-text">
              Destination
            </label>
            <div className="form-inline">
              <MDBInput
                ref="add_dest"
                type="radio"
                id="queue"
                gap
                onChange={this.changeHandler}
                value="1"
                name="add_dest"
                checked={this.state.data.add_dest==="1" ? true : false}
                label="Queue">
              </MDBInput>
              <MDBInput
                ref="add_dest"
                type="radio"
                id="collector"
                gap
                onChange={this.changeHandler}
                value="0"
                checked={this.state.data.add_dest==="0" ? true : false}
                name="add_dest"
                label="Collector">
              </MDBInput>
            </div>
          </div>

        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="warning" onClick={this.toggle}>Cancel</MDBBtn>
          <MDBBtn color="primary" onClick={this.submit} type="submit" title={ this.props.title }>Add Package</MDBBtn>
        </MDBModalFooter>
        </form>
      </MDBModal>
    </>
  }
}
