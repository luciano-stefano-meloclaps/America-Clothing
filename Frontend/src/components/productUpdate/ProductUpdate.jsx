import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Modal,
  Image,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faFileLines, faDollarSign, faRuler, faLayerGroup, faImage, faSave, faBoxesStacked, faToggleOn, faCheckDouble } from "@fortawesome/free-solid-svg-icons";

const ProductUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 1,
    size: "",
    category: "",
    state: 1,
    sold: false,
    image: "",
  });

  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        size: product.size,
        category: product.category,
        state: product.state,
        sold: product.sold,
        image: product.image,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = product?.code;
    if (!id) {
      setError("No se ha encontrado el ID del producto.");
      return;
    }

    const formDataToSend = new FormData();

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formDataToSend.append(key, formData[key]);
      }
    }

    if (formData.image) {
      formDataToSend.append("file", formData.image);
    }

    setLoading(true);

    try {
      const response = await axios.put(
        `/api/Product/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setShowModal(true);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      setError("Hubo un error al actualizar el producto.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/#products");
  };

  if (!product) {
    return <div>No se ha seleccionado ningún producto para actualizar.</div>;
  }

  return (
    <div className="contact-us-wrapper bg-dark d-flex flex-column justify-content-center align-items-center">
      <h1 className="section-title text-light mb-4 text-uppercase">
        Actualizar Producto
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

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-4">
            <Col>
              <Form.Group>
                <Form.Label className="text-light"><FontAwesomeIcon icon={faTag} className="me-2" /> Nombre</Form.Label>
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
                <Form.Label className="text-light"><FontAwesomeIcon icon={faFileLines} className="me-2" /> Descripción</Form.Label>
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
                <Form.Label className="text-light"><FontAwesomeIcon icon={faDollarSign} className="me-2" /> Precio</Form.Label>
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
                <Form.Label className="text-light"><FontAwesomeIcon icon={faBoxesStacked} className="me-2" /> Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className="text-light"><FontAwesomeIcon icon={faRuler} className="me-2" /> Tamaño</Form.Label>
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
                <Form.Label className="text-light"><FontAwesomeIcon icon={faLayerGroup} className="me-2" /> Categoría</Form.Label>
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
                <Form.Label className="text-light"><FontAwesomeIcon icon={faToggleOn} className="me-2" /> Estado</Form.Label>
                <Form.Select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                >
                  <option value={1}>Habilitado</option>
                  <option value={0}>Deshabilitado</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className="text-light"><FontAwesomeIcon icon={faCheckDouble} className="me-2" /> Vendido</Form.Label>
                <Form.Select
                  name="sold"
                  value={formData.sold}
                  onChange={handleChange}
                  required
                >
                  <option value={true}>Vendido</option>
                  <option value={false}>No vendido</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className="text-light"><FontAwesomeIcon icon={faImage} className="me-2" /> Imagen</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button
            variant="light"
            type="submit"
            className="shadow rounded w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Actualizando...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSave} className="me-2" /> Actualizar Producto
              </>
            )}
          </Button>
        </Form>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Producto actualizado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            El producto se actualizó correctamente.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default ProductUpdate;
