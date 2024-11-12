import React, { useState, useContext } from "react";
import { Table, DropdownButton, Dropdown } from "react-bootstrap";
import { useAPI } from "../../services/apiContext/api.context";

const SaleOrderTable = ({ saleOrders }) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const { products, users } = useAPI();
  const [status, setStatus] = useState({});

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
    setStatus((prevStatus) => ({
      ...prevStatus,
      [saleOrderId]: newStatus,
    }));
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

  return (
    <div>
      <h2 className="text-info mb-4">Órdenes de Venta</h2>
      <Table striped bordered hover variant="dark">
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
                <tr onClick={() => toggleRow(order.saleOrderId)}>
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
                      <Dropdown.Item eventKey="No enviado">
                        No enviado
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="En preparación">
                        En preparación
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Enviado">Enviado</Dropdown.Item>
                      <Dropdown.Item eventKey="Recibido">
                        Recibido
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
                {expandedRows.includes(order.saleOrderId) && (
                  <tr>
                    <td colSpan="6">
                      <Table
                        striped
                        bordered
                        hover
                        variant="secondary"
                        size="sm"
                      >
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
                              <td>{line.unitPrice}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
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
