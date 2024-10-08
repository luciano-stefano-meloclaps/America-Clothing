import React from "react";
import Hero from "../hero/Hero";
import ProductList from "../productList/ProductList";
import AboutUs from "../aboutUs/AboutUs";
import ContactUs from "../contactUs/ContactsUs";

const MainPage = () => {
  return (
    <div>
      <Hero />
      <ProductList />
      <AboutUs />
      <ContactUs />
    </div>
  );
};

export default MainPage;
