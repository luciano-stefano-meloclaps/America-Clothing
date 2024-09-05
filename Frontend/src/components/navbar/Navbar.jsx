import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavbarMain() {
  return (
    <Navbar expand="lg" className="py-2 bg-light bg-dark">
      <Container>
        <Navbar.Brand className="text-white-50 fs-3" href="#home">
          Marca
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto ">
            <Nav.Link className="text-white-50" href="#home">
              Home
            </Nav.Link>
            <Nav.Link className="text-white-50" href="#link">
              Productos
            </Nav.Link>
            <Nav.Link className="text-white-50" href="#link">
              Quienes somos
            </Nav.Link>
            <Nav.Link className="text-white-50" href="#link">
              Contactanos
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMain;
