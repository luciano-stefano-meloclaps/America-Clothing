import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Alert from "react-bootstrap/Alert";
import { faCartShopping, faSliders, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../context/AuthContext"; // Asegúrate de que esta ruta sea correcta
import "./Navbar.css";

function NavbarMain() {
  const { isAuthenticated, logout, userFirstName, userRole } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  const handleLogout = () => {
    setShowModal(true); // Mostrar el modal cuando se haga clic en "Cerrar sesión"
  };

  const confirmLogout = () => {
    logout(); // Cierra la sesión
    setShowModal(false); // Ocultar el modal después de cerrar sesión
    navigate('/');
  };

  const handleCloseModal = () => {
    setShowModal(false); // Ocultar el modal sin cerrar sesión
  };

  return (
    <>
      <Alert className="m-0 p-1" variant="warning">
        🛒😎 Envío gratis para todas las compras arriba de $30.000! 😎🛒
      </Alert>
      <Navbar
        expand="lg"
        variant="dark"
        sticky="top"
        className="py-2 bg-dark ps-5"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="text-white-50 my-auto">
            <img src="/game.png" alt="logo" width="38" height="38" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto flex-column flex-lg-row">
              <Nav.Link as={Link} to="/" className="text-light">
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
              </NavDropdown>
              <Nav.Link as={Link} to="/AboutUs" className="nav-item text-light">
                Quienes somos
              </Nav.Link>
              <Nav.Link as={Link} to="/ContactUs" className="text-light">
                Contactanos
              </Nav.Link>
            </Nav>
            <div className="d-flex flex-column flex-lg-row align-items-center">
              {!isAuthenticated ? (
                <>
                  <Link to="/register">
                    <Button variant="light" className="mb-2 mb-lg-0">
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
                </>
              ) : (
                <>
                  <span className="text-white mx-lg-3 mb-2 mb-lg-0">
                    <strong>Hola, {userFirstName}!</strong>
                  </span>

                  <Button
                    variant="outline-light"
                    className="mx-lg-3 mb-2 mb-lg-0"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </Button>
                </>
              )}
              <Link to="/cart" className="text-white pt-1 fs-4">
                <FontAwesomeIcon icon={faCartShopping} />
              </Link>
              {userRole === "client" && ( 
                <Link to="/my-purchases" className="text-white pt-1 mx-2 fs-4">
                  <FontAwesomeIcon icon={faShoppingBag} />
                </Link>
              )}
              {userRole === "admin" || userRole === "employee" && (
                <Link to="/" className="text-white pt-1 mx-2 fs-4">
                  <FontAwesomeIcon icon={faSliders} />
                </Link>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal de confirmación */}
      <Modal
        className="modal-custom"
        show={showModal}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar cierre de sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas cerrar sesión?</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="outline-danger" onClick={confirmLogout}>
            Cerrar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavbarMain;
