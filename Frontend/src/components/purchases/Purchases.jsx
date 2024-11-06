import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, ListGroup, Spinner, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext"; // Asegúrate de que esta ruta sea correcta

const Purchases = () => {
  const [saleOrders, setSaleOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtén el userId del contexto de autenticación
  const { userId } = useAuth();

  useEffect(() => {
    const fetchSaleOrdersWithLines = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://localhost:7091/api/SaleOrder/GetSaleOrdersWithLines",
          {
            headers: {
              Authorization: `Bearer ${token}`,  // Corregido aquí
            },
          }
        );

        // Filtrar las órdenes para que solo se muestren las del usuario autenticado
        const filteredOrders = response.data.filter(order => {
          return Number(order.userId) === Number(userId);  // Convertimos ambos a números
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
  }, [userId]);  // Asegúrate de que el userId sea parte de las dependencias

  // Función para calcular el total de la orden
  const calculateOrderTotal = (lines) => {
    return lines.reduce(
      (total, line) => total + line.unitPrice * line.amount,
      0
    );
  };

  // Función para formatear la fecha
  const formatDateTime = (dateTime) => {
    return dateTime
      ? dateTime.replace("T", " ").substring(0, 19)
      : "Fecha no disponible";
  };

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4">
      <h2>Todas las Compras</h2>
      {saleOrders.length === 0 ? (
        <Alert variant="info">No hay órdenes de compra disponibles.</Alert>
      ) : (
        <ListGroup>
          {saleOrders.map((order) => (
            <ListGroup.Item key={order.saleOrderId} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>ID de Orden: {order.saleOrderId}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Fecha: {formatDateTime(order.date)}
                  </Card.Subtitle>
                  <Card.Text>
                    Total: ${calculateOrderTotal(order.lines).toFixed(2)}
                  </Card.Text>

                  <h5>Detalles de la Orden:</h5>
                  {order.lines && order.lines.length > 0 ? (
                    <ListGroup>
                      {order.lines.map((line) => (
                        <ListGroup.Item key={line.saleOrderLineId}>
                          <p>Producto: {line.productId}</p>
                          <p>Precio Unitario: ${line.unitPrice.toFixed(2)}</p>
                          <p>Cantidad: {line.amount}</p>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p>No hay detalles disponibles para esta orden.</p>
                  )}
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default Purchases;
