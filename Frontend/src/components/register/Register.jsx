import { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Alert,
  Container,
  Col,
  Row,
  Image,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    state: true,
    address: "",
    phoneNumber: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Limpiar mensajes después de 8 segundos
    const timer = setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 8000);

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
  }, [error, success]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Prepara el objeto para el envío
    const userData = {
      name: formData.name,
      lastName: formData.lastName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      state: formData.state,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
    };

    try {
      const response = await axios.post(
        "https://localhost:7091/api/User",
        userData // Asegúrate de enviar el objeto correcto
      );
      console.log("Usuario registrado:", response.data);
      setSuccess("Usuario registrado con éxito");
      setError(null);
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
        className="contact-us-container p-5  my-5 rounded "
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
        <Form onSubmit={handleSubmit}>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
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
          </Form.Group>

          <Form.Group>
            <Form.Check
              className="text-light mb-5"
              required
              label="Aceptar los términos y condiciones"
              feedback="Debes aceptar los términos y condiciones antes de enviar."
              feedbackType="invalid"
            />
          </Form.Group>

          <Button
            variant="light"
            type="submit"
            className=" shadow rounded w-100"
          >
            Crear cuenta
          </Button>
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
    </div>
  );
};

export default Register;
