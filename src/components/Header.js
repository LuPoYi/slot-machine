import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function Footer() {
  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#pricing">Game</Nav.Link>
        <Nav.Link href="#members">Members</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Footer;
