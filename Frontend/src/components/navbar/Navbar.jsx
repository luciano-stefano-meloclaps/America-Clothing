import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button"; // Importa el botón de Bootstrap
import { Link } from "react-router-dom"; // Para manejar rutas con React Router
import NavDropdown from "react-bootstrap/NavDropdown";
import Alert from "react-bootstrap/Alert";

function NavbarMain() {
  return (
    <>
      <Alert className="m-0 p-1 " variant="warning" key="info">
        Todas las compras por arriba de $30.000 son sin cargo! 🛒
      </Alert>
      <Navbar
        expand="lg"
        variant="dark"
        sticky="top"
        className="py-2 bg-dark ps-5"
      >
        <Container>
          <Navbar.Brand className="text-white-50 my-auto" href="#home">
            <img src="public/game.png" alt="logo" width="38" height="38" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="d-flex justify-content-around"
          >
            <Nav className="me-auto">
              <Nav.Link className="text-white-50" href="#home">
                Home
              </Nav.Link>
              <NavDropdown
                id="nav-productos-dropdown"
                title="Productos"
                menuVariant="dark"
              >
                <NavDropdown.Item href="#action/3.1">Camperas</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Jeans</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">Buzos</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.5">Camisas</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.6">Bermudas</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.7">Vestidos</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.8">
                  Prendas top 🔥
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className="nav-item text-white-50" href="#link">
                Quienes somos
              </Nav.Link>
              <Nav.Link className="text-white-50" href="#link">
                Contactanos
              </Nav.Link>
            </Nav>
            <div className="d-flex">
              <Link to="/register">
                <Button variant="light" className="me-2">
                  Registrar
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline-light">Iniciar sesión</Button>
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarMain;
