import "./App.css";
import Footer from "./components/footer/Footer";
import Hero from "./components/hero/Hero";
import NavbarMain from "./components/navbar/Navbar";
import ProductList from "./components/productList/ProductList";
import Register from "./components/register/Register"; // Importa el componente Register
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importa Routes y Route

function App() {
  return (
    <Router>
      <NavbarMain />
      <Routes>
        <Route path="/" element={<Hero />} />{" "}
        {/* Ruta para la página principal */}
        <Route path="/productos" element={<ProductList />} />{" "}
        {/* Ruta para productos */}
        <Route path="/register" element={<Register />} />{" "}
        {/* Ruta para el registro */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
