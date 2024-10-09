import { useAPI } from "../../services/apiContext/api.context"; // Importa el contexto
import { Button, Table, Image, Badge } from "react-bootstrap";

const Cart = () => {
  const { cart, removeFromCart } = useAPI(); // Obtén el carrito y la función para eliminar

  return (
    <div className="bg-dark d-flex flex-column justify-content-center align-items-center w-100 min-vh-100">
      {cart.length > 0 ? (
        <Table striped hover responsive="sm" className="bg-white text-center" style={{ width: '100vw' }}>
          <thead className="bg-light">
            <tr>
              <th>Producto</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product) => (
              <tr key={product.code}>
                <td>
                  <div className="d-flex align-items-center">
                    <Image
                      src={product.image} // Hay que agregar en la bd Image para poder guardar y mostrar
                      roundedCircle
                      style={{ width: '45px', height: '45px' }}
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{product.name}</p>
                    </div>
                  </div>
                </td>
                <td>{product.description}</td>
                <td>
                  <Badge bg="primary" className="rounded-pill">
                    {product.quantity}
                  </Badge>
                </td>
                <td>${product.price}</td>
                <td>${product.price * product.quantity}</td>
                <td>
                  <Button variant="danger" size="sm" className="btn-rounded" onClick={() => removeFromCart(product.code)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4">Total</td>
              <td colSpan="2">
                <b>${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</b>
              </td>
            </tr>
          </tfoot>
        </Table>
      ) : (
        <h1 className="text-white">No hay productos en el carrito</h1>
      )}
    </div>
  );
};

export default Cart;


