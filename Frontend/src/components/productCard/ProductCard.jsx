import Card from "react-bootstrap/Card";

// Destructuring props
const ProductCard = ({ title, text, img, size, stock, price }) => {
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
          <Card.Text>Size: {size}</Card.Text> {/* Añadido */}
          <Card.Text>Stock: {stock}</Card.Text> {/* Añadido */}
          <Card.Text>Price: ${price}</Card.Text> {/* Añadido */}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
