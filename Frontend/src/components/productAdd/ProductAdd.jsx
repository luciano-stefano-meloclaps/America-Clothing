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
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    size: "", // Cambiar a vacío
    category: "", // Cambiar a vacío
    image: "", // Añadido campo de imagen
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 8000);

    return () => clearTimeout(timer);
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "https://localhost:7091/api/Product",
  //       { ...formData, stock: 1, state: 1, sold: false } // Asignar valores predeterminados
  //     );
  //     console.log("Producto registrado:", response.data);
  //     setSuccess(true);
  //     setShowModal(true);
  //   } catch (error) {
  //     console.error("Error al registrar el producto:", error);
  //     setError(
  //       "Hubo un error al registrar el producto: " +
  //         (error.response ? error.response.data : error.message)
  //     );
  //   }
  // };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file); // Agregar archivo de imagen
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("size", formData.size);
    data.append("category", formData.category);
    data.append("stock", 1);
    data.append("state", 1);
    data.append("sold", false);

    try {
      const response = await axios.post(
        "https://localhost:7091/api/Product",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Producto registrado:", response.data);
      setSuccess(true);
      setShowModal(true);
    } catch (error) {
      console.error("Error al registrar el producto:", error);
      setError(
        "Hubo un error al registrar el producto: " +
          (error.response ? error.response.data : error.message)
      );
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/#products"); // Cambiado a "/#products"
  };

  return (
    <div className="contact-us-wrapper bg-dark d-flex flex-column justify-content-center align-items-center">
      <h1 className="section-title text-light mb-4 text-uppercase">
        Añadir Producto
      </h1>
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
                <Form.Label className="text-light">Descripción</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className="text-light">Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <Form.Group>
                <Form.Label className="text-light">Tamaño</Form.Label>
                <Form.Select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Seleccionar
                  </option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className="text-light">Categoría</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Seleccionar
                  </option>
                  <option value="Camperas">Camperas</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Buzos">Buzos</option>
                  <option value="Camisas">Camisas</option>
                  <option value="Bermudas">Bermudas</option>
                  <option value="Vestidos">Vestidos</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <Form.Group>
                <Form.Label className="text-light">Imagen</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleFileChange}
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
            Añadir Producto
          </Button>
        </Form>

        {/* Modal de confirmación */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Producto agregado</Modal.Title>
          </Modal.Header>
          <Modal.Body>Producto agregado exitosamente</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseModal}>
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default ProductAdd;
