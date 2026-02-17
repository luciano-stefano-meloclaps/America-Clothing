import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Form,
  Button,
  Alert,
  Container,
  Col,
  Row,
  Modal,
  Image,
} from "react-bootstrap";

const UserUpdate = () => {
  const { userId } = useParams(); // Obtiene el userId de la URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    usertype: "",
    state: true,
    address: "",
    phoneNumber: "",
  });
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Cargar datos del usuario existente al montar el componente
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `/api/User/${userId}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        setError("No se pudo cargar la información del usuario.");
      }
    };
    fetchUser();
  }, [userId]);

  // Limpiar el mensaje de error automáticamente después de un tiempo
  useEffect(() => {
    const timer = setTimeout(() => setError(null), 8000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStateChange = (e) => {
    setFormData({ ...formData, state: e.target.value === "true" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/User/${userId}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      setShowModal(true);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      setError("Hubo un error al actualizar el usuario.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/#users");
  };

  return (
    <div className="user-update-wrapper bg-dark d-flex flex-column justify-content-center align-items-center">
      <h1 className="section-title text-light mb-4 text-uppercase">
        Actualizar Usuario
      </h1>
      <Container
        className="contact-us-container p-5 my-5 rounded"
        style={{ maxWidth: "600px" }}
      >
        <Row className="align-items-center justify-content-center text-center">
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
        <Form onSubmit={handleSubmit}>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}

          <Row className="mb-4">
            <Col>
              <Form.Group>
                <Form.Label className="text-light">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className="text-light">Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <Form.Group>
                <Form.Label className="text-light">Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className="text-light">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  isInvalid={!!error && !/\S+@\S+\.\S+/.test(formData.email)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <Form.Group>
                <Form.Label className="text-light">Contraseña</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2"
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </Button>
                </div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className="text-light">Tipo de Usuario</Form.Label>
                <Form.Select
                  name="usertype"
                  value={formData.usertype}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Seleccionar
                  </option>
                  <option value="admin">Admin</option>
                  <option value="employee">Vendedor</option>
                  <option value="client">Cliente</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <Form.Group>
                <Form.Label className="text-light">Estado</Form.Label>
                <Form.Select
                  name="state"
                  value={formData.state ? "true" : "false"}
                  onChange={handleStateChange}
                  required
                >
                  <option value="true">Habilitado</option>
                  <option value="false">Deshabilitado</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <Form.Group>
                <Form.Label className="text-light">Dirección</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className="text-light">Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button
            variant="light"
            type="submit"
            className="shadow rounded w-100"
          >
            Actualizar Usuario
          </Button>
        </Form>

        {/* Modal de confirmación */}
        <Modal 
          show={showModal} 
          onHide={handleCloseModal}
          contentClassName="bg-dark text-light border-secondary"
          centered
        >
          <Modal.Header closeButton variant="white" className="border-secondary">
            <Modal.Title>Usuario actualizado</Modal.Title>
          </Modal.Header>
          <Modal.Body className="py-4">
            Usuario actualizado exitosamente.
          </Modal.Body>
          <Modal.Footer className="border-secondary">
            <Button variant="outline-light" onClick={handleCloseModal} className="px-4">
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default UserUpdate;
