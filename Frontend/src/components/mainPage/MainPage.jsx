import React from "react";
import Hero from "../hero/Hero";
import ProductList from "../productList/ProductList";
import AboutUs from "../aboutUs/AboutUs";
import ContactUs from "../contactUs/ContactsUs";
import Dashboard from "../dashboard/Dashboard";
import { useAuth } from "../../context/AuthContext";


const MainPage = () => {
  const {userRole} = useAuth();
 // console.log("UserType:", userRole);
  return (
    <div>
      {/* Si el usuario es admin o employee, mostramos solo el Dashboard */}
      {userRole === 'admin'|| userRole === 'employee' ? (  // ACA LE DOY ACCESO ANTES ESTABA ADMIN NOMAS
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