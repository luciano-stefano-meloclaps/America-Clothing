import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faEye,
  faUsers,
  faHistory,
  faTruck,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us-wrapper flex-grow-1">
      <Container className="about-us-section">
      <Row className="justify-content-center mb-4 ">
        <Col md={8} className="text-center">
          <h1 className="mb-4 text-uppercase ">Sobre Nosotros</h1>
          <p className="lead ">
            ¡Hey! Bienvenidos a{" "}
            <span className="brand-name">American Clothing</span>, tu tienda de
            ropa favorita. Nos encanta ofrecerte prendas únicas y de alta
            calidad que cuentan una historia.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center mb-5">
        <Col md={5} className="d-flex align-items-stretch mb-4 ">
          <Card className="bg-secondary bg-dark text-light card-hover ">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faBullseye} /> Misión
              </Card.Title>
              <Card.Text>
                Nos encanta ofrecerte productos de alta calidad. Cada prenda es
                seleccionada con mucho cuidado para asegurar su autenticidad y
                estilo único
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5} className="d-flex align-items-stretch mb-4">
          <Card className="bg-secondary bg-dark text-light card-hover">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faEye} /> Visión
              </Card.Title>
              <Card.Text>
                Queremos ser tu tienda online favorita, siempre a la vanguardia
                y con la mejor onda. Cuando pienses en moda vintage, piensa en
                nosotros.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mb-5">
        <Col md={5} className="d-flex align-items-stretch mb-4">
          <Card className="bg-secondary bg-dark text-light card-hover">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faUsers} /> Equipo
              </Card.Title>
              <Card.Text>
                Somos un equipo apasionado. Nos esforzamos al máximo para
                ofrecerte una experiencia de compra que no encontrarás en ningún
                otro lugar.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5} className="d-flex align-items-stretch mb-4">
          <Card className="bg-dark text-light card-hover">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faHistory} /> Historia
              </Card.Title>
              <Card.Text>
                Desde el día uno, hemos crecido gracias a tu confianza y apoyo.
                Cada prenda que ofrecemos tiene su propia historia única.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mb-5">
        <Col md={5} className="text-center mb-4 text-secondary">
          <FontAwesomeIcon icon={faTruck} size="3x" className="mb-3" />
          <h3>Envíos Gratis</h3>
          <p>
            A partir de $30.000 en compras, disfruta de envíos gratis a todo el
            país.
          </p>
        </Col>
        <Col md={5} className="text-center mb-4 text-secondary">
          <FontAwesomeIcon icon={faCreditCard} size="3x" className="mb-3" />
          <h3>Cuotas sin Interés</h3>
          <p>
            Aprovecha nuestras opciones de pago en 3 y 6 cuotas sin interés, y
            hasta 30 cuotas con tarjeta de crédito.
          </p>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default AboutUs;
