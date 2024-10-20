import React, { useState } from "react";
import { Table, Alert, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchBarProduct from "../searchBarProduct/SearchBarProduct";

const ProductTable = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const productsPerPage = 10;

  const navigate = useNavigate(); // Inicializa navigate aquí

  const onClickAddProduct = () => {
    navigate("/add-product"); // Redirige al componente de añadir producto
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProductToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      try {
        const response = await axios.delete(
          `https://localhost:7091/api/Product/${productToDelete.code}`
        );
        console.log(response.data);
        setFilteredProducts((prev) =>
          prev.filter((product) => product.code !== productToDelete.code)
        );
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      } finally {
        handleCloseModal();
      }
    }
  };

  const handleSearch = (filters) => {
    const { name, size, type, price } = filters;
    const filtered = products.filter((product) => {
      return (
        (!name || product.name.toLowerCase().includes(name.toLowerCase())) &&
        (!size || product.size === size) &&
        (!type || product.name === type) &&
        (!price || product.price <= price)
      );
    });
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setFilteredProducts(products);
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentStart = indexOfFirstProduct + 1;
  const currentEnd = Math.min(indexOfLastProduct, filteredProducts.length);

  return (
    <div>
      <h2 className="text-info mb-5">Productos</h2>
      <Button variant="primary" onClick={onClickAddProduct}>
        Añadir Producto
      </Button>

      <SearchBarProduct onSearch={handleSearch} onClear={handleClear} />
      {currentProducts.length === 0 ? (
        <Alert variant="info" className="text-center">
          <h4>No tenemos resultados para tu búsqueda.</h4>
          <p>Por favor, intentá con otros filtros.</p>
        </Alert>
      ) : (
        <>
          <h5 className="text-info">
            Mostrando productos del {currentStart} al {currentEnd} &nbsp; &nbsp;
            Total: {filteredProducts.length}
          </h5>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Cod Barra</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Talla</th>
                <th>Precio</th>
                <th>Modificar</th>
                <th>Borrar</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => (
                <tr key={product.code}>
                  <td>{indexOfFirstProduct + index + 1}</td>
                  <td>{product.code}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.size}</td>
                  <td>${product.price}</td>
                  <td>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </td>
                  <td>
                    <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      onClick={() => handleDeleteClick(product)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-center mt-3">
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                variant={
                  currentPage === index + 1 ? "primary" : "outline-primary"
                }
                onClick={() => setCurrentPage(index + 1)}
                className="mx-1"
              >
                {index + 1}
              </Button>
            ))}
          </div>
          {/* Modal de confirmación */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Eliminar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              ¿Está seguro que desea eliminar el producto{" "}
              <strong>{productToDelete?.name}</strong>?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark" onClick={handleCloseModal}>
                Cerrar
              </Button>
              <Button variant="danger" onClick={handleConfirmDelete}>
                Confirmar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default ProductTable;
