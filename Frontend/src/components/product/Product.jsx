import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Modal, Card, Toast, ToastContainer } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useAPI } from "../../services/apiContext/api.context";
import modelIMG from "../../assets/modelIMG.jpg";

import { faCreditCard, faCalendarDays, faMoneyBillWave, faCircleCheck, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import "./Product.css";

const Product = () => {
  const { productId } = useParams();
  const { addToCart } = useAPI();
  const navigate = useNavigate();
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
    return (
      <div className="product-detail-container min-vh-100 bg-dark text-light p-5">
        <Container>
           <Button variant="link" onClick={() => navigate(-1)} className="back-button-custom-detail mb-5">
            <FontAwesomeIcon icon={faArrowLeft} /> Volver
          </Button>
          <div className="text-center mt-5">Cargando producto...</div>
        </Container>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container min-vh-100 bg-dark text-light p-5">
        <Container>
          <Button variant="link" onClick={() => navigate(-1)} className="back-button-custom-detail mb-5">
            <FontAwesomeIcon icon={faArrowLeft} /> Volver
          </Button>
          <div className="text-center mt-5">Producto no encontrado</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="product-detail-container min-vh-100">
      <Container>
        <div className="product-detail-header mb-4">
          <Button 
            variant="link" 
            onClick={() => navigate(-1)} 
            className="back-button-custom-detail"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Volver
          </Button>
        </div>
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


      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050 }}>
        <Toast 
          show={showModal} 
          onClose={handleCloseModal} 
          delay={3000} 
          autohide 
          bg="success"
          className="text-white"
        >
          <Toast.Header closeButton={true} className="bg-success text-white border-bottom-0">
            <strong className="me-auto">¡Agregado! 🛒</strong>
          </Toast.Header>
          <Toast.Body>
            El producto <strong>{product.name}</strong> ha sido agregado a tu carrito.
          </Toast.Body>
        </Toast>
      </ToastContainer>


      <Modal 
        show={showErrorModal} 
        onHide={handleCloseErrorModal}
        contentClassName="bg-dark text-light border-danger"
        centered
      >
        <Modal.Header closeButton variant="white" className="border-danger text-danger">
          <Modal.Title>Error al agregar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4">
          Este producto ya está en el carrito. Cada prenda es única, por lo que no se puede agregar más de una vez.
        </Modal.Body>
        <Modal.Footer className="border-danger">
          <Button variant="outline-danger" onClick={handleCloseErrorModal} className="px-4">
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Product;
