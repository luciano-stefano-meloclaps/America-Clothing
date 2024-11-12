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
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("info");
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Usar AuthContext

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      setVariant("warning");
      setMessage("Por favor, completa todos los campos correctamente.");
      return;
    }

    setValidated(true);
    setLoading(true);

    try {
      const response = await axios.post(
        "https://localhost:7091/api/authenticate/authenticate",
        { email, password }
      );

      const token = response.data;
      login(token); // Usar el método login de AuthContext
      setVariant("success");
      setMessage("Inicio de sesión exitoso.");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setVariant("danger");
        setMessage(
          "Email y/o contraseña incorrectas. Por favor intente de nuevo."
        );
      } else {
        setVariant("danger");
        setMessage(
          "Ocurrió un error al intentar iniciar sesión. Por favor, intenta de nuevo más tarde."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-us-wrapper bg-dark d-flex flex-column justify-content-center align-items-center shadow">
      <h1 className="section-title text-light mb-4 text-uppercase">
        Iniciar Sesion
      </h1>
      <Container
        className="contact-us-container p-5 my-5 rounded"
        style={{ maxWidth: "600px" }}
      >
        <Row className="align-items-center justify-content-center text-center my-4">
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
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="p-4"
        >
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingresa un email válido.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password" className="mt-4">
            <Form.Control
              type="password"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingresa una contraseña.
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="light"
            type="submit"
            className="mt-2 shadow rounded w-100"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </Button>
          {variant === "danger" &&
            message ===
              "Ocurrió un error al intentar iniciar sesión. Por favor, intenta de nuevo más tarde." && (
              <Alert variant="danger" className="mt-3">
                {message}
              </Alert>
            )}
        </Form>

        {/*}  <Form>
          {message && (
            <Alert variant="danger" className="mx-4">
              {message}
            </Alert>
          )} 
        </Form> */}
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
