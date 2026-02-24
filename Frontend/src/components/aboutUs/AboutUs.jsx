import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faEye,
  faUsers,
  faHistory,
  faTruck,
  faCreditCard,
  faRecycle,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import "./AboutUs.css";

const values = [
  {
    icon: faBullseye,
    variant: "mission",
    title: "Misión",
    text: "Curar las mejores prendas vintage americanas, garantizando autenticidad y un estilo que trasciende décadas.",
  },
  {
    icon: faEye,
    variant: "vision",
    title: "Visión",
    text: "Ser la referencia en moda vintage de Argentina, conectando la historia de cada prenda con quien la lleva.",
  },
  {
    icon: faUsers,
    variant: "team",
    title: "Equipo",
    text: "Apasionados por la moda y la sostenibilidad. Cada pieza que seleccionamos refleja nuestro compromiso con vos.",
  },
  {
    icon: faHistory,
    variant: "history",
    title: "Historia",
    text: "Nacimos con la idea de que la mejor ropa ya fue hecha. Desde entonces, rescatamos tesoros de otra época para vos.",
  },
];

const features = [
  {
    icon: faTruck,
    title: "Envío Gratis",
    text: "En compras superiores a $30.000, el envío corre por nuestra cuenta a todo el país.",
  },
  {
    icon: faCreditCard,
    title: "Cuotas sin Interés",
    text: "Hasta 6 cuotas sin interés con todas las tarjetas de crédito.",
  },
  {
    icon: faRecycle,
    title: "Moda Sustentable",
    text: "Cada compra vintage es un acto consciente. Reutilizar es la forma más elegante de cuidar el planeta.",
  },
  {
    icon: faShieldHalved,
    title: "100% Auténtico",
    text: "Verificamos cada prenda para asegurar su autenticidad y calidad original.",
  },
];

const AboutUs = () => {
  return (
    <div className="about-wrapper">
      <Container>
        {/* Header */}
        <Row className="justify-content-center text-center mb-5">
          <Col lg={8}>
            <h1 className="about-section-title text-uppercase mb-4 about-fade-up">
              Sobre Nosotros
            </h1>
            <hr className="about-divider mb-4 about-fade-up" />
            <p className="about-subtitle about-fade-up">
              Bienvenidos a{" "}
              <span className="about-brand-highlight">American Clothing</span>,
              tu destino de moda vintage americana. Cada prenda que ofrecemos
              tiene una historia, un carácter y un estilo que no encontrás en
              ningún otro lugar.
            </p>
          </Col>
        </Row>

        {/* Value Cards */}
        <Row className="g-4 mb-5">
          {values.map((item, index) => (
            <Col
              key={item.title}
              md={6}
              lg={3}
              className={`about-fade-up about-fade-up-delay-${index + 1}`}
            >
              <div className="about-glass-card">
                <div className={`about-card-icon ${item.variant}`}>
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <h3 className="about-card-title">{item.title}</h3>
                <p className="about-card-text">{item.text}</p>
              </div>
            </Col>
          ))}
        </Row>

        {/* Features Strip */}
        <div className="about-features-strip about-fade-up">
          <Row className="justify-content-center">
            {features.map((feat) => (
              <Col key={feat.title} sm={6} lg={3} className="mb-4 mb-lg-0">
                <div className="about-feature-item">
                  <div className="about-feature-icon">
                    <FontAwesomeIcon icon={feat.icon} />
                  </div>
                  <h4 className="about-feature-title">{feat.title}</h4>
                  <p className="about-feature-text">{feat.text}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
