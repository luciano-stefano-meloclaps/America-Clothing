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
      <Card.Img variant="top" src={img || modelIMG} className="card-img-top" />
      <Card.Body className="d-flex flex-column p-3">
        <div className="d-flex flex-column h-100">
          <Card.Title className="title-card">{title}</Card.Title>
          <Card.Text className="body-category">{text}</Card.Text>
          
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-2">
               <Card.Text className="body-text">Talle: {size}</Card.Text>
               <Card.Text className="body-text font-weight-bold" style={{fontSize: '1.1rem'}}>${price}</Card.Text>
            </div>
            
            <Link to={`/productos/detalle/${code}`} style={{ textDecoration: 'none' }}>
              <button className="btn btn-dark btn-hover btn-full-width">
                VER DETALLE <FontAwesomeIcon icon={faAnglesRight} className="ms-2" />
              </button>
            </Link>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;

