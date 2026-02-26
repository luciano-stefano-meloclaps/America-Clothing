import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { mockProducts, mockUsers, mockSaleOrders } from "../../data/mockData";

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
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Fetch para obtener usuarios desde la API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/User');
        setUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al cargar los usuarios — usando mock data", error);
        setUsers(mockUsers);
        setIsDemoMode(true);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);


  // Carga de productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/Product");
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          throw new Error("La respuesta no es un array");
        }
      } catch (error) {
        console.error("Error al cargar los productos — usando mock data", error);
        setProducts(mockProducts);
        setIsDemoMode(true);
      }
    };

    fetchProducts();
  }, []);

// Fetch para obtener las SaleOrder

useEffect(() => {
  const fetchSaleOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/SaleOrder/GetSaleOrdersWithLines");
      setSaleOrders(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al cargar las órdenes de venta — usando mock data", error);
      setSaleOrders(mockSaleOrders);
      setIsDemoMode(true);
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
      return false;
    }
  
    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    return true;
  };
  
  const removeFromCart = (code) => {
    setCart((prevCart) => prevCart.filter((product) => product.code !== code));
  };

  const clearCart = () => {
    setCart([]);
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
        isDemoMode,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
