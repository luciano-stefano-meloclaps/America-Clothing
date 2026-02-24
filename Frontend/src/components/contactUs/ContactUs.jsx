import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image, Alert, FloatingLabel } from "react-bootstrap";
import { faEnvelope, faLocationDot, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ContactUs.css";

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
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTermsAccepted(false);
    setValidated(false);
  };

  return (
    <div className="contact-us-wrapper d-flex flex-column align-items-center">
      <Container>
        <h1 className="contact-us-section-title text-center text-uppercase">
          ¿Hablamos?
        </h1>

        <div className="contact-glass-container mt-4">
          <Row className="g-0">
            {/* Panel de Información */}
            <Col lg={5} className="contact-info-panel">
              <div className="mb-4">
                <Image
                  src="/game.png"
                  width={60}
                  className="mb-4"
                  alt="American Vintage"
                />
                <h2 className="text-white fw-bold mb-3">Estemos en contacto</h2>
                <p className="text-white-50 mb-5">
                  Estamos acá para ayudarte a encontrar tu próximo tesoro vintage o resolver cualquier duda que tengas.
                </p>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="info-text">
                  <h4>Email</h4>
                  <p>americanclothing@gmail.com</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div className="info-text">
                  <h4>Showroom</h4>
                  <p>Zeballos 1341 - Rosario, SF</p>
                </div>
              </div>

              <a 
                href="https://api.whatsapp.com/send?phone=3364025085" 
                target="_blank" 
                rel="noopener noreferrer"
                className="whatsapp-minimal"
              >
                <div className="whatsapp-info">
                  <FontAwesomeIcon icon={faWhatsapp} className="whatsapp-icon" />
                  <div className="whatsapp-text">
                    <span>Atención inmediata</span>
                    <b>Chateá con nosotros</b>
                  </div>
                </div>
                <FontAwesomeIcon icon={faPaperPlane} className="text-success" />
              </a>
            </Col>

            {/* Panel de Formulario */}
            <Col lg={7} className="contact-form-panel">
              {submitted ? (
                <div className="h-100 d-flex align-items-center justify-content-center p-5 text-center">
                  <div className="animate__animated animate__zoomIn">
                    <div className="info-icon-box mx-auto mb-4" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </div>
                    <h3 className="text-white fw-bold mb-3">¡Mensaje enviado con éxito!</h3>
                    <p className="text-white-50 mb-4">
                      Gracias por escribirnos. Nuestro equipo te responderá lo antes posible.
                    </p>
                    <Button 
                      variant="outline-warning" 
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2"
                    >
                      Enviar otro mensaje
                    </Button>
                  </div>
                </div>
              ) : (
                <Form noValidate validated={validated} onSubmit={handleSubmit} className="p-2">
                  <h3 className="text-white mb-4 fw-bold">Envianos un mensaje</h3>
                  
                  <Row>
                    <Col md={6}>
                      <FloatingLabel label="Tu nombre" className="mb-4">
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Nombre"
                          required
                          value={formData.name}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Por favor, ingresá tu nombre.
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                    
                    <Col md={6}>
                      <FloatingLabel label="Tu email" className="mb-4">
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Ingresá un email válido.
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <FloatingLabel label="¿En qué podemos ayudarte?" className="mb-4">
                    <Form.Control
                      as="textarea"
                      name="message"
                      placeholder="Mensaje"
                      style={{ height: '160px' }}
                      required
                      value={formData.message}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Escribí tu mensaje aquí.
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <Form.Group className="mb-4">
                    <Form.Check
                      className="text-white-50 small"
                      required
                    >
                      <Form.Check.Input 
                        type="checkbox" 
                        required 
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                      />
                      <Form.Check.Label>
                        Acepto que mis datos sean procesados para recibir una respuesta.
                      </Form.Check.Label>
                      <Form.Control.Feedback type="invalid">
                        Debés aceptar para continuar.
                      </Form.Control.Feedback>
                    </Form.Check>
                  </Form.Group>

                  <Button
                    variant="premium"
                    type="submit"
                    className="btn-premium w-100 mt-2"
                  >
                    <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                    Enviar Mensaje
                  </Button>
                </Form>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ContactUs;

