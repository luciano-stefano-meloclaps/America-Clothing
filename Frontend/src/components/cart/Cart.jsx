import React, { useState } from "react";
import { useAPI } from "../../services/apiContext/api.context";
import { useAuth } from "../../context/AuthContext";
import {
  Button,
  Table,
  Image,
  Badge,
  Modal,
  Container,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";

const Cart = () => {
  const [validatedButtonShop, setValidatedButtonShop] = useState(false);
  const { cart, removeFromCart, clearCart } = useAPI();
  const { userId } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Nuevo estado para el modal de éxito
  const [showErrorModal, setShowErrorModal] = useState(false); // Nuevo estado para el modal de error

  // Estado de los Forms
  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [validated, setValidated] = useState(false);

  const handlePurchaseClick = () => {
    if (!userId) {
      setShowAuthModal(true);
    } else {
      setShowOrderModal(true);
    }
  };

  const handleConfirmPurchase = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Set form as validated if all fields pass the validation
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const orderLines = cart.map((product) => ({
      ProductId: product.code,
      Amount: product.quantity,
    }));

    try {
      const response = await axios.post(
        "https://localhost:7091/api/SaleOrder",
        {
          userId: Number(userId),
          orderLines,
        }
      );
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
    //Modal Confirmacion Orden

    <div className="bg-dark d-flex fs-5 flex-column justify-content-center align-items-center w-100 min-vh-100">
      {cart.length > 0 ? (
        <>
          <Table
            striped
            hover
            responsive="sm"
            className="table-dark text-white table-bordered justify-content-center align-items-center"
            style={{ width: "90vw" }}
          >
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
                    <div className="d-flex align-items-center  justify-content-center ">
                      <Image
                        src={product.image}
                        roundedCircle
                        style={{ width: "45px", height: "45px" }}
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
                    <Button
                      variant="danger"
                      size="sm"
                      className="btn-rounded"
                      onClick={() => removeFromCart(product.code)}
                    >
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
                  <b>
                    $
                    {cart.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )}
                  </b>
                </td>
              </tr>
            </tfoot>
          </Table>
          <Button variant="success" onClick={handlePurchaseClick}>
            Realizar compra
          </Button>
        </>
      ) : (
        //Mensaje de no hay prod
        <h1 className="text-white">No hay productos en el carrito :( </h1>
      )}

      {/* Modal de alerta de inicio de sesión */}
      <Modal show={showAuthModal} onHide={handleCloseAuthModal}>
        <Modal.Header closeButton>
          <Modal.Title>Inicia sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Por favor, inicia sesión para completar tu compra.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleCloseAuthModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmación de compra */}
      <Modal show={showOrderModal} onHide={handleCloseOrderModal}>
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>Confirmación de la Orden</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <h5>Resumen de la compra:</h5>
          <Table
            striped
            bordered
            hover
            responsive="sm"
            className="text-center table-dark table-hover"
          >
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
                <td colSpan="3">
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>
                    $
                    {cart.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )}
                  </strong>
                </td>
              </tr>
            </tfoot>
          </Table>
        </Modal.Body>
        {/* Formulario de pago */}
        <div className="px-3 p-0 bg-dark d-flex flex-column justify-content-center align-items-center">
          <Container className="py-3 px-4 mb-5 rounded">
            <Row className="mb-4 p-0 text-center">
              <Col xs={12} md={12}>
                <Image
                  src="public/game.png"
                  width={40}
                  fluid
                  className="mb-2 text-center"
                />
              </Col>
              <h5 className="text-white my-1">Completa los datos para pagar</h5>
            </Row>

            <Form
              noValidate
              validated={validated}
              onSubmit={handleConfirmPurchase}
            >
              <Form.Group controlId="formCardType" className="my-3">
                <Form.Select
                  required
                  value={cardType}
                  onChange={(e) => setCardType(e.target.value)}
                >
                  <option value="">Seleccione el tipo de tarjeta</option>
                  <option value="1">Debito</option>
                  <option value="2">Credito</option>
                </Form.Select>
                {/* Error*/}
                <Form.Control.Feedback type="invalid">
                  Seleccione el tipo de tarjeta.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formCardNumber" className="py-3">
                <Form.Control
                  required
                  type="text"
                  placeholder="Número de tarjeta"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese el número de tarjeta.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formName" className="py-3">
                <Form.Control
                  required
                  type="text"
                  placeholder="Nombre y apellido"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese su nombre y apellido.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formAddress" className="py-3">
                <Form.Control
                  required
                  type="text"
                  placeholder="Dirección de entrega"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese la dirección de entrega.
                </Form.Control.Feedback>
              </Form.Group>

              <Row>
                <Col xs={6} className="py-3">
                  <Form.Group controlId="formExpiration">
                    <Form.Control
                      required
                      type="text"
                      placeholder="MM/AA"
                      value={expiration}
                      onChange={(e) => setExpiration(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingrese la fecha de expiración.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col xs={6} className="py-3">
                  <Form.Group controlId="formCVV">
                    <Form.Control
                      required
                      type="password"
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingrese el CVV.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="info" type="submit">
                Confirmar compra
              </Button>
              <Button
                variant="outline-danger"
                className="m-3 my-2"
                onClick={handleCloseOrderModal}
              >
                Cancelar
              </Button>
            </Form>
          </Container>
        </div>
      </Modal>
      {/* Fin de pago */}

      {/*}  <Modal.Footer className="bg-dark text-light">
          <Button
         variant="success"
            type="submit"
            onClick={handleConfirmPurchase}
          >
            Confirmar compra
          </Button>
        </Modal.Footer> 
      </Modal>v

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
        <Modal.Body>
          Hubo un problema al realizar la compra. Inténtalo de nuevo.
        </Modal.Body>
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
