import React from 'react';
import { Component } from 'react';
import { MDBInput, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import cogoToast from 'cogo-toast';

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export class PackageAdd extends Component {
  state = {
    modal: false,
    data: {
      add_links: '',
    }
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      data: {},
    });

    this.props.reload()
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

    var data = this.state.data.add_links;
    if (!data) {
      return;
    }

    var urls = data.split('\n');
    urls.map(url => {
      return encodeURI(url)
    })

    // split
    const SPLIT_LENGTH = 4000;
    var newurls = [];
    var length = 0;
    var a = 0;
    newurls[a] = [];
    for (var i in urls) {
      let url = urls[i];
      length += url.length;

      if (length > SPLIT_LENGTH) {
        a++;
        length = url.length;
        newurls[a] = [];
      }

      newurls[a].push(url);
    }

    const promises = [];
    for (let i in newurls) {
      let urls = newurls[i];
      var url = "/api/addFiles";

      url += "?pid=" + this.props.pid;
      url += "&links=" + JSON.stringify(urls);

      const promise = fetch(url).then(res => ({ res: res, promise: 'promise' + i }));
      promises.push(promise);
    }

    Promise.all(promises)
      .then(res => {
        this.toggle();

        cogoToast.success("Success!", { heading: this.props.title });
      })
      .catch((error) => {
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
        <FontAwesomeIcon icon={faPlus} size="lg" />
      </MDBBtn>

      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
      <form id="add_form"
            className="form-group needs-validation"
            action="/api/addFiles" method="POST"
            onSubmit={this.submitHandler}
            noValidate>
        <MDBModalHeader toggle={this.toggle}>Add Links to package</MDBModalHeader>
        <MDBModalBody>
          <div>Paste your links or upload a container.</div>
          <div className="form-group">
            <MDBInput
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
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="warning" onClick={this.toggle}>Cancel</MDBBtn>
          <MDBBtn color="primary" onClick={this.submit} title={ this.props.title } type="submit">Add Links</MDBBtn>
        </MDBModalFooter>
        </form>
      </MDBModal>
    </>;
  }
}