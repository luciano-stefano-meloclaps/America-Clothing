import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Alert,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que los campos no estén vacíos
    if (!email || !password) {
      setMessage("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7091/api/authenticate/authenticate",
        {
          email,
          password,
        }
      );

      const token = response.data; // Asumiendo que tu API devuelve el token directamente
      localStorage.setItem("token", token);
      console.log("Inicio de sesión exitoso.");

      // Inicias sesion y te lleva a la pagina principal
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage(
          "Credenciales inválidas. Por favor, verifica tu email y contraseña."
        );
      } else {
        setMessage(
          "Ocurrió un error al intentar iniciar sesión. Por favor, intenta de nuevo más tarde."
        );
      }
    }
  };

  return (
    <div className="contact-us-wrapper bg-dark d-flex flex-column justify-content-center align-items-center shadow">
      <h1 className="section-title text-light mb-4 text-uppercase">
        Iniciar Sesion
      </h1>
      <Container
        className="contact-us-container p-5  my-5 rounded "
        style={{ maxWidth: "600px" }}
      >
        <Row className="align-items-center justify-content-center text-center my-4">
          <Col xs="auto" className="pe-1">
            <Image src="public/game.png" width={50} fluid />
          </Col>
          <Col xs="auto">
            <h1
              className="text-light "
              style={{ fontFamily: "Caveat", margin: 0 }}
            >
              American clothing
            </h1>
          </Col>
        </Row>
        {message && <Alert variant="info">{message}</Alert>}{" "}
        {/* Mostrar mensaje si existe */}
        <Form onSubmit={handleSubmit} className=" p-4  ">
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="mt-4  ">
            <Form.Control
              type="password"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Check
              className="text-light my-5"
              required
              label="Aceptar los términos y condiciones"
              feedback="Debes aceptar los términos y condiciones antes de enviar."
              feedbackType="invalid"
            />
          </Form.Group>

          <Button
            variant="light"
            type="submit"
            className="mt-2 shadow rounded w-100"
          >
            Iniciar Sesión
          </Button>
        </Form>
        <div className="text-center mt-3 text-light">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </div>
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
}

export default Login;
