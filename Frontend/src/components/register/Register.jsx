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
    };

    try {
      const response = await axios.post(
        "/api/User",
        userData
      );

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
        <Row className="align-items-center justify-content-center text-center mb-5">
          <Col xs="auto" className="pe-1">
            <Image src="/game.png" width={50} fluid />
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
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="d-flex flex-column gap-3 px-4 pb-4">
          {success && (
            <Alert variant="success" className="mb-0">
              {success}
            </Alert>
          )}
          <Form.Group className="pt-2">
            <Form.Control
              type="text"
              size="lg"
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

          <Form.Group>
            <Form.Control
              type="text"
              size="lg"
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

          <Form.Group>
            <Form.Control
              type="text"
              size="lg"
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

          <Form.Group>
            <Form.Control
              type="email"
              size="lg"
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

          <Form.Group>
            <Form.Control
              type="password"
              size="lg"
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

          <Form.Group>
            <Form.Control
              type="password"
              size="lg"
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



          <Button
            size="lg"
            type="submit"
            className="w-100 fw-bold mt-4 border-0 text-dark"
            style={{
              borderRadius: "8px",
              padding: "14px",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              backgroundColor: "#ffc107",
              boxShadow: "0 4px 10px rgba(255, 193, 7, 0.3)",
              letterSpacing: "1px"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 15px rgba(255, 193, 7, 0.5)";
              e.currentTarget.style.backgroundColor = "#ffcd39";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(255, 193, 7, 0.3)";
              e.currentTarget.style.backgroundColor = "#ffc107";
            }}
          >
            CREAR CUENTA
          </Button>

          <div className="d-flex flex-column gap-3 mt-4 pt-4 border-top border-secondary">
            <p className="text-center text-secondary mb-2 fw-semibold" style={{ fontSize: "0.85rem", letterSpacing: "1.5px" }}>ACCESOS RÁPIDOS DEMO</p>
            <Button
              size="lg"
              type="button"
              className="w-100 fw-bold"
              style={{
                borderRadius: "8px",
                padding: "12px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                backgroundColor: "rgba(13, 202, 240, 0.08)",
                color: "#17a2b8",
                border: "1px solid rgba(13, 202, 240, 0.4)"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(13, 202, 240, 0.15)";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(13, 202, 240, 0.2)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(13, 202, 240, 0.08)";
                e.currentTarget.style.color = "#17a2b8";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              onClick={() => navigate("/login")}
            >
              Log in como Admin
            </Button>
            <Button
              size="lg"
              type="button"
              className="w-100 fw-bold"
              style={{
                borderRadius: "8px",
                padding: "12px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                backgroundColor: "rgba(32, 201, 151, 0.08)",
                color: "#20c997",
                border: "1px solid rgba(32, 201, 151, 0.4)"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(32, 201, 151, 0.15)";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(32, 201, 151, 0.2)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(32, 201, 151, 0.08)";
                e.currentTarget.style.color = "#20c997";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              onClick={() => navigate("/login")}
            >
              Log in como Cliente
            </Button>
          </div>
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
      <Modal 
        show={showModal} 
        onHide={handleCloseModal}
        contentClassName="bg-dark text-light border-secondary"
        centered
      >
        <Modal.Header closeButton variant="white" className="border-secondary">
          <Modal.Title>Usuario agregado</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4">
          Usuario agregado exitosamente. Ya puedes iniciar sesión.
        </Modal.Body>
        <Modal.Footer className="border-secondary">
          <Button variant="outline-light" onClick={handleCloseModal} className="px-4">
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Register;
