import { createContext, useContext, useEffect, useState } from "react";

const APIContext = createContext();

const cartValue = JSON.parse(localStorage.getItem("cart"));

export const useAPI = () => {
  const context = useContext(APIContext);
  if (!context) throw new Error("There is no API provider");
  return context;
};

export const APIContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(cartValue ? cartValue : []);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const toggleLoading = (value) => {
    setIsLoading(value);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Buscamos el producto en el carrito según su código
      const existingProduct = prevCart.find((p) => p.code === product.code);
      if (existingProduct) {
        // Si ya existe, actualizamos la cantidad
        return prevCart.map((p) =>
          p.code === product.code ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      // Si no existe, lo agregamos al carrito con quantity: 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (code) => {
    setCart((prevCart) => prevCart.filter((product) => product.code !== code));
  };

  const putProduct = (product, token) => {
    // Este es para actualizar productos
  };

  return (
    <APIContext.Provider
      value={{
        isLoading,
        toggleLoading,
        users,
        setUsers,
        sales,
        setSales,
        products,
        setProducts,
        cart,
        setCart,
        purchaseHistory,
        setPurchaseHistory,
        addToCart,
        removeFromCart,
        putProduct,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
