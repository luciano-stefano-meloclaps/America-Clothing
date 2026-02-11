import React from "react";
import { Nav } from "react-bootstrap";

import { faUsers, faShirt, faBoxesStacked } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./SideBar.css";

const Sidebar = ({ setView, userRole }) => {
  return (
    <Nav className="flex-column sidebar-nav mt-4">
      <div className="sidebar-sticky"></div>
      {userRole === "admin" && (
        <>
          <Nav.Item>
            <Nav.Link
              className="sidebar-link"
              onClick={() => setView("users")}
            >
              <FontAwesomeIcon icon={faUsers} className="me-2" /> Usuarios
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="sidebar-link"
              onClick={() => setView("products")}
            >
              <FontAwesomeIcon icon={faShirt} className="me-2" /> Productos
            </Nav.Link>
          </Nav.Item>
        </>
      )}
      {userRole === "employee" && (
        <>
          <Nav.Item>
            <Nav.Link
              className="sidebar-link"
              onClick={() => setView("products")}
            >
              <FontAwesomeIcon icon={faShirt} className="me-2" /> Productos
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="sidebar-link"
              onClick={() => setView("sales")}
            >
              <FontAwesomeIcon icon={faBoxesStacked} className="me-2" /> Ventas
            </Nav.Link>
          </Nav.Item>
        </>
      )}
    </Nav>

  );
};

export default Sidebar;
