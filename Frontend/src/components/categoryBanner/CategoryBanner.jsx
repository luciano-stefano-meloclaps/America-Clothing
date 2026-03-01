import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CategoryBanner.css";

const categories = [
  { name: "Camperas", image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003417198-56d89892e497ed94b217590974469099-1024-1024.webp", path: "/productos/Camperas" },
  { name: "Jeans", image: "https://http2.mlstatic.com/D_NQ_NP_2X_870011-MLA107597022863_022026-F.webp", path: "/productos/Jeans" },
  { name: "Buzos", image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1004021579-267741caffd62de6d917695450905292-1024-1024.webp", path: "/productos/Buzos" },
  { name: "Camisas", image: "https://http2.mlstatic.com/D_NQ_NP_2X_943981-CBT107541321145_022026-F.webp", path: "/productos/Camisas" },
  { name: "Shorts", image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003860312-fc9e44b8aa35a9ecdc17668792780243-1024-1024.webp", path: "/productos/Shorts" },
  { name: "Vestidos", image: "https://http2.mlstatic.com/D_NQ_NP_2X_897254-MLA105856817222_022026-F.webp", path: "/productos/Vestidos" },
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
