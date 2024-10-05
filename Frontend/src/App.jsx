import "./App.css";
import Footer from "./components/footer/Footer";
import Hero from "./components/hero/Hero";
import Login from "./components/login/Login";
import NavbarMain from "./components/navbar/Navbar";
import ProductList from "./components/productList/ProductList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importa Routes y Route
import Register from "./components/register/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import MainPage from "./components/mainPage/MainPage";


function App() {
  return (
    <Router>
      <NavbarMain />
      <Routes>
        {/* <Route path="/" element={<Hero />} /> */}
        <Route path="/productos" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <MainPage/>
      <Footer />
    </Router>
  );
}

export default App;
