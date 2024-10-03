// Hero.js

import { Container, Row, Col } from "react-bootstrap";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero p-0">
      <Container fluid>
        <Row
          className="d-flex p-0 align-items-center"
          style={{ height: "100vh" }}
        >
          <Col className="d-flex p-0 align-items-center justify-content-center">
            <div className="hero-image p-0 m-0">
              <img
                src="src\assets\pexels-rachel-claire-5490198.jpg"
                alt="Imagen del Hero"
                style={{
                  width: "100%",
                  height: "100vh",
                  opacity: 0.9,
                }}
              />
              <div className="hero-overlay">
                <h1>American Clothing</h1>
                <p>Donde la moda se encuentra con la nostalgia</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;
