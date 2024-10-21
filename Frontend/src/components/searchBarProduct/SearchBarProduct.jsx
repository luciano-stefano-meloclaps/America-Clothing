import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const SearchBarProduct = ({ onSearch, onClear }) => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

  const handleSearch = () => {
    onSearch({ name, size, type, price });
  };

  const handleClear = () => {
    setName("");
    setSize("");
    setType("");
    setPrice("");
    onClear(); // Resetea los filtros en el componente padre
  };

  return (
    <Form className="mb-4">
      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            as="select"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">Filtrar por talla</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </Form.Control>
        </Col>
        <Col>
          <Form.Control
            as="select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Filtrar por tipo</option>
            <option value="Camperas">Camperas</option>
            <option value="Jeans">Jeans</option>
            <option value="Buzos">Buzos</option>
            <option value="Camisas">Camisas</option>
            <option value="Bermudas">Bermudas</option>
          </Form.Control>
        </Col>
        <Col>
          <Form.Control
            type="number"
            placeholder="Filtrar por precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Col>
        <Col>
          <Button variant="primary" onClick={handleSearch}>
            Buscar
          </Button>
        </Col>
        <Col>
          <Button variant="secondary" onClick={handleClear}>
            Limpiar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBarProduct;
