import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

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
    <Container
      className="mt-5 d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        {message && <Alert variant="info">{message}</Alert>}{" "}
        {/* Mostrar mensaje si existe */}
        <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4 w-100">
            Iniciar Sesión
          </Button>
        </Form>
        <div className="text-center mt-3">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </div>
      </div>
    </Container>
  );
}

export default Login;
