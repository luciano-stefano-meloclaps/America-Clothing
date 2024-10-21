import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const SearchBarUser = ({ onSearch, onClear }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSearch = () => {
    onSearch({ name, lastName, email });
  };

  const handleClear = () => {
    setName("");
    setLastName("");
    setEmail("");
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
            type="text"
            placeholder="Buscar por apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            type="email"
            placeholder="Buscar por email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

export default SearchBarUser;
