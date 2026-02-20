import React from "react";
import { Container, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./Testimonials.css";

const testimonials = [
  {
    name: "Valentina R.",
    initials: "VR",
    text: "Encontré una campera Levi's de los 90's en perfecto estado. Increíble calidad y el envío fue súper rápido a Rosario.",
    rating: 5,
  },
  {
    name: "Martín G.",
    initials: "MG",
    text: "La atención por WhatsApp es excelente. Me ayudaron a elegir el talle perfecto midiendo las prendas en vivo. ¡Genios!",
    rating: 5,
  },
  {
    name: "Camila S.",
    initials: "CS",
    text: "Cada prenda que compré tiene una historia única. Es mi tienda favorita de ropa vintage, siempre encuentro joyitas.",
    rating: 5,
  },
  {
    name: "Lucas P.",
    initials: "LP",
    text: "Las cuotas sin interés me re ayudaron. Compré tres prendas y las pagué cómodamente. La calidad es superior.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials-wrapper">
      <Container className="testimonials-section">
        <h1 className="text-center mb-5 text-uppercase">Lo que dicen nuestros clientes</h1>
        <Carousel indicators={true} className="testimonials-carousel" interval={5000} fade>
          {testimonials.map((t, index) => (
            <Carousel.Item key={index}>
              <div className="testimonial-card text-center">
                <div className="avatar-circle mx-auto mb-4">
                  <span>{t.initials}</span>
                </div>
                <div className="stars-container mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="star-icon" />
                  ))}
                </div>
                <p className="testimonial-quote mb-4">"{t.text}"</p>
                <h5 className="testimonial-author">— {t.name}</h5>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

export default Testimonials;
