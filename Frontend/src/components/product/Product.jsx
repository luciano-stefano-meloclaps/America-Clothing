import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Modal, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useAPI } from "../../services/apiContext/api.context";
import modelIMG from "../../assets/modelIMG.jpg";

import { faCreditCard, faCalendarDays, faMoneyBillWave, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Product.css";

const Product = () => {
  const { productId } = useParams();
  const { addToCart } = useAPI();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/Product/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    const success = addToCart(product);
    if (success) {
      setShowModal(true);
    } else {
      setShowErrorModal(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleCloseErrorModal = () => setShowErrorModal(false);

  if (isLoading) {
    return <Container className="min-vh-100 d-flex justify-content-center align-items-center bg-dark text-light">Cargando producto...</Container>;
  }

  if (!product) {
    return <Container className="min-vh-100 d-flex justify-content-center align-items-center bg-dark text-light">Producto no encontrado</Container>;
  }

  return (
    <div className="product-detail-container min-vh-100">
      <Container>
        <Row className="gy-4">
          <Col lg={5} md={6}>
            <div className="product-image-box h-100">
              <img 
                src={product.image || modelIMG} 
                alt={product.name}
                className="img-fluid rounded" 
                style={{ maxHeight: '600px', width: 'auto', objectFit: 'contain' }} 
              />
            </div>
          </Col>

          <Col lg={7} md={6}>
            <div className="product-info-card">
              <h1 className="product-title">{product.name}</h1>
              <p className="product-description">{product.description}</p>
              
              <div className="product-price">
                {product.price.toLocaleString()}
              </div>

              <div className="payment-info">
                <p>
                  <FontAwesomeIcon icon={faCreditCard} className="me-2 text-primary" />
                  Hasta <strong>3 cuotas SIN interés</strong> con tarjeta de DÉBITO
                </p>
                <p>
                  <FontAwesomeIcon icon={faCalendarDays} className="me-2 text-info" />
                  12 cuotas sin interés de <strong>${(product.price / 12).toFixed(2)}</strong>
                </p>
                <p>
                  <FontAwesomeIcon icon={faMoneyBillWave} className="me-2 text-success" />
                  <strong>10% de descuento</strong> pagando con Transferencia
                </p>
                
                <div className="size-badge">
                  <FontAwesomeIcon icon={faCircleCheck} className="me-2 text-dark" />
                  Talle: {product.size}
                </div>
              </div>

              <Button
                variant="dark"
                className="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                AGREGAR AL CARRITO
              </Button>
            </div>
          </Col>
        </Row>
      </Container>


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
    </div>
  );
};

export default Product;
