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
        "/api/authenticate/authenticate",
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

  const handleDemoAdmin = () => handleDemoLogin("admin@demo.com", "admin123");
  const handleDemoClient = () => handleDemoLogin("client@demo.com", "client123");

  const handleDemoLogin = async (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setValidated(true);
    setLoading(true);

    // Mock tokens para fallback offline (Portfolio ready)
    const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGVtbyBBZG1pbiIsInJvbGUiOiJhZG1pbiIsInN1YiI6Ijk5OTgiLCJleHAiOjE5OTk4ODg3Nzd9.fake_signature";
    const clientToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGVtbyBDbGllbnQiLCJyb2xlIjoiY2xpZW50Iiwic3ViIjoiOTk5OSIsImV4cCI6MTk5OTg4ODc3N30.fake_signature";
    const selectedToken = demoEmail.includes("admin") ? adminToken : clientToken;

    try {
      const response = await axios.post(
        "/api/authenticate/authenticate",
        { email: demoEmail, password: demoPassword }
      );

      const token = response.data;
      login(token); 
      setVariant("success");
      setMessage("Inicio de sesión exitoso.");
      navigate("/");
    } catch (error) {
      console.warn("API fallida para demo login, usando fallback local...", error);
      
      // Fallback local para que el portfolio siempre funcione
      login(selectedToken);
      setVariant("success");
      setMessage("Modo Demo: Inicio de sesión exitoso (Sesión local).");
      
      // Pequeño delay para UX
      setTimeout(() => {
        navigate("/");
      }, 800);
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
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="p-4 d-flex flex-column gap-3"
        >
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              size="lg"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingresa un email válido.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              size="lg"
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
            size="lg"
            type="submit"
            className="mt-4 w-100 fw-bold border-0 text-dark"
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
            disabled={loading}
          >
            {loading ? "Cargando..." : "INICIAR SESIÓN"}
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
              disabled={loading}
              onClick={handleDemoAdmin}
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
              disabled={loading}
              onClick={handleDemoClient}
            >
              Log in como Cliente
            </Button>
          </div>

          {message && (
            <Alert variant={variant} className="mt-3">
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
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="fw-bold text-warning text-decoration-none">
            Regístrate aquí
          </Link>
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
