import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "./ContactUs.css";

//Documentacion de React Bootstrap
const ContactUs = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <div className="contact-us-wrapper bg-dark d-flex flex-column justify-content-center align-items-center">
      <h1 className="section-title text-light mb-4 text-uppercase">Contacto</h1>
      <Container className="contact-us-container py-5 my-5 rounded">
        <Row className="m-3 m-md-5 px-3 px-md-5 justify-content-md-center">
          <Col xs={12} md={8}>
            <Image src="public/game.png" width={40} fluid className="mb-2" />
            <p className="text-light">
              Gracias por ser parte de nuestra comunidad. ¡Esperamos que
              disfrutes de tu experiencia de compra con nosotros!
            </p>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="rounded mb-4" controlId="formName">
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  required
                  className="rounded"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, ingresa tu nombre.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="rounded mb-4" controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  required
                  className="rounded"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, ingresa un email válido.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="rounded mb-4" controlId="formMessage">
                <Form.Control
                  as="textarea"
                  rows={8}
                  placeholder="Mensaje"
                  required
                  className="rounded"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, escribe tu mensaje.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Check
                  className="text-light"
                  required
                  label="Aceptar los términos y condiciones"
                  feedback="Debes aceptar los términos y condiciones antes de enviar."
                  feedbackType="invalid"
                />
              </Form.Group>

              <Button
                variant="light"
                type="submit"
                className="mt-4 shadow rounded w-100"
              >
                Enviar
              </Button>
            </Form>
          </Col>
        </Row>
        <div>
          <Row className="text-center text-light mt-5">
            <Col className="d-flex align-items-center justify-content-center">
              <FontAwesomeIcon icon={faEnvelope} className="me-2" />
              <p className="mb-0">americanclothing@gmail.com</p>
            </Col>
          </Row>
          <Row className="text-center text-light m-1 mb-5">
            <Col className="d-flex align-items-center justify-content-center">
              <FontAwesomeIcon icon={faLocationDot} className="me-2" />
              <p className="mb-0">zeballos 1341 - Rosario</p>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ContactUs;
