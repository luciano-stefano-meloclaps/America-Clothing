import React, { useState } from "react";

import "./ProductFilter.css";

const ProductFilter = ({ products, onSizeChange, onPriceChange, onCategoryChange, currentCategory }) => {
  const [sizeFilter, setSizeFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(currentCategory || "");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [tempPriceRange, setTempPriceRange] = useState({
    min: "",
    max: "",
  });

  const categories = ["Camperas", "Jeans", "Buzos", "Camisas", "Bermudas", "Vestidos"];

  const handleCategoryChange = (cat) => {
    const newCategory = categoryFilter === cat ? "" : cat;
    setCategoryFilter(newCategory);
    onCategoryChange(newCategory);
  };

  const handleSizeChange = (size) => {
    const newFilters = sizeFilter.includes(size)
      ? sizeFilter.filter((s) => s !== size)
      : [...sizeFilter, size];
    
    setSizeFilter(newFilters);
    onSizeChange(newFilters);
  };

  const handlePriceChange = () => {
    const formattedRange = {
      min: tempPriceRange.min === "" ? 0 : Number(tempPriceRange.min),
      max: tempPriceRange.max === "" ? Infinity : Number(tempPriceRange.max),
    };
    setPriceRange(formattedRange);
    onPriceChange(formattedRange);
  };

  const resetFilters = () => {
    setSizeFilter([]);
    setCategoryFilter("");
    setPriceRange({ min: 0, max: Infinity });
    setTempPriceRange({ min: "", max: "" });
    onSizeChange([]);
    onCategoryChange("");
    onPriceChange({ min: 0, max: Infinity });
  };

  return (
    <div className="filter-section">
      <div className="filter-group">
        <h3 className="filter-title">Filtrar por Categoría</h3>
        <div className="size-grid mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`size-option-btn ${categoryFilter === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h3 className="filter-title">Filtrar por Talle</h3>
        <div className="size-grid">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`size-option-btn ${sizeFilter.includes(size) ? "active" : ""}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h3 className="filter-title">Rango de Precio</h3>
        <div className="price-range-inputs">
          <div className="input-wrapper">
            <span className="input-prefix">$</span>
            <input
              type="number"
              placeholder="Min"
              value={tempPriceRange.min}
              className="filter-input"
              onChange={(e) =>
                setTempPriceRange({ ...tempPriceRange, min: e.target.value })
              }
            />
          </div>
          <div className="input-wrapper">
            <span className="input-prefix">$</span>
            <input
              type="number"
              placeholder="Max"
              value={tempPriceRange.max}
              className="filter-input"
              onChange={(e) =>
                setTempPriceRange({ ...tempPriceRange, max: e.target.value })
              }
            />
          </div>
          
          <div className="filter-actions">
            <button
              onClick={handlePriceChange}
              className="apply-btn"
            >
              Aplicar Filtro
            </button>
            <button
              onClick={resetFilters}
              className="reset-btn"
            >
              Limpiar Todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
