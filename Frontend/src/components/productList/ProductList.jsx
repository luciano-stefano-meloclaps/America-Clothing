import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../productCard/ProductCard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://localhost:7091/api/Product");
        console.log("Respuesta de la API:", response);
        if (Array.isArray(response.data)) {
          setProducts(response.data);
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

  useEffect(() => {
    console.log(products);
  }, [products]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid_container py-5 my-5 bg-dark text-white" id="gridcards">
      <h2 className="my-5 fs-1 color-accent-user font-tile text-center">
        Nuestra tienda{" "}
      </h2>
      <Row xs={1} md={4} className="g-5  p-5 m-5 row row-cols-md-4">
        {products.map((product) => (
          <Col key={product.code}>
            <ProductCard
              title={product.name}
              text={product.description}
              img={product.img}
              code={product.code}
              size={product.size} // Añadido
              stock={product.stock} // Añadido
              price={product.price} // Añadido
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;