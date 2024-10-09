import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCcVisa,
  faCcMastercard,
  faCcPaypal,
  faCcApplePay,
  faCcAmazonPay,
  faFacebookF,
  faInstagram,
  faTwitter,
  faWhatsapp,
  faLinkedin,
  faCcAmex,
} from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row className="mb-3">
          <Col md={3} className="text-center">
            <h5 className="text-secondary">Inicio</h5>
            <a href="#" className="text-white d-block">
              Shop
            </a>
            <a href="#" className="text-white d-block">
              Nosotros
            </a>
            <a href="#" className="text-white d-block">
              Contacto
            </a>
            <a href="#" className="text-white d-block">
              Política de Envío
            </a>
          </Col>
          <Col md={3} className="text-center" id="quienes-somos">
            <h5 className="text-secondary">Contacto</h5>
            <p>americanclothing@gmail.com</p>
            <div>
              <a href="#" className="text-white mx-2">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="text-white mx-2">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="text-white mx-2">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="text-white mx-2">
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
              <a href="#" className="text-white mx-2">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </Col>
          <Col md={3} className="text-center">
            <h5 className="text-secondary">Dirección</h5>
            <p className="text-white">Zeballos 1341 - Rosario</p>
            <p className="text-white">S2000BQA </p>
          </Col>
          <Col md={3} className="text-center">
            <h5 className="text-secondary">Suscríbete</h5>
            <Form onSubmit={handleSubscribe}>
              <Form.Control
                type="email"
                placeholder="Tu correo electrónico"
                className="mb-2"
                required
              />
              <Button variant="outline-light" className="mt-2" type="submit">
                Suscribirse
              </Button>
            </Form>
            {showAlert && (
              <Alert variant="success" className="mt-2">
                Ya te uniste a nuestro canal 😎!
              </Alert>
            )}
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <p className="text-secondary">
              © 2024 Empresa. Todos los derechos reservados.
            </p>
            <div>
              <FontAwesomeIcon
                icon={faCcVisa}
                className="mx-2 fs-4 text-secondary"
              />
              <FontAwesomeIcon
                icon={faCcMastercard}
                className="mx-2 fs-4 text-secondary"
              />
              <FontAwesomeIcon
                icon={faCcPaypal}
                className="mx-2 fs-4 text-secondary"
              />
              <FontAwesomeIcon
                icon={faCcApplePay}
                className="mx-2 fs-4 text-secondary"
              />
              <FontAwesomeIcon
                icon={faCcAmazonPay}
                className="mx-2 fs-4 text-secondary"
              />
              <FontAwesomeIcon
                icon={faCcAmex}
                className="mx-2 fs-4 text-secondary"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
