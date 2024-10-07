import { useParams, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { useAPI } from "../../services/apiContext/api.context"; // Importa el contexto

const Product = ({ products }) => { 
  const { productId } = useParams();
  const { addToCart } = useAPI(); // Función para agregar al carrito desde el contexto

  // Encontrar el producto usando el ID pasado desde productCard
  const product = products.find((p) => p.code === parseInt(productId));

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const handleAddToCart = () => {
    addToCart(product); // Agrega el producto al carrito
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <p><strong>Talla:</strong> {product.size}</p>
      <p><strong>Descripción:</strong> {product.description}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      
      {/* Botón para agregar al carrito */}
      <button onClick={handleAddToCart}>Agregar al carrito</button>

      {/* Enlace a la página de detalles del producto */}
      <Link to={`/productos/detalle/${product.code}`}>
        <button>Ver detalles</button>
      </Link>
    </div>
  );
};

export default Product;

