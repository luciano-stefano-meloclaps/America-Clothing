import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../sidebard/SideBar";
import { useAPI } from "../../services/apiContext/api.context";
import UserTable from "../../userTable/UserTable";
import ProductTable from "../productTable/ProductTable";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { users, products } = useAPI();
  const { userRole } = useAuth();
  const [view, setView] = useState("users");
 // console.log("UserType:", userRole);
  return (
    <div className="min-vh-100 bg-dark d-flex flex-column">
      <Container fluid className="flex-grow-1">
        <Row className="h-100">
          <Col md={2}>
            {/* Paso userRole para quie sideBar sepa quien es  */}
            <Sidebar setView={setView} userRole={userRole} />
          </Col>
          <Col md={10} className="mt-3">
            <h1 className="text-info mb-5">Panel de Control</h1>
            {userRole === "admin" || userRole === "employee" ? (
              view === "users" ? (
                <UserTable users={users} />
              ) : (
                <ProductTable products={products} />
              )
            ) : userRole === "employee" ? (
              <div className="text-light">
                <p>Hola, soy vendedor</p>
              </div>
            ) : (
              <p className="text-danger">No tienes acceso a este contenido.</p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;

