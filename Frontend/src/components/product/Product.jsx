import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Modal, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAPI } from "../../services/apiContext/api.context"; // Importa el contexto
import modelIMG from "../../assets/modelIMG.jpg"; // Importar IMG

const Product = ({ products }) => {
  const { productId } = useParams();
  const { addToCart } = useAPI(); // Función para agregar al carrito desde el contexto
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal de éxito
  const [showErrorModal, setShowErrorModal] = useState(false); // Estado para controlar el modal de error

  // Encontrar el producto usando el ID pasado desde productCard
  const product = products.find((p) => p.code === parseInt(productId));

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const handleAddToCart = () => {
    const success = addToCart(product); // Agrega el producto al carrito
    if (success) {
      setShowModal(true); // Mostrar el modal de éxito solo si se agregó con éxito
    } else {
      setShowErrorModal(true); // Mostrar el modal de error si el producto ya está en el carrito
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cierra el modal de éxito
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false); // Cierra el modal de error
  };
  // console.log(product);
  return (
    
    <Container
      fluid
      className="min-vh-100 bg-dark d-flex flex-column justify-content-center align-items-center text-light"
    >
      <Row className="text-center mb-4">
        <Col>
          <Card.Img variant="top" src={product.image ? product.image : modelIMG}  className="img-rounded w-50" />
        </Col>
      </Row>
      <Row className="text-center mb-4">
        <Col>
          <h1>{product.name}</h1>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <p>
            <strong>Talla:</strong> {product.size}
          </p>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <p>
            <strong>Descripción:</strong> {product.description}
          </p>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col xs="auto" className="mb-2">
          <Button variant="light" onClick={handleAddToCart}>
            Agregar al carrito
          </Button>
        </Col>
        {/*  <Col xs="auto" className="mb-2">
          <Link to={`/productos/detalle/${product.code}`}>
            <Button variant="outline-light">Ver detalles</Button>
          </Link>
        </Col>*/}
      </Row>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Producto agregado🛒</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          El producto <strong>{product.description}</strong> ha sido agregado a
          tu carrito.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de error */}
      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton className="bg-danger text-light">
          <Modal.Title>Error al agregar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-danger text-light">
          Este producto ya está en el carrito. Cada prenda es única, por lo que
          no se puede agregar más de una vez.
        </Modal.Body>
        <Modal.Footer className="bg-danger">
          <Button variant="dark" onClick={handleCloseErrorModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Product;
