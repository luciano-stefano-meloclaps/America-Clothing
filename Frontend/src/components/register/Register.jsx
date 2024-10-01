import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    state: true,
    address: "",
    phoneNumber: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7091/api/User",
        formData
      );
      console.log("User registered:", response.data);
      setSuccess("Usuario registrado con éxito");
      setError(null);
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Hubo un error al registrar el usuario");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Usuario</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su apellido"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Nombre de Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese un nombre de usuario"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese una contraseña"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su dirección"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhoneNumber">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su número de teléfono"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Registrarse
        </Button>
      </Form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {success && <div className="alert alert-success mt-3">{success}</div>}
    </div>
  );
};

export default Register;
