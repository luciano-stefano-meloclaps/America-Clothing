import React from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserShield, faUserTie } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../sidebard/SideBar";
import { useAPI } from "../../services/apiContext/api.context";

const Dashboard = () => {
  const { users, isLoading } = useAPI(); // Accede a los usuarios y el estado de carga

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <FontAwesomeIcon icon={faUserShield} />;
      case 'client':
        return <FontAwesomeIcon icon={faUser} />;
      case 'seller':
        return <FontAwesomeIcon icon={faUserTie} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return <p>Cargando...</p>; // Indicador de carga
  }

  return (
    <div className="min-vh-100 bg-dark d-flex flex-column">
      <Container fluid className="flex-grow-1">
        <Row className="h-100">
          <Col md={2}>
            <Sidebar /> {/* Barra lateral */}
          </Col>
          <Col md={10} className="mt-3">
            <h1 className="text-info mb-5">Panel de Control</h1>

            <Row className="text-info pt-5">
              <Col>
                <h2 className="text-info mb-4">Usuarios</h2>
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
                        <td>{getRoleIcon(user.usertype)} {user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
