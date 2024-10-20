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

const ProductAdd = () => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    size: "",
    // type: "", // Propiedad comentada
    // image: "", // Propiedad comentada
    // state: true, // Propiedad comentada
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 8000);

    return () => clearTimeout(timer);
  }, [error, success]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      code: formData.code,
      name: formData.name,
      description: formData.description,
      price: formData.price,
      stock: formData.stock,
      size: formData.size,
      // type: formData.type, // Propiedad comentada
      // image: formData.image, // Propiedad comentada
      // state: formData.state, // Propiedad comentada
    };

    try {
      const response = await axios.post(
        "https://localhost:7091/api/Product",
        productData
      );
      console.log("Producto registrado:", response.data);
      setSuccess("Producto registrado con éxito");
      setError(null);
    } catch (error) {
      console.error("Error al registrar el producto:", error);
      setError(
        "Hubo un error al registrar el producto: " +
          (error.response ? error.response.data : error.message)
      );
    }
  };

  return (
    <div className="contact-us-wrapper bg-dark d-flex flex-column justify-content-center align-items-center ">
      <h1 className="section-title text-light mb-4 text-uppercase">
        Añadir Producto
      </h1>
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
              placeholder="Código"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
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
              placeholder="Descripción"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="number"
              placeholder="Precio"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="number"
              placeholder="Stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="Tamaño"
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button
            variant="light"
            type="submit"
            className="shadow rounded w-100"
          >
            Añadir Producto
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default ProductAdd;
