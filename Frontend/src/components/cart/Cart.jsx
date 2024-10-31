import React, { useState } from 'react';
import { useAPI } from "../../services/apiContext/api.context";
import { useAuth } from '../../context/AuthContext';
import { Button, Table, Image, Badge, Modal } from "react-bootstrap";
import axios from 'axios';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useAPI();
  const { userId } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Nuevo estado para el modal de éxito
  const [showErrorModal, setShowErrorModal] = useState(false); // Nuevo estado para el modal de error

  const handlePurchaseClick = () => {
    if (!userId) {
      setShowAuthModal(true);
    } else {
      setShowOrderModal(true);
    }
  };

  const handleConfirmPurchase = async () => {
    const orderLines = cart.map(product => ({
      ProductId: product.code,
      Amount: product.quantity
    }));

    try {
      const response = await axios.post('https://localhost:7091/api/SaleOrder', {
        userId: Number(userId),
        orderLines
      });
      setShowOrderModal(false); // Cerrar el modal de confirmación
      setShowSuccessModal(true); // Mostrar modal de éxito
      clearCart(); // Limpiar el carrito después de una compra exitosa
    } catch (error) {
      console.error("Error al realizar la compra", error);
      setShowErrorModal(true); // Mostrar modal de error
    }
  };

  const handleCloseAuthModal = () => setShowAuthModal(false);
  const handleCloseOrderModal = () => setShowOrderModal(false);
  const handleCloseSuccessModal = () => setShowSuccessModal(false); // Cerrar modal de éxito
  const handleCloseErrorModal = () => setShowErrorModal(false); // Cerrar modal de error

  return (
    <div className="bg-dark d-flex flex-column justify-content-center align-items-center w-100 min-vh-100">
      {cart.length > 0 ? (
        <>
          <Table striped hover responsive="sm" className="bg-white text-center" style={{ width: '100vw' }}>
            <thead className="bg-light">
              <tr>
                <th>Producto</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.code}>
                  <td>
                    <div className="d-flex align-items-center">
                      <Image
                        src={product.image}
                        roundedCircle
                        style={{ width: '45px', height: '45px' }}
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td>{product.description}</td>
                  <td>
                    <Badge bg="primary" className="rounded-pill">
                      {product.quantity}
                    </Badge>
                  </td>
                  <td>${product.price}</td>
                  <td>${product.price * product.quantity}</td>
                  <td>
                    <Button variant="danger" size="sm" className="btn-rounded" onClick={() => removeFromCart(product.code)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">Total</td>
                <td colSpan="2">
                  <b>${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</b>
                </td>
              </tr>
            </tfoot>
          </Table>
          <Button variant="success" onClick={handlePurchaseClick}>
            Realizar compra
          </Button>
        </>
      ) : (
        <h1 className="text-white">No hay productos en el carrito</h1>
      )}

      {/* Modal de alerta de inicio de sesión */}
      <Modal show={showAuthModal} onHide={handleCloseAuthModal}>
        <Modal.Header closeButton>
          <Modal.Title>Inicia sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>Por favor, inicia sesión para completar tu compra.</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleCloseAuthModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmación de compra */}
      <Modal show={showOrderModal} onHide={handleCloseOrderModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de la Orden</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Resumen de la compra:</h5>
          <Table striped bordered hover responsive="sm" className="text-center">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.code}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price}</td>
                  <td>${product.price * product.quantity}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3"><strong>Total</strong></td>
                <td><strong>${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</strong></td>
              </tr>
            </tfoot>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOrderModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleConfirmPurchase}>
            Confirmar compra
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de éxito de compra */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Compra realizada con éxito</Modal.Title>
        </Modal.Header>
        <Modal.Body>¡Tu compra ha sido realizada exitosamente!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseSuccessModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de error de compra */}
      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error en la compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>Hubo un problema al realizar la compra. Inténtalo de nuevo.</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseErrorModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
