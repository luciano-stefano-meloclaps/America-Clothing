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
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { APIContextProvider, useAPI } from "./services/apiContext/api.context";
import Cart from "./components/cart/Cart";
import AboutUs from "./components/aboutUs/AboutUs";
import ContactUs from "./components/contactUs/ContactUs";
import ProductAdd from "./components/productAdd/ProductAdd";
import ProductUpdate from "./components/productUpdate/ProductUpdate";
import Purchases from "./components/purchases/Purchases";
import UserAdd from "./components/userAdd/UserAdd";
import UserUpdate from "./components/userUpdate/UserUpdate";
import Dashboard from "./components/dashboard/Dashboard";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import NotFound from "./components/notFound/NotFound";
import FAQ from "./components/faq/FAQ";


function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function AppContent() {
  const { products } = useAPI();

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 bg-dark text-light">
        <ScrollToTop />
        <NavbarMain />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<MainPage products={products} />} />
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
            />
            <Route
              path="/productos/detalle/:productId"
              element={<Product products={products} />}
            />
            <Route
              path="/productos/:category"
              element={<ProductList products={products} />}
            />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>

        </main>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <APIContextProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </APIContextProvider>
  );
}

export default App;
