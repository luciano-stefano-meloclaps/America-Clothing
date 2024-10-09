import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../productCard/ProductCard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProductFilter from "../productFilter/ProductFilter";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const { category } = useParams(); // Captura la categoría desde la URL
  const [sizeFilter, setSizeFilter] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [showFilters, setShowFilters] = useState(false);

  const handleCloseFilters = () => setShowFilters(false);
  const handleShowFilters = () => setShowFilters(true);

  // Fetch de todos los productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://localhost:7091/api/Product");
        if (Array.isArray(response.data)) {
          setProducts(response.data);
          setFilteredProducts(response.data); // Muestra todos los productos inicialmente
        } else {
          throw new Error("La respuesta no es un array");
        }
      } catch (error) {
        console.error("Disculpe, no se pudieron cargar los productos.", error);
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  // Filtrado de productos basado en la categoría, tamaño y precio
  useEffect(() => {
    let filtered = products;

    // Filtrar por categoría si existe
    if (category) {
      filtered = filtered.filter((product) => product.name === category); // Asegúrate de que `product.category` sea correcto
    }

    // Filtrar por tamaño
    if (sizeFilter.length) {
      filtered = filtered.filter((product) =>
        sizeFilter.includes(product.size)
      );
    }

    // Filtrar por rango de precios
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );

    setFilteredProducts(filtered);
  }, [sizeFilter, priceRange, products, category]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid_container py-5 my-5 bg-dark text-white" id="gridcards">
      <h2 className="my-5 fs-1 color-accent-user font-tile text-center">
        American Clothing{" "}
      </h2>

      <Button variant="secondary" onClick={handleShowFilters}>
        Filtrar
      </Button>

      {/* Offcanvas para mostrar los filtros */}
      <Offcanvas show={showFilters} onHide={handleCloseFilters}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtrar Productos</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ProductFilter
            products={products}
            onSizeChange={setSizeFilter}
            onPriceChange={setPriceRange}
          />
        </Offcanvas.Body>
      </Offcanvas>

      {filteredProducts.length === 0 ? (
        <p>
          No tenemos resultados para tu búsqueda. Por favor, intentá con otros
          filtros.
        </p>
      ) : (
        <Row xs={1} md={4} className="g-5 p-5 m-5 row row-cols-md-4">
          {filteredProducts.map((product) => (
            <Col key={product.code}>
              <ProductCard  
                title={product.name}
                text={product.description}
                img={product.img}
                code={product.code}
                size={product.size}
                stock={product.stock}
                price={product.price}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ProductList;

