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

import { APIContextProvider } from "./services/apiContext/api.context"; // Importa el provider
import Cart from "./components/cart/Cart"; // Importa el componente Cart
import AboutUs from "./components/aboutUs/AboutUs";

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
          <Route path="/cart" element={<Cart />} /> {/* Ruta para el carrito */}
          <Route path="/aboutUs" element={<AboutUs />} />
        </Routes>
        <Footer />
      </Router>
    </APIContextProvider>
  );
}

export default App;
