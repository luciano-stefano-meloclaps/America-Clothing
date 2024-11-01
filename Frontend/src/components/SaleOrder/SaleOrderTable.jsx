import React from "react";
import { Table } from "react-bootstrap";

const SaleOrderTable = ({ saleOrders }) => {
  return (
    <div>
      <h2 className="text-info mb-4">Órdenes de Venta</h2>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID de Orden</th>
            <th>Fecha</th>
            <th>ID de Cliente</th>
          </tr>
        </thead>
        <tbody>
          {saleOrders.map((order) => (
            <React.Fragment key={order.saleOrderId}>
              <tr>
                <td>{order.saleOrderId}</td>
                <td>{order.date}</td>
                <td>{order.userId}</td>
              </tr>
              <tr>
                <td colSpan="3">
                  <Table striped bordered hover variant="secondary" size="sm">
                    <thead>
                      <tr>
                        <th>ID de Línea</th>
                        <th>Código de Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.lines.map((line) => (
                        <tr key={line.saleOrderLineId}>
                          <td>{line.saleOrderLineId}</td>
                          <td>{line.productId}</td>
                          <td>{line.amount}</td>
                          <td>{line.unitPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SaleOrderTable;
