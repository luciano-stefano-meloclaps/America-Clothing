import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../productCard/ProductCard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const mockProducts = [
  //Data JSON
  {
    code: "001",
    title: "Producto 1",
    text: "Descripción del producto 1",
    img: "https://via.placeholder.com/150",
  },
  {
    code: "002",
    title: "Producto 2",
    text: "Descripción del producto 2",
    img: "https://via.placeholder.com/150",
  },
];

const ProductList = () => {
  //Al usar la data posta usar cambiar mockProducts por []
  const [products, setProducts] = useState(mockProducts);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://localhost:7091/api/Product");
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          throw new Error("La respuesta no es un array");
        }
      } catch (error) {
        console.error("Disculpe, no se puedieron cargar los productos.", error);
        setError(error.message);
      }
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (code) => {
    try {
      await axios.delete(`https://localhost:7091/api/Products?code=${code}`);
      setProducts(products.filter((product) => product.code !== code));
    } catch (error) {
      console.error("Disculpe, no se pudo eliminar el producto:", error);
      setError(error.message);
    }
  };

  if (error) {
    //Muestra el error si ocurre
    return <div>Error: {error}</div>;
  }

  return (
    //Pasar props
    <div className="grid_container py-5 my-5 bg-dark" id="gridcards">
      <h2 className="my-5 fs-1 color-accent-user font-tile text-center">
        Nuestra tienda{" "}
      </h2>
      <Row xs={1} md={4} className="g-5  p-5 m-5 row row-cols-md-4">
        {products.map((product, id) => (
          <Col key={id}>
            <ProductCard
              key={product.code}
              title={product.title}
              text={product.text}
              img={product.img}
              code={product.code}
              deleteProduct={deleteProduct}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
