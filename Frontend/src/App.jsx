import "./App.css";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import NavbarMain from "./components/navbar/Navbar";
import ProductList from "./components/productList/ProductList";
import Product from "./components/product/Product";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import UserUpdate from "./components/userUpdate/UserUpdate";
import Dashboard from "./components/dashboard/Dashboard";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import NotFound from "./components/notFound/NotFound";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  const [products, setProducts] = useState([]);

  // Fetch de todos los productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Usamos ruta relativa para que funcione tanto en Docker (con Nginx proxy) como en desarrollo (con Vite proxy)
        const response = await axios.get("/api/Product"); 
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
          <div className="d-flex flex-column min-vh-100 bg-dark text-light">
            <ScrollToTop />
            <NavbarMain />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add-product"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <ProductAdd />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/update-product"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <ProductUpdate />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-purchases"
                  element={
                    <ProtectedRoute requiredRole="client">
                      <Purchases />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add-user"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <UserAdd />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/update-user/:userId"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <UserUpdate />
                    </ProtectedRoute>
                  }
                />
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
                <Route path="*" element={<NotFound />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />{" "}
                {/* Ruta para el carrito */}
                <Route path="/aboutUs" element={<AboutUs />} />{" "}
                {/* Ruta para Sobre Nosotros */}
                <Route path="/contactUs" element={<ContactUs />} />{" "}
                {/* Ruta para el formulario */}
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </APIContextProvider>
  );
}

export default App;
