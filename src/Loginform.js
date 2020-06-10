import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Loginform extends Component {
  state = {
    // modal: false,
    data: {
      username: '',
      password: '',
    }
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
  singIn(e) {
    e.preventDefault();
    if (this.state.data.username && this.state.data.password) {
      var formData = new FormData();
      for (var name in this.state.data) {
        formData.append(name, this.state.data[name]);
      }
      fetch("/api/login", {
        method: 'post',
        body: formData
      })
        .then(res => res.json())
        .then((result) => {
          if (result === false) {
            alert('false!');
            return;
          }
          this.props.handler('asd');
        }, (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        });
    }
  }
  render() {
    return (<MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h5 text-center mb-4">Sign in</p>
            <div className="grey-text">
              <MDBInput label="Type your username" icon="user" group type="text" validate error="wrong" success="right" name="username" value={this.state.data.username} onChange={this.changeHandler} />
              <MDBInput label="Type your password" icon="lock" group type="password" validate name="password" value={this.state.data.password} onChange={this.changeHandler} />
            </div>
            <div className="text-center">
              <MDBBtn type="submit" className="peach-gradient" onClick={this.singIn.bind(this)}>
                <FontAwesomeIcon icon={faSignInAlt} size="lg" />&nbsp;
                Sign in
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>);
  }
}
;
