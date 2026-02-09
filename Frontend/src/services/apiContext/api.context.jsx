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
  const [saleOrders, setSaleOrders] = useState([]);
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
        const response = await axios.get('/api/User'); // Endpoint de usuarios
        setUsers(response.data); // Asigna la respuesta al estado de usuarios
        setIsLoading(false);
      } catch (error) {
        console.error("Error al cargar los usuarios", error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []); // Este efecto se ejecuta una vez al montar el componente


  // Carga de productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/Product");
        if (Array.isArray(response.data)) {
          setProducts(response.data); // Guardamos los productos en el estado
        } else {
          throw new Error("La respuesta no es un array");
        }
      } catch (error) {
        console.error("Error al cargar los productos", error);
      }
    };

    fetchProducts();
  }, []);

// Fetch para obtener las SaleOrder

useEffect(() => {
  const fetchSaleOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/SaleOrder/GetSaleOrdersWithLines"); // Endpoint de SaleOrders
      setSaleOrders(response.data); // Guardamos las órdenes de venta en el estado
      setIsLoading(false);
    } catch (error) {
      console.error("Error al cargar las órdenes de venta", error);
      setIsLoading(false);
    }
  };

  fetchSaleOrders();
}, []);


  const toggleLoading = (value) => {
    setIsLoading(value);
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((p) => p.code === product.code);
    if (existingProduct) {
      return false; // Devuelve false si el producto ya existe
    }
  
    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]); // Agrega el nuevo producto
    return true; // Devuelve true si el producto fue agregado
  };
  
  const removeFromCart = (code) => {
    setCart((prevCart) => prevCart.filter((product) => product.code !== code));
  };

  const clearCart = () => {
    setCart([]); // Vacía el carrito
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
        saleOrders,
        setSaleOrders,
        products,
        setProducts,
        cart,
        setCart,
        purchaseHistory,
        setPurchaseHistory,
        addToCart,
        removeFromCart,
        clearCart,
        putProduct,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
