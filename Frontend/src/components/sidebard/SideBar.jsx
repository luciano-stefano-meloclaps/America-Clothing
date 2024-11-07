import React from "react";
import { Nav } from "react-bootstrap";

const Sidebar = ({ setView, userRole }) => {
  return (
    <Nav className="col-md-12 p-0 m-0 d-none d-md-block bg-secondary rounded min-vh-100 sidebar">
      <div className="sidebar-sticky"></div>
      {userRole === "admin" && (
        <>
          <Nav.Item>
            <Nav.Link
              href="#dashboard"
              className="text-white"
              onClick={() => setView("users")}
            >
              Usuarios
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="#products"
              className="text-white"
              onClick={() => setView("products")}
            >
              Productos
            </Nav.Link>
          </Nav.Item>
        </>
      )}
      {userRole === "employee" && (
        <>
          <Nav.Item>
            <Nav.Link
              href="#products"
              className="text-white"
              onClick={() => setView("products")}
            >
              Productos
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="#sales"
              className="text-white"
              onClick={() => setView("sales")}
            >
              Ventas
            </Nav.Link>
          </Nav.Item>
        </>
      )}
    </Nav>
  );
};

export default Sidebar;
