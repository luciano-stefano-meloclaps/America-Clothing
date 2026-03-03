import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../productCard/ProductCard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProductFilter from "../productFilter/ProductFilter";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearchMinus, faBoxOpen, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import "./ProductList.css";

  const ProductList = ({ products = [] }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [error, setError] = useState(null);
  
  const [categoryFilter, setCategoryFilter] = useState(category || "");
  const [sizeFilter, setSizeFilter] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [showFilters, setShowFilters] = useState(false);

  const handleCloseFilters = () => setShowFilters(false);
  const handleShowFilters = () => setShowFilters(true);

  // FIX: Sync internal state with URL parameter when it changes (expert fix)
  useEffect(() => {
    setCategoryFilter(category || "");
    setCurrentPage(1);
    handleCloseFilters(); // Close filters if they are open
  }, [category]);

  const handleCategoryUpdate = (newCategory) => {
    setCategoryFilter(newCategory);
    setCurrentPage(1);
  };

  const handleSizeChange = (newSize) => {
    setSizeFilter(newSize);
    setCurrentPage(1); // Explicit reset on user interaction
  };

  const handlePriceChange = (newPrice) => {
    setPriceRange(newPrice);
    setCurrentPage(1); // Explicit reset on user interaction
  };

  // REMOVED: fetchProducts and its useEffect. 
  // Data is now passed via props from App.jsx (Single Source of Truth)

  useEffect(() => {
    // Filter active products from props first
    let filtered = products.filter(p => p.state === 1);

    // Usamos el filtro de categoría interno, o el de la URL si el interno está vacío
    const activeCategory = categoryFilter || category;

    if (activeCategory) {
      filtered = filtered.filter((product) => product.category === activeCategory);
    }

    if (sizeFilter.length) {
      filtered = filtered.filter((product) =>
        sizeFilter.includes(product.size)
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );

    setFilteredProducts(filtered);
  }, [sizeFilter, priceRange, products, category, categoryFilter]);

  // ARCHITECTURAL FIX: Removed implicit useEffect reset.
  // Pagination now only resets in the explicit handlers above.

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className="grid_container min-vh-100 py-5 text-light bg-dark"
      id="gridcards"
    >
      <Container>
        <div className="product-list-header mt-4">
          {category && (
            <div className="back-btn-container">
              <Button 
                variant="link" 
                onClick={() => navigate("/")} 
                className="back-button-custom"
              >
                <FontAwesomeIcon icon={faArrowLeft} /> Volver a Inicio
              </Button>
            </div>
          )}
          
          <h1 className="color-accent-user font-tile text-center mb-4">
            American Clothing
          </h1>

          <Button
            variant="light"
            size="lg"
            className="px-4 py-2"
            onClick={handleShowFilters}
            style={{ borderRadius: '50px', fontWeight: '600' }}
          >
            Filtrar <FontAwesomeIcon icon={faFilter} className="ms-2" />
          </Button>
        </div>

        <Offcanvas show={showFilters} onHide={handleCloseFilters}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filtrar Productos</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ProductFilter
              products={products}
              onSizeChange={handleSizeChange}
              onPriceChange={handlePriceChange}
              onCategoryChange={handleCategoryUpdate}
              currentCategory={categoryFilter}
            />
          </Offcanvas.Body>
        </Offcanvas>

        {filteredProducts.length === 0 ? (
          <div className="empty-state-container">
            <FontAwesomeIcon icon={faBoxOpen} className="empty-state-icon" />
            {category || categoryFilter ? (
              <>
                <h2 className="empty-state-title">Catálogo en Preparación</h2>
                <p className="empty-state-text">
                  Estamos seleccionando las mejores joyas vintage para esta categoría. 
                  Vuelve pronto para descubrir prendas únicas con historia.
                </p>
              </>
            ) : (
              <>
                <h2 className="empty-state-title">Sin Disponibilidad</h2>
                <p className="empty-state-text">
                  No hemos encontrado tesoros que coincidan con tus filtros actuales. 
                  Intenta ajustando el talle o el rango de precio para explorar más opciones.
                </p>
              </>
            )}
          </div>
        ) : (
          <>
            <Row xs={1} md={2} lg={4} className="g-5 p-5 m-5">
              {currentProducts.map((product) => (
                <Col key={product.code}>
                  <ProductCard
                    title={product.name}
                    text={product.description}
                    img={product.image}
                    code={product.code}
                    size={product.size}
                    stock={product.stock}
                    price={product.price}
                  />
                </Col>
              ))}
            </Row>
            <div className="d-flex justify-content-center mt-3">
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index + 1}
                  variant="link"
                  className={`mx-1 pagination-btn-custom ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                  style={{ textDecoration: 'none' }}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default ProductList;