import React from 'react';
import { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse } from "mdbreact";

export class Navbar extends Component {
  state = {
    isOpen: false,
    active: window.location.pathname,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  updateActive = (to) => {
    this.setState({
      isOpen: this.state.isOpen,
      active: to,
    })
  }

  render () {
    var pathName = this.props.location.pathname;

    if (this.state.isOpen) {
      this.setState({
        isOpen: false
      });
    }

    return <MDBNavbar color="purple-gradient" dark expand="md" className="sticky-top">
      <MDBNavbarBrand>
        <img id="head-logo" src="/media/modern/img/pyload-logo.png" alt="pyLoad" style={{ height: '30px' }} />
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={ this.toggleCollapse } />
      <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem active={ pathName === "/" }>
            <MDBNavLink to="/">Home</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem active={ pathName === "/queue" }>
            <MDBNavLink to="/queue">Queue</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem active={ pathName === "/collector" }>
            <MDBNavLink to="/collector">Collector</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem active={ pathName === "/downloads" }>
            <MDBNavLink to="/downloads">Downloads</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem active={ pathName === "/logs" }>
            <MDBNavLink to="/logs">Logs</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBNavLink to="#!">Admin</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#!">Logout</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#!">Info</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  }
}
