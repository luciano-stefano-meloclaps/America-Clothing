import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, ListGroup, Spinner, Alert, Container, Accordion, Row, Col } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

const Purchases = () => {
  const [saleOrders, setSaleOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userId } = useAuth();

  useEffect(() => {
    const fetchSaleOrdersWithLines = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://localhost:7091/api/SaleOrder/GetSaleOrdersWithLines",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const filteredOrders = response.data.filter((order) => {
          return Number(order.userId) === Number(userId);
        });

        setSaleOrders(filteredOrders);
      } catch (err) {
        setError("Error al cargar las órdenes de compra.");
        console.error("Error fetching sale orders with lines:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSaleOrdersWithLines();
  }, [userId]);

  const calculateOrderTotal = (lines) => {
    return lines.reduce((total, line) => total + line.unitPrice * line.amount, 0);
  };

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="purchases-section bg-dark text-white py-5">
      <Container>
        <h2 className="text-center text-white mb-4">Todas mis Compras</h2>
        {saleOrders.length === 0 ? (
          <Alert variant="info" className="text-center text-white bg-secondary">
            No hay órdenes de compra disponibles.
          </Alert>
        ) : (
          <Accordion defaultActiveKey="0">
            {saleOrders.map((order, index) => (
              <Accordion.Item
                key={order.saleOrderId}
                eventKey={String(index)}
                className="mb-3 rounded border-0 bg-dark"
              >
                <Accordion.Header className="p-1 bg-dark rounded">
                  <Card className="shadow-sm border-0 bg-dark text-white w-100">
                    <Card.Body className="py-2 px-3">
                      <Row className="align-items-center text-center">
                        <Col>
                          <Card.Title className="fw-bold fs-6 m-0">ID de Orden: {order.saleOrderId}</Card.Title>
                        </Col>
                        <Col>
                          <Card.Subtitle className="fs-6 text-white-50 m-0">
                            Fecha: {new Date(order.date).toLocaleString()}
                          </Card.Subtitle>
                        </Col>
                        <Col>
                          <Card.Text className="fw-semibold fs-6 m-0">
                            Total: ${calculateOrderTotal(order.lines).toFixed(2)}
                          </Card.Text>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Accordion.Header>
                <Accordion.Body className="bg-dark text-white">
                  <h5 className="fw-bold mt-2 text-center">Detalles de la Orden:</h5>
                  {order.lines && order.lines.length > 0 ? (
                    <ListGroup variant="flush" className="text-center">
                      {order.lines.map((line) => (
                        <ListGroup.Item
                          key={line.saleOrderLineId}
                          className="py-1 px-3 bg-dark text-white"
                        >
                          <p className="mb-1">Producto: {line.productId}</p>
                          <p className="mb-1">Precio Unitario: ${line.unitPrice.toFixed(2)}</p>
                          <p className="mb-1">Cantidad: {line.amount}</p>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p className="text-muted">No hay detalles disponibles para esta orden.</p>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </Container>
    </div>
  );
};

export default Purchases;
