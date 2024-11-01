import React, { useState } from "react";
import { Table, Alert, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SearchBarProduct from "../searchBarProduct/SearchBarProduct";

const ProductTable = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const navigate = useNavigate();

  const onClickAddProduct = () => {
    navigate("/add-product");
  };

  const handleUpdateClick = (product) => {
    navigate("/update-product", { state: { product } }); // Pasar el producto como estado
  };

  const handleSearch = (filters) => {
    const { name, size, type, price } = filters;
    const filtered = products.filter((product) => {
      return (
        (!name || product.name.toLowerCase().includes(name.toLowerCase())) &&
        (!size || product.size === size) &&
        (!type || product.category === type) &&
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
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Talla</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Vendido</th>
                <th>Modificar</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => (
                <tr key={`${product.code}-${index}`}>
                  <td>{indexOfFirstProduct + index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.size}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    {product.state === 1 ? "Habilitado" : "Deshabilitado"}
                  </td>
                  <td>{product.sold ? "Vendido" : "No vendido"}</td>
                  <td>
                    <i
                      className="fa fa-pencil"
                      aria-hidden="true"
                      onClick={() => handleUpdateClick(product)}
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
        </>
      )}
    </div>
  );
};

export default ProductTable;
