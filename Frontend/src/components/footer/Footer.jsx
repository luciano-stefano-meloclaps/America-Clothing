import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark py-4">
      <Container>
        <Row>
          <Col md={6} className="text-secondary">
            <p>© 2024 Empresa. Todos los derechos reservados.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <a href="#">Términos de servicio</a> |{" "}
            <a href="#">Política de privacidad</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
