import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

//Destructuring props
const ProductCard = ({ title, text, img, code, deleteProduct }) => {
  return (
    <Card
      style={{
        width: "25rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "burlywood",
        height: "100%",
      }}
    >
      <Card.Img variant="top" src={img} />
      <Card.Body style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <Card.Title>{title}</Card.Title>
          <Card.Text style={{ marginBottom: "1rem" }}>{text}</Card.Text>
        </div>
        <div style={{ marginTop: "auto" }}>
          <Button onClick={() => deleteProduct(code)} variant="dark">
            Eliminar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
