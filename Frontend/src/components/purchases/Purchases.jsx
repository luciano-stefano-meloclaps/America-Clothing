import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, ListGroup, Spinner, Alert, Container, Accordion, Row, Col } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useAPI } from "../../services/apiContext/api.context";

import "./Purchases.css";

const Purchases = () => {
  const [saleOrders, setSaleOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState([]);

  const { userId } = useAuth();
  const { products } = useAPI();

  useEffect(() => {
    const fetchSaleOrdersWithLines = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "/api/SaleOrder/GetSaleOrdersWithLines",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const filteredOrders = response.data.filter((order) => {
          return Number(order.userId) === Number(userId);
        });

        setSaleOrders(filteredOrders.sort((a, b) => b.saleOrderId - a.saleOrderId));
      } catch (err) {
        setError("Error al cargar las órdenes de compra.");
        console.error("Error fetching sale orders with lines:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSaleOrdersWithLines();
  }, [userId]);

  const toggleOrder = (orderId) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
    );
  };

  const calculateOrderTotal = (lines) => {
    return lines.reduce((total, line) => total + line.unitPrice * line.amount, 0);
  };

  const getProductDetails = (productCode) => {
    const product = products.find((p) => p.code === productCode);
    return product ? { name: product.name, imageUrl: product.image } : { name: "Producto", imageUrl: "" };
  };

  if (loading) return (
    <div className="purchases-container d-flex justify-content-center align-items-center">
      <Spinner animation="border" variant="info" />
    </div>
  );

  if (error) return (
    <div className="purchases-container">
      <Container><Alert variant="danger">{error}</Alert></Container>
    </div>
  );

  return (
    <div className="purchases-container">
      <Container>
        <h2 className="purchases-title">Mis Compras</h2>
        
        {saleOrders.length === 0 ? (
          <div className="empty-state">
            <h3 className="text-white mb-3">No has realizado ninguna compra aún</h3>
            <p className="text-muted">¡Tus outfits favoritos te están esperando!</p>
          </div>
        ) : (
          <div className="orders-list">
            {saleOrders.map((order) => {
              const isExpanded = expandedOrders.includes(order.saleOrderId);
              return (
                <div key={order.saleOrderId} className={`order-card ${isExpanded ? 'expanded' : ''}`}>
                  <div className="order-header" onClick={() => toggleOrder(order.saleOrderId)}>
                    <div className="d-flex align-items-center gap-3">
                      <span className="order-id-badge">#{order.saleOrderId}</span>
                      <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="d-flex align-items-center gap-4">
                      <span className="order-total">${calculateOrderTotal(order.lines).toFixed(2)}</span>
                      <span className="expand-icon">▼</span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="order-details-expanded">
                      {order.lines.map((line) => {
                        const { name, imageUrl } = getProductDetails(line.productId);
                        return (
                          <div key={line.saleOrderLineId} className="order-item-row">
                            <img src={imageUrl} alt={name} className="order-item-img" />
                            <div className="order-item-info">
                              <h4 className="order-item-name">{name}</h4>
                              <div className="order-item-meta">
                                Cantidad: {line.amount} • Precio x u: ${line.unitPrice.toFixed(2)}
                              </div>
                            </div>
                            <div className="order-item-price">
                              ${(line.unitPrice * line.amount).toFixed(2)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
};


export default Purchases;

