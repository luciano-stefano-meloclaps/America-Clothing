import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../sidebard/SideBar";
import { useAPI } from "../../services/apiContext/api.context";
import UserTable from "../../userTable/UserTable";
import ProductTable from "../productTable/ProductTable";

const Dashboard = () => {
  const { users, products } = useAPI();
  const [view, setView] = useState("users");

  return (
    <div className="min-vh-100 bg-dark d-flex flex-column">
      <Container fluid className="flex-grow-1">
        <Row className="h-100">
          <Col md={2}>
            <Sidebar setView={setView} />
          </Col>
          <Col md={10} className="mt-3">
            <h1 className="text-info mb-5">Panel de Control</h1>
            {view === "users" ? (
              <UserTable users={users} />
            ) : (
              <ProductTable products={products} />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
