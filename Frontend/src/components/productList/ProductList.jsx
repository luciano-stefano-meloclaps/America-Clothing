import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../productCard/ProductCard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProductFilter from "../productFilter/ProductFilter";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

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
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://localhost:7091/api/Product");
      if (Array.isArray(response.data)) {
        const availableProducts = response.data.filter(
          (product) => product.state === 1
        );
        setProducts(availableProducts);
        setFilteredProducts(availableProducts);
      } else {
        throw new Error("La respuesta no es un array");
      }
    } catch (error) {
      console.error("Disculpe, no se pudieron cargar los productos.", error);
      setError(error.message);
    }
  };

  // Polling para actualizar productos automáticamente cada 5 segundos
  useEffect(() => {
    fetchProducts(); // Llamar a fetchProducts inmediatamente al montar el componente

    const intervalId = setInterval(fetchProducts, 5000); // Polling cada 5 segundos

    return () => clearInterval(intervalId); // Limpiar intervalo al desmontar el componente
  }, []);

  // Filtrado de productos basado en la categoría, tamaño y precio
  useEffect(() => {
    let filtered = products;

    // Filtrar por categoría si existe
    if (category) {
      filtered = filtered.filter((product) => product.category === category); // Asegúrate de que `product.category` sea correcto
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
    <div
      className="grid_container min-vh-100 py-5 text-light  bg-dark"
      id="gridcards"
    >
      <h1 className="my-5 color-accent-user font-tile text-center">
        American Clothing{" "}
      </h1>

      <Button
        variant="light"
        size="lg"
        className="px-3"
        onClick={handleShowFilters}
      >
        Filtrar <FontAwesomeIcon icon={faFilter} className="ms-2" />
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

      {/* Condición para mostrar mensajes según la disponibilidad de productos */}
      {products.length === 0 ? (
        <p className="mt-4">No hay productos disponibles en este momento.</p>
      ) : filteredProducts.length === 0 ? (
        <p className="mt-4">
          No tenemos resultados para tu búsqueda. Por favor, intentá con otros
          filtros.
        </p>
      ) : (
        <Row xs={1} md={3} className="g-5 p-5 m-5 row row-cols-md-3">
          {filteredProducts.map((product) => (
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
      )}
    </div>
  );
};

export default ProductList;
