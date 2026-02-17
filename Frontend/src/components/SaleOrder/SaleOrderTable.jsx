import React, { useState, useEffect } from "react";
import { Table, DropdownButton, Dropdown } from "react-bootstrap";
import { useAPI } from "../../services/apiContext/api.context";
import axios from "axios";

const SaleOrderTable = () => {
  const [saleOrders, setSaleOrders] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const { products, users } = useAPI();
  const [status, setStatus] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Cargar el estado inicial desde localStorage para los estados amigooooo
  useEffect(() => {
    const savedStatus = JSON.parse(localStorage.getItem("saleOrderStatus")) || {};
    setStatus(savedStatus);
  }, []);

  const toggleRow = (saleOrderId) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(saleOrderId)
        ? prevExpandedRows.filter((id) => id !== saleOrderId)
        : [...prevExpandedRows, saleOrderId]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getProductName = (productCode) => {
    const product = products.find((p) => p.code === productCode);
    return product ? product.name : "Nombre no disponible";
  };

  const getUserDetails = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user
      ? { name: user.name, address: user.address }
      : { name: "Usuario no disponible", address: "-" };
  };

  const handleStatusChange = (saleOrderId, newStatus) => {
    const updatedStatus = {
      ...status,
      [saleOrderId]: newStatus,
    };
    setStatus(updatedStatus);

    // Guardar el estado en localStorageeee
    localStorage.setItem("saleOrderStatus", JSON.stringify(updatedStatus));
  };

  const getButtonVariant = (status) => {
    switch (status) {
      case "No enviado":
        return "danger";
      case "En preparación":
        return "warning";
      case "Enviado":
        return "info";
      case "Recibido":
        return "success";
      default:
        return "secondary";
    }
  };

  useEffect(() => {
    const fetchSaleOrders = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/SaleOrder/GetSaleOrdersWithLines");
        setSaleOrders(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al cargar las órdenes de venta", error);
        setIsLoading(false);
      }
    };

    fetchSaleOrders();
    const intervalId = setInterval(fetchSaleOrders, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="table-responsive p-3">
      <Table striped bordered hover variant="dark" className="align-middle">
        <thead>
          <tr>
            <th>Nro Orden</th>
            <th>Fecha</th>
            <th>ID Cliente</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Estado envío</th>
          </tr>
        </thead>
        <tbody>
          {saleOrders.map((order) => {
            const userDetails = getUserDetails(order.userId);
            const orderStatus = status[order.saleOrderId] || "No enviado";
            const buttonVariant = getButtonVariant(orderStatus);

            return (
              <React.Fragment key={order.saleOrderId}>
                <tr onClick={() => toggleRow(order.saleOrderId)} style={{ cursor: "pointer" }}>
                  <td>{order.saleOrderId}</td>
                  <td>{formatDate(order.date)}</td>
                  <td>{order.userId}</td>
                  <td>{userDetails.name}</td>
                  <td>{userDetails.address}</td>
                  <td>
                    <DropdownButton
                      id={`dropdown-status-${order.saleOrderId}`}
                      title={orderStatus}
                      variant={buttonVariant}
                      onClick={(e) => e.stopPropagation()}
                      onSelect={(selectedStatus) =>
                        handleStatusChange(order.saleOrderId, selectedStatus)
                      }
                    >
                      <Dropdown.Item eventKey="No enviado">No enviado</Dropdown.Item>
                      <Dropdown.Item eventKey="En preparación">En preparación</Dropdown.Item>
                      <Dropdown.Item eventKey="Enviado">Enviado</Dropdown.Item>
                      <Dropdown.Item eventKey="Recibido">Recibido</Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
                {expandedRows.includes(order.saleOrderId) && (
                  <tr>
                    <td colSpan="6" className="p-0">
                      <div className="bg-secondary p-3">
                        <Table striped bordered hover variant="light" size="sm" className="m-0 align-middle">
                          <thead>
                            <tr>
                              <th>Detalle</th>
                              <th>Cod Producto</th>
                              <th>Nombre producto</th>
                              <th>Cantidad</th>
                              <th>Precio Unitario</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.lines.map((line) => (
                              <tr key={line.saleOrderLineId}>
                                <td>{line.saleOrderLineId}</td>
                                <td>{line.productId}</td>
                                <td>{getProductName(line.productId)}</td>
                                <td>{line.amount}</td>
                                <td>${line.unitPrice}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default SaleOrderTable;
