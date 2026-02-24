import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image, Alert } from "react-bootstrap";

import { faEnvelope, faLocationDot, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./ContactUs.css";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContactUs = () => {
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    setValidated(true);
    setSubmitted(true);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setTermsAccepted(false);
    setValidated(false);
  };

  return (
    <div className="contact-us-wrapper bg-dark d-flex flex-column justify-content-center align-items-center">
      <h1 className="section-title text-light mb-4 text-uppercase">
        Contactanos!
      </h1>

      <Container className="contact-us-container py-5 my-5 rounded shadow-lg">
        <Row className="justify-content-center text-center">
          <Col xs={12} md={8}>
            <Image
              src="/game.png"
              width={40}
              className="mb-3 shadow-sm rounded-circle shadow-accent"
              alt="American Vintage Logo"
            />
            <p className="text-light fs-4 fw-light px-3">
              Gracias por ser parte de nuestra comunidad.
            </p>
            <p className="text-light-50 fs-6">
               ¡Esperamos que disfrutes de tu experiencia de compra con nosotros!
            </p>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            {submitted ? (
              <Alert
                variant="success"
                onClose={() => setSubmitted(false)}
                dismissible
                className="text-center py-4"
              >
                <Alert.Heading>¡Mensaje enviado! 🎉</Alert.Heading>
                <p className="mb-0">
                  Gracias por contactarnos. Te responderemos a la brevedad.
                </p>
              </Alert>
            ) : (
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="rounded mb-4" controlId="formName">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    required
                    className="rounded"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, ingresa tu nombre.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="rounded mb-4" controlId="formEmail">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="rounded"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, ingresa un email válido.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="rounded mb-4" controlId="formMessage">
                  <Form.Control
                    as="textarea"
                    rows={8}
                    name="message"
                    placeholder="Mensaje"
                    required
                    className="rounded"
                    value={formData.message}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, escribe tu mensaje.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Check
                    className="text-light"
                    required
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
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
                  <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                  Enviar mensaje
                </Button>
              </Form>
            )}
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
      <div>
        <p className="text-light py-3 fs-5">
          Sino envianos un mensaje por WhatsApp!
        </p>
        <main className="bg-black rounded main-wp">
          <div className="card bg-black  mx-5 px-5">
            <i className="bi bi-whatsapp mx-auto icono pb3"></i>
            <div className="card-body d-flex flex-column align-items-center">
              <h5 className="card-title text-center text-success pb-5">
                Whatsapp
              </h5>
              <FontAwesomeIcon
                icon={faWhatsapp}
                style={{ color: "#198754" }}
                className="pb-5 icon-wp"
              />
              <a
                href="https://api.whatsapp.com/send?phone=3364025085"
                className="btn btn-success enviarmensaje fw-bold"
              >
                Enviar Mensaje
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContactUs;
