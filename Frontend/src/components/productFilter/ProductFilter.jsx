import React, { useState } from "react";

const ProductFilter = ({ products, onSizeChange, onPriceChange }) => {
  const [sizeFilter, setSizeFilter] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [tempPriceRange, setTempPriceRange] = useState({
    min: 0,
    max: Infinity,
  }); // Valores temporales para el precio

  const handleSizeChange = (size) => {
    setSizeFilter((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
    onSizeChange(
      sizeFilter.includes(size)
        ? sizeFilter.filter((s) => s !== size)
        : [...sizeFilter, size]
    );
  };

  const handlePriceChange = () => {
    setPriceRange(tempPriceRange); // Aplicar el rango de precio temporal
    onPriceChange(tempPriceRange); // Enviar el nuevo rango al padre
  };

  const calculatePriceRange = () => {
    if (products.length === 0) return { min: 0, max: 0 };
    const prices = products.map((product) => product.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  };

  const resetFilters = () => {
    setSizeFilter([]);
    setPriceRange({ min: 0, max: Infinity });
    setTempPriceRange({ min: 0, max: Infinity }); // Reiniciar valores temporales
    onSizeChange([]); // Limpiar el filtro de tallas
    onPriceChange({ min: 0, max: Infinity }); // Limpiar el filtro de precios
  };

  const { min, max } = calculatePriceRange();

  return (
    <div>
      <div>
        <h3>Talle</h3>
        {["S", "M", "L", "XL", "XXL"].map((size) => (
          <button
            key={size}
            onClick={() => handleSizeChange(size)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: sizeFilter.includes(size) ? "black" : "white",
              color: sizeFilter.includes(size) ? "white" : "black",
              border: "1px solid black",
              borderRadius: "5px",
            }}
          >
            {size} {sizeFilter.includes(size) ? "✓" : ""}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Precio</h3>
        <input
          type="number"
          placeholder="Desde"
          value={tempPriceRange.min}
          onChange={(e) =>
            setTempPriceRange({ ...tempPriceRange, min: e.target.value })
          }
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="number"
          placeholder="Hasta"
          value={tempPriceRange.max}
          onChange={(e) =>
            setTempPriceRange({ ...tempPriceRange, max: e.target.value })
          }
          style={{ padding: "5px" }}
        />
        <button onClick={handlePriceChange} style={{ marginLeft: "10px" }}>
          Aplicar Rango
        </button>
      </div>

      <button onClick={resetFilters} style={{ marginTop: "20px" }}>
        Limpiar
      </button>
    </div>
  );
};

export default ProductFilter;

