import React, { Component } from 'react';
import { Link } from 'react-router'
import { Navbar, Nav } from 'react-bootstrap';

export default class Navigation extends Component {

  render() {
    return (
      <Navbar bg="light" expand="lg" className="mb-4">
        <Navbar.Brand href="/">SmartCase</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Dashboard</Nav.Link>
          <Nav.Link href="/motion">Motion</Nav.Link>
          <Nav.Link href="/config">Configuration</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
