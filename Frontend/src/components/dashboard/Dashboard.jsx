import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../sidebard/SideBar";
import { useAPI } from "../../services/apiContext/api.context";
import ProductTable from "../productTable/ProductTable";
import SaleOrderTable from "../SaleOrder/SaleOrderTable";
import UserListView from "../userListView/UserListView";
import { useAuth } from "../../context/AuthContext";

import { faUsers, faShirt, faBoxesStacked } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Dashboard.css";

const Dashboard = () => {
  const { users, products, saleOrders } = useAPI();
  const { userRole } = useAuth();
  const [view, setView] = useState(userRole?.toLowerCase() === "admin" ? "users" : "products");

  const stats = [
    { label: "Usuarios", value: users.length, icon: <FontAwesomeIcon icon={faUsers} />, color: "#0dcaf0" },
    { label: "Productos", value: products.length, icon: <FontAwesomeIcon icon={faShirt} />, color: "#198754" },
    { label: "Órdenes", value: saleOrders.length, icon: <FontAwesomeIcon icon={faBoxesStacked} />, color: "#ffc107" },
  ];

  return (
    <div className="dashboard-wrapper">
      <Container fluid="lg">
        <Row>
          <Col lg={2} xl={2}>
            <div className="dashboard-sidebar-container">
              <Sidebar setView={setView} userRole={userRole} currentView={view} />
            </div>
          </Col>
          
          <Col lg={10} xl={10} className="dashboard-main-content">
            <h1 className="dashboard-title">Panel de Control</h1>
            
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-header">
                    <span className="stat-label">{stat.label}</span>
                    <span className="stat-icon">{stat.icon}</span>
                  </div>
                  <div className="stat-value">{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="management-card">
              <div className="management-header">
                <h2>{view === "users" ? "Usuarios" : view === "products" ? "Gestión de Inventario" : view === "sales" ? "Órdenes de Venta" : ""}</h2>
              </div>
              <div className="management-body">
                {userRole?.toLowerCase() === "admin" ? (
                  <>
                    {view === "users" && <UserListView users={users} />}
                    {view === "products" && <ProductTable products={products} />}
                    {view === "sales" && <SaleOrderTable saleOrders={saleOrders} />}
                  </>
                ) : userRole?.toLowerCase() === "employee" ? (
                  <>
                    {view === "users" && <div className="p-5 text-center"><p className="text-info">Selecciona una opción del menú para comenzar.</p></div>}
                    {view === "products" && <ProductTable products={products} />}
                    {view === "sales" && <SaleOrderTable saleOrders={saleOrders} />}
                  </>
                ) : (
                  <div className="p-5 text-center">
                    <p className="text-danger fw-bold">No tienes acceso a este contenido.</p>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Dashboard;
