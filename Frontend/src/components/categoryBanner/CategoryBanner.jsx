import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CategoryBanner.css";

const categories = [
  { name: "Camperas", image: "https://images.pexels.com/photos/16170664/pexels-photo-16170664/free-photo-of-manos-chaqueta-denim-vaquero.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", path: "/productos/Camperas" },
  { name: "Jeans", image: "https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", path: "/productos/Jeans" },
  { name: "Buzos", image: "https://images.pexels.com/photos/702350/pexels-photo-702350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", path: "/productos/Buzos" },
  { name: "Camisas", image: "https://images.pexels.com/photos/769749/pexels-photo-769749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", path: "/productos/Camisas" },
  { name: "Bermudas", image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", path: "/productos/Bermudas" },
  { name: "Vestidos", image: "https://images.pexels.com/photos/19090602/pexels-photo-19090602/free-photo-of-vintage-boutique.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", path: "/productos/Vestidos" },
];

const CategoryBanner = () => {
  return (
    <div className="category-wrapper">
      <Container className="category-section">
        <h1 className="text-center mb-5 text-uppercase">Nuestras Categorías</h1>
        <Row className="g-4">
          {categories.map((cat, index) => (
            <Col key={index} lg={4} md={6} xs={12}>
              <Link to={cat.path} className="category-card-link">
                <div className="category-card">
                  <div className="category-image-container">
                    <img src={cat.image} alt={cat.name} className="category-img" />
                    <div className="category-overlay">
                      <h2 className="category-name">{cat.name}</h2>
                      <span className="category-btn">VER MÁS</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CategoryBanner;
