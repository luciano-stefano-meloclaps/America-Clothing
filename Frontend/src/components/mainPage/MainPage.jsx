import React from "react";
import Hero from "../hero/Hero";
import ProductList from "../productList/ProductList";
import AboutUs from "../aboutUs/AboutUs";
import ContactUs from "../contactUs/ContactsUs";
import Dashboard from "../dashboard/Dashboard";
import FAQ from "../faq/FAQ";
import Testimonials from "../testimonials/Testimonials";
import CategoryBanner from "../categoryBanner/CategoryBanner";


import { useAuth } from "../../context/AuthContext";


const MainPage = ({ products }) => {
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
          <CategoryBanner />
          <ProductList products={products} />

          <Testimonials />
          <AboutUs />

          <FAQ />
          <ContactUs />

        </>
      )}
    </div>
  );

};

export default MainPage;