import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "../sidebard/SideBar";

const Dashboard = () => {
  return (
    <div className="min-vh-100 bg-dark d-flex flex-column">
      <Container fluid className="flex-grow-1">
        <Row className="h-100">
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col md={10} className="mt-3">
            <h1 className="text-info mb-5">Dashboard</h1>
            <Row className="text-info pt-5 ">
              <Col>
                <Card bg="secondary" text="white" className="mb-3">
                  <Card.Body>
                    <Card.Title>Card Title 1</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title
                      and[^1^][1][^2^][2] make up the bulk of the card's
                      content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card bg="secondary" text="white" className="mb-3">
                  <Card.Body>
                    <Card.Title>Card Title 2</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title
                      and[^1^][1][^2^][2] make up the bulk of the card's
                      content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card bg="secondary" text="white" className="mb-3">
                  <Card.Body>
                    <Card.Title>Card Title 3</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title
                      and[^1^][1][^2^][2] make up the bulk of the card's
                      content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
