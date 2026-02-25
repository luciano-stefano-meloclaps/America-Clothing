import React from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./FAQ.css";

const faqProduct = [
  {
    q: "¿Cómo sé que la ropa es auténtica?",
    a: "Cada prenda en <strong>American Clothing</strong> es seleccionada y verificada rigurosamente por nuestro equipo de expertos para asegurar su autenticidad y estado vintage.",
  },
  {
    q: "¿Puedo reservar una prenda?",
    a: "Al ser prendas vintage únicas, no ofrecemos servicio de reservas. El primero en completar la compra se lleva la prenda. ¡No te dejes estar!",
  },
  {
    q: "¿Cómo elijo mi talle?",
    a: "En la descripción de cada producto encontrarás el talle y, en muchos casos, las medidas exactas. Recomendamos comparar con una prenda que ya tengas.",
  },
  {
    q: "¿Qué medios de pago aceptan?",
    a: "Aceptamos todas las tarjetas de crédito y débito (Visa, Mastercard, Amex), transferencias bancarias y efectivo a través de RapiPago o PagoFácil.",
  },
];

const faqShipping = [
  {
    q: "¿Hacen envíos a todo el país?",
    a: "¡Claro que sí! Realizamos envíos a toda Argentina a través de Correo Argentino y Andreani. El costo se calcula al momento del checkout.",
  },
  {
    q: "¿Cuánto tarda en llegar mi pedido?",
    a: "Los envíos suelen demorar entre 3 y 7 días hábiles, dependiendo de tu ubicación. Te enviaremos un código de seguimiento apenas despachemos.",
  },
  {
    q: "¿Cuál es la política de devoluciones?",
    a: "Tenés 30 días para realizar una devolución si la prenda no te queda como esperabas. La prenda debe estar en las mismas condiciones en que fue recibida.",
  },
  {
    q: "¿Las cuotas sin interés aplican a todo?",
    a: "Sí, todos nuestros productos califican para los planes de 3 y 6 cuotas sin interés. Aprovechá para renovar tu placard.",
  },
];

const FAQ = () => {
  return (
    <div className="faq-wrapper">
      <Container>
        {/* Header */}
        <Row className="justify-content-center text-center mb-5">
          <Col lg={8}>
            <h1 className="faq-section-title text-uppercase mb-4 faq-fade-up">
              Preguntas Frecuentes
            </h1>
            <hr className="faq-divider mb-4 faq-fade-up" />
            <p className="faq-subtitle faq-fade-up">
              Resolvé tus dudas antes de comprar. Si no encontrás lo que buscás,
              no dudes en escribirnos.
            </p>
          </Col>
        </Row>

        {/* Accordion Columns */}
        <Row className="g-4 mb-5">
          {/* Left Column — Product */}
          <Col lg={6} className="faq-fade-up faq-fade-up-delay">
            <p className="faq-category-label">Producto y Pagos</p>
            <Accordion className="faq-glass-accordion">
              {faqProduct.map((item, i) => (
                <Accordion.Item key={`prod-${i}`} eventKey={String(i)}>
                  <Accordion.Header>{item.q}</Accordion.Header>
                  <Accordion.Body
                    dangerouslySetInnerHTML={{ __html: item.a }}
                  />
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>

          {/* Right Column — Shipping */}
          <Col lg={6} className="faq-fade-up faq-fade-up-delay">
            <p className="faq-category-label">Envíos y Devoluciones</p>
            <Accordion className="faq-glass-accordion">
              {faqShipping.map((item, i) => (
                <Accordion.Item key={`ship-${i}`} eventKey={String(i)}>
                  <Accordion.Header>{item.q}</Accordion.Header>
                  <Accordion.Body
                    dangerouslySetInnerHTML={{ __html: item.a }}
                  />
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>

        {/* CTA Banner */}
        <div className="faq-cta-banner faq-fade-up">
          <div className="faq-cta-text">
            <h4>
              <FontAwesomeIcon icon={faComments} className="me-2" />
              ¿No encontraste tu respuesta?
            </h4>
            <p>Nuestro equipo está disponible para ayudarte por email o WhatsApp.</p>
          </div>
          <Link to="/contactUs" className="faq-cta-btn">
            Contactanos
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default FAQ;
