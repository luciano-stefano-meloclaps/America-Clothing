import { useAPI } from "../../services/apiContext/api.context"; // Import el contexto
import { Button, Table } from "react-bootstrap";

const Cart = () => {
  const { cart, removeFromCart } = useAPI(); // Obtén el carrito y la función para eliminar

  return (
    <div>
      {cart.length > 0 ? (
        <Table striped hover>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product) => (
              <tr key={product.code}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>${product.price}</td>
                <td>${product.price * product.quantity}</td>
                <td>
                  <Button onClick={() => removeFromCart(product.code)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total</td>
              <td>
                <b>${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</b>
              </td>
            </tr>
          </tfoot>
        </Table>
      ) : (
        <h1>No hay productos en el carrito</h1>
      )}
    </div>
  );
};

export default Cart;
