import "./App.css";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import NavbarMain from "./components/navbar/Navbar";
import ProductList from "./components/productList/ProductList";
import Product from "./components/product/Product";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/register/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import MainPage from "./components/mainPage/MainPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { AuthProvider } from "./context/AuthContext";

import { APIContextProvider } from "./services/apiContext/api.context"; // Importa el provider
import Cart from "./components/cart/Cart"; // Importa el componente Cart
import AboutUs from "./components/aboutUs/AboutUs";
import ContactUs from "./components/contactUs/ContactsUs";
import ProductAdd from "./components/productAdd/ProductAdd";
import ProductUpdate from "./components/productUpdate/ProductUpdate";
import Purchases from "./components/purchases/Purchases";
import UserAdd from "./components/userAdd/UserAdd";
import UserUpdate from "./components/userUpdate/userUpdate";
import UserTable from "./components/userTable/UserTable";
import ProductTable from "./components/productTable/ProductTable";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const [products, setProducts] = useState([]);

  // Fetch de todos los productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://localhost:7091/api/Product"); // TODO ESTO SE PODRIA EVITAR CON UN CONTEXT.
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          throw new Error("La respuesta no es un array");
        }
      } catch (error) {
        console.error("Error al cargar los productos", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <APIContextProvider>
      <AuthProvider>
        <Router>
          <NavbarMain />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/productos"
              element={<ProductList products={products} />}
            />{" "}
            {/* Pasar productos */}
            <Route
              path="/productos/detalle/:productId"
              element={<Product products={products} />}
            />{" "}
            {/* Pasamos los productos */}
            <Route
              path="/productos/:category"
              element={<ProductList products={products} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />{" "}
            {/* Ruta para el carrito */}
            <Route path="/aboutUs" element={<AboutUs />} />
            {/* Ruta para Sobre Nosotros */}
            <Route path="/contactUs" element={<ContactUs />} />
            {/* Ruta para el formulario */}
            <Route path="/add-product" element={<ProductAdd />} />
            <Route path="/update-product" element={<ProductUpdate />} />
            <Route path="/my-purchases" element={<Purchases />} />
            <Route path="/add-user" element={<UserAdd />} />
            <Route path="/update-user/:userId" element={<UserUpdate />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </APIContextProvider>
  );
}

export default App;
