import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

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

  // Fetch para obtener usuarios desde la API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://localhost:7091/api/User'); // Endpoint de usuarios
        setUsers(response.data); // Asigna la respuesta al estado de usuarios
        setIsLoading(false);
      } catch (error) {
        console.error("Error al cargar los usuarios", error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []); // Este efecto se ejecuta una vez al montar el componente

  const toggleLoading = (value) => {
    setIsLoading(value);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.code === product.code);
      if (existingProduct) {
        return prevCart.map((p) =>
          p.code === product.code ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (code) => {
    setCart((prevCart) => prevCart.filter((product) => product.code !== code));
  };

  const putProduct = (product, token) => {
    // Lógica para actualizar productos
  };

  return (
    <APIContext.Provider
      value={{
        isLoading,
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
