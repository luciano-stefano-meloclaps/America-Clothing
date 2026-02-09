import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Image,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Para la redirección
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phoneNumber: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 6000);

    return () => clearTimeout(timer);
  }, [error, success]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/login"); // Redirige a /login al cerrar el modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      setError("Por favor, completa todos los campos correctamente.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const userData = {
      name: formData.name,
      lastName: formData.lastName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
    };

    try {
      const response = await axios.post(
        "/api/User",
        userData
      );
      console.log("Usuario registrado:", response.data);
      setSuccess("Usuario registrado con éxito");
      setError(null);
      setShowModal(true); // Muestra el modal al registrar exitosamente
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setError(
        "Hubo un error al registrar el usuario: " +
          (error.response ? error.response.data : error.message)
      );
    }
  };

  return (
    <div className="contact-us-wrapper bg-dark d-flex flex-column justify-content-center align-items-center ">
      <h1 className="section-title text-light mb-4 text-uppercase">Registro</h1>
      <Container
        className="contact-us-container p-5 my-5 rounded"
        style={{ maxWidth: "600px" }}
      >
        <Row className="align-items-center justify-content-center text-center">
          <Col xs="auto" className="pe-1">
            <Image src="public/game.png" width={50} fluid />
          </Col>
          <Col xs="auto">
            <h1
              className="text-light"
              style={{ fontFamily: "Caveat", margin: 0 }}
            >
              American clothing
            </h1>
          </Col>
        </Row>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {success && (
            <Alert variant="success" className="mt-3">
              {success}
            </Alert>
          )}
          <Form.Group className="pt-5 mb-4">
            <Form.Control
              type="text"
              placeholder="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingresa tu nombre.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="Apellido"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingresa tu apellido.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="Usuario"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingresa un nombre de usuario.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingresa un email válido.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              placeholder="Contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingresa una contraseña.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              placeholder="Confirme su contraseña"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, confirma tu contraseña.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="Dirección"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingresa tu dirección.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="Teléfono"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingresa tu número de teléfono.
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="light"
            type="submit"
            className="shadow rounded w-100"
          >
            Crear cuenta
          </Button>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Form>
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

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Usuario agregado</Modal.Title>
        </Modal.Header>
        <Modal.Body>Usuario agregado exitosamente</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Register;
