import React from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserShield,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../sidebard/SideBar";

const Dashboard = () => {
  return (
    <div className="min-vh-100 bg-dark d-flex flex-column">
      <Container fluid className="flex-grow-1">
        <Row className="h-100">
          <Col md={2}>
            <Sidebar /> {/* Barrra lateral*/}
          </Col>
          <Col md={10} className="mt-3">
            <h1 className="text-info mb-5">Dashboard</h1>
            <Row className="text-info pt-5">
              {" "}
              {/* Productos */}
              <Col md={4}>
                <Card bg="secondary" text="white" className="mb-3">
                  <Card.Body>
                    <Card.Title>Card Title 1</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content[^1^][1][^2^][2].
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card bg="secondary" text="white" className="mb-3">
                  <Card.Body>
                    <Card.Title>Card Title 2</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content[^1^][1][^2^][2].
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card bg="secondary" text="white" className="mb-3">
                  <Card.Body>
                    <Card.Title>Card Title 3</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content[^1^][1][^2^][2].
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="text-info pt-5">
              <Col>
                <h2 className="text-info mb-4">Usuarios</h2> {/* Usuarios */}
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
                    <tr>
                      <td>1</td>
                      <td>001</td>
                      <td>Juan</td>
                      <td>Pérez</td>
                      <td>juan.perez@example.com</td>
                      <td>
                        <FontAwesomeIcon icon={faUserShield} /> Admin
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>002</td>
                      <td>María</td>
                      <td>López</td>
                      <td>maria.lopez@example.com</td>
                      <td>
                        <FontAwesomeIcon icon={faUser} /> Usuario
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>003</td>
                      <td>Carlos</td>
                      <td>García</td>
                      <td>carlos.garcia@example.com</td>
                      <td>
                        <FontAwesomeIcon icon={faUserTie} /> Vendedor
                      </td>
                    </tr>
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
