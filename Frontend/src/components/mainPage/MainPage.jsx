import React from "react";
import Hero from "../hero/Hero";
import ProductList from "../productList/ProductList";
import AboutUs from "../aboutUs/AboutUs";

const MainPage = () => {
  return (
    <div>
      <Hero />
      <ProductList />
      <AboutUs />
    </div>
  );
};

export default MainPage;
