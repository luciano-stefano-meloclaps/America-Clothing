import React, { useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Sidebar from "../sidebard/SideBar";
import { useAPI } from "../../services/apiContext/api.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserShield, faUserTie } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const { users, products } = useAPI(); // Obtenemos usuarios y productos del contexto
  const [view, setView] = useState("users"); // Estado para controlar la vista del admin (usuarios o productos, elige desde sidebar)


  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <FontAwesomeIcon icon={faUserShield} />;
      case "client":
        return <FontAwesomeIcon icon={faUser} />;
      case "seller":
        return <FontAwesomeIcon icon={faUserTie} />;
      default:
        return null;
    }
  };


  // Tabla usuarios
  const renderUsersTable = () => (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Rol</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>
              {getRoleIcon(user.usertype)} {user.role}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  // Tabla productos
  const renderProductsTable = () => (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Cod Barra</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={product.code}>
            <td>{index + 1}</td>
            <td>{product.code}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>${product.price}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <div className="min-vh-100 bg-dark d-flex flex-column">
      <Container fluid className="flex-grow-1">
        <Row className="h-100">
          <Col md={2}>
            <Sidebar setView={setView} /> {/* Pasamos setView al Sidebar */}
          </Col>
          <Col md={10} className="mt-3">
            <h1 className="text-info mb-5">Panel de Control</h1>
            <Row className="text-info pt-5">
              {/* Aca hace el renderizado dependiendo que eligio el admin  */}
              {view === "users" && (
                <>
                  <h2 className="text-info mb-4">Usuarios</h2>
                  {renderUsersTable()}
                </>
              )}
              {view === "products" && (
                <>
                  <h2 className="text-info mb-4">Productos</h2>
                  {renderProductsTable()}
                </>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;

