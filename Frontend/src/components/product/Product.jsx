import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Modal, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAPI } from "../../services/apiContext/api.context";
import modelIMG from "../../assets/modelIMG.jpg";

const Product = ({ products }) => {
  const { productId } = useParams();
  const { addToCart } = useAPI();
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const product = products.find((p) => p.code === parseInt(productId));

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const handleAddToCart = () => {
    const success = addToCart(product);
    if (success) {
      setShowModal(true);
    } else {
      setShowErrorModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <Container fluid
    className="min-vh-100 bg-dark d-flex flex-column justify-content-center align-items-center text-light">
      <Row>
        {/* Imagen del producto */}
        <Col md={6} className="text-center">
          <Card.Img src={product.image ? product.image : modelIMG} className="img-fluid rounded" />
        </Col>

        {/* Detalles del producto */}
        <Col md={6} className="mt-5">
          <h2 className="fw-bold">{product.name}</h2>
          <p className="mb-3">{product.description}</p>
          <h3 className="fw-bold">$ {product.price.toLocaleString()}</h3>

          {/* Información de pago y descuentos */}
          <p className="mb-3 mt-5">Hasta <strong>3 cuotas SIN interés</strong> con tarjeta de DÉBITO</p>
          <p className="mb-3">12 cuotas sin interés de <strong>${(product.price / 12).toFixed(2)}</strong></p>
          <p className="mb-3"><strong>10% de descuento</strong> pagando con Transferencia</p>

          <h4 className="fw-bold mt-5">Talle: {product.size}</h4>

          {/* Botón para agregar al carrito */}
          <Button
            variant="light"
            className="w-50 py-2 my-3 fw-bold mt-5"
            onClick={handleAddToCart}
          >
            AGREGAR AL CARRITO
          </Button>
        </Col>
      </Row>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Producto agregado 🛒</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          El producto <strong>{product.description}</strong> ha sido agregado a tu carrito.
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
          Este producto ya está en el carrito. Cada prenda es única, por lo que no se puede agregar más de una vez.
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

