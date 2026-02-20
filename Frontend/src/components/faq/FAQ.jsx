import React from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import "./FAQ.css";

const FAQ = () => {
  return (
    <div className="faq-wrapper">
      <Container className="faq-section">
        <h1 className="text-center mb-4 text-uppercase">Preguntas Frecuentes</h1>
        <p className="lead text-center mb-5">
          ¿Tenés alguna duda? Aquí te enseñamos las preguntas más comunes de nuestra comunidad.
        </p>
        <Row>
          <Col md={6}>
            <Accordion className="custom-accordion">
              <Accordion.Item eventKey="0" className="mb-3">
                <Accordion.Header>¿Cómo sé que la ropa es auténtica?</Accordion.Header>
                <Accordion.Body>
                  Cada prenda en <strong>American Clothing</strong> es seleccionada y verificada rigurosamente por nuestro equipo de expertos para asegurar su autenticidad y estado vintage.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1" className="mb-3">
                <Accordion.Header>¿Puedo reservar una prenda?</Accordion.Header>
                <Accordion.Body>
                  Al ser prendas vintage únicas, no ofrecemos servicio de reservas. El primero en completar la compra se lleva la prenda. ¡No te dejes estar!
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2" className="mb-3">
                <Accordion.Header>¿Cómo elijo mi talle?</Accordion.Header>
                <Accordion.Body>
                  En la descripción de cada producto encontrarás el talle y, en muchos casos, las medidas exactas. Recomendamos comparar con una prenda que ya tengas.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3" className="mb-3">
                <Accordion.Header>¿Qué medios de pago aceptan?</Accordion.Header>
                <Accordion.Body>
                  Aceptamos todas las tarjetas de crédito y débito (Visa, Mastercard, Amex), PayPal, transferencias bancarias y efectivo a través de RapiPago o PagoFácil.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col md={6}>
            <Accordion className="custom-accordion">
              <Accordion.Item eventKey="4" className="mb-3">
                <Accordion.Header>¿Hacen envíos a todo el país?</Accordion.Header>
                <Accordion.Body>
                  ¡Claro que sí! Realizamos envíos a toda Argentina a través de Correo Argentino y Andreani. El costo se calcula al momento del checkout.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5" className="mb-3">
                <Accordion.Header>¿Cuánto tarda en llegar mi pedido?</Accordion.Header>
                <Accordion.Body>
                  Los envíos suelen demorar entre 3 y 7 días hábiles, dependiendo de tu ubicación. Te enviaremos un código de seguimiento apenas despachemos.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6" className="mb-3">
                <Accordion.Header>¿Cuál es la política de devoluciones?</Accordion.Header>
                <Accordion.Body>
                  Tenés 30 días para realizar una devolución si la prenda no te queda como esperabas. La prenda debe estar en las mismas condiciones en que fue recibida.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="7" className="mb-3">
                <Accordion.Header>¿Las cuotas sin interés aplican a todo?</Accordion.Header>
                <Accordion.Body>
                  Sí, todos nuestros productos califican para los planes de 3 y 6 cuotas sin interés. Aprovechá para renovar tu placard.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FAQ;
