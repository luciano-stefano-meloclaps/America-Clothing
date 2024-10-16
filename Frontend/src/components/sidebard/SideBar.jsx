import React from "react";
import { Nav } from "react-bootstrap";

const Sidebar = () => {
  return (
    <Nav className="col-md-12 p-0 m-0 d-none d-md-block bg-secondary rounded min-vh-100 sidebar">
      <div className="sidebar-sticky"></div>
      <Nav.Item>
        <Nav.Link href="#dashboard" className="text-white">
          Dashboard
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#orders" className="text-white">
          Orders
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#products" className="text-white">
          Products
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Sidebar;
