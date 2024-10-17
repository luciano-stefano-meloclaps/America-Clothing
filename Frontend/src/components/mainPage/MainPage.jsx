import React from "react";
import Hero from "../hero/Hero";
import ProductList from "../productList/ProductList";
import AboutUs from "../aboutUs/AboutUs";
import ContactUs from "../contactUs/ContactsUs";
import Dashboard from "../dashboard/Dashboard";

const MainPage = () => {
  return (
    <div>
      <Hero />
      <ProductList />
      <AboutUs />
      <ContactUs />
      <Dashboard />
    </div>
  );
};

export default MainPage;
