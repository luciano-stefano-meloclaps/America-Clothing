import React from "react";
import Hero from "../hero/Hero";
import ProductList from "../productList/ProductList";
import AboutUs from "../aboutUs/AboutUs";
import ContactUs from "../contactUs/ContactsUs";
import Dashboard from "../dashboard/Dashboard";
import { useAuth } from "../../context/AuthContext";


const MainPage = () => {
  const {userRole} = useAuth();
  return (
    <div>
      {/* Si el usuario es admin, mostramos solo el Dashboard */}
      {userRole === 'admin' ? (
        <Dashboard />
      ) : (
        // Si es cliente, mostramos los demás componentes
        <>
          <Hero />
          <ProductList />
          <AboutUs />
          <ContactUs />
        </>
      )}
    </div>
  );

};

export default MainPage;
