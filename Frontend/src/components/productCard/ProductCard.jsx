import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import modelIMG from "../../assets/modelIMG.jpg"; // Importar imagen de respaldo
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";

// Destructuring props
const ProductCard = ({
  title,
  text,
  img, // URL de la imagen
  size,
  stock,
  price,
  code,
  product,
}) => {
  return (
    <Card className="card-hover product-card">
      {/* Usa la URL de la imagen del producto o una de respaldo si no existe */}
      <Card.Img variant="top" src={img || modelIMG} />
      <Card.Body className="d-flex flex-column p-3">
        <div>
          <Card.Title className="fs-1 title-card">{title}</Card.Title>
          <Card.Text className="mb-1 body-category">{text}</Card.Text>
          <Card.Text className="mb-1 body-text">Size: {size}</Card.Text>
          <Card.Text className="mb-1 body-text">Stock: {stock}</Card.Text>
          <Card.Text className="mb-3 body-text">Price: ${price}</Card.Text>
          <Link to={`/productos/detalle/${code}`}>
            <button className="btn btn-dark btn-hover btn-full-width">
              Ver producto <FontAwesomeIcon icon={faAnglesRight} />
            </button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;

