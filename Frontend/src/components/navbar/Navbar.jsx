import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Alert from "react-bootstrap/Alert";
import { faCartShopping, faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavbarMain() {
  return (
    <>
      <Alert className="m-0 p-1" variant="warning" key="info">
        Todas las compras por arriba de $30.000 son sin cargo! 🛒
      </Alert>
      <Navbar
        expand="lg"
        variant="dark"
        sticky="top"
        className="py-2 bg-dark ps-5"
      >
        <Container>
          <Navbar.Brand className="text-white-50 my-auto" href="/">
            <img src="public/game.png" alt="logo" width="38" height="38" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto flex-column flex-lg-row">
              <Nav.Link className="text-light" href="/">
                Home
              </Nav.Link>
              <NavDropdown
                title={<span style={{ color: "white" }}>Productos</span>}
                menuVariant="dark"
              >
                <NavDropdown.Item as={Link} to="/productos/Camperas">
                  Camperas
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/productos/Jeans">
                  Jeans
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/productos/Buzos">
                  Buzos
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/productos/Camisas">
                  Camisas
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/productos/Bermudas">
                  Bermudas
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/productos/Vestidos">
                  Vestidos
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/productos/top">
                  Prendas top 🔥
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className="nav-item text-light" href="#quienes-somos">
                Quienes somos
              </Nav.Link>
              <Nav.Link className="text-light" href="#contactanos">
                Contactanos
              </Nav.Link>
            </Nav>
            <div className="d-flex flex-column flex-lg-row align-items-center">
              <Link to="/register">
                <Button variant="light" className="mb-2 mb-lg-0 ">
                  Registrar
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline-light"
                  className="mx-lg-3 mb-2 mb-lg-0"
                >
                  Iniciar sesión
                </Button>
              </Link>
              <Link to="/cart" className="text-white pt-1 mx-2 fs-4">
                <FontAwesomeIcon icon={faCartShopping} />
              </Link>
              <Link to="/dashboard" className="text-white pt-1 mx-2 fs-4">
                <FontAwesomeIcon icon={faSliders} />
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarMain;
