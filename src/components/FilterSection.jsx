import React from "react";
import { useData } from "../context/DataContext";
import { Search } from "lucide-react";

const FilterSection = ({
  search,
  setSearch,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  category,
  setCategory,
}) => {
  const { categoryOnlyData = [], brandOnlyData = [] } = useData();

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handleReset = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriceRange([0, 5000]);
  };

  const uniqueCategories = [...new Set(categoryOnlyData)].filter(
    (item) => item && item !== "All"
  );

  const uniqueBrands = [...new Set(brandOnlyData)].filter(Boolean);

  return (
    <div className="hidden md:block w-64 bg-white rounded-xl shadow-md p-6 sticky top-24 h-fit">

      {/* 🔍 Search */}
      <div className="relative">
        <Search size={18} className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* 📂 Category */}
      <h2 className="font-semibold text-lg mt-6 mb-3">Category</h2>

      <div className="flex flex-col gap-2 max-h-45 overflow-y-auto pr-1">

        {/* All */}
        <label className="flex gap-2 items-center cursor-pointer">
          <input
            type="radio"
            name="category"
            value="All"
            checked={category === "All"}
            onChange={handleCategoryChange}
          />
          <span className="text-sm font-medium">All</span>
        </label>

        {/* Categories */}
        {uniqueCategories.map((item, index) => (
          <label
            key={index}
            className="flex gap-2 items-center cursor-pointer"
          >
            <input
              type="radio"
              name="category"
              value={item}
              checked={category === item}
              onChange={handleCategoryChange}
            />
            <span className="uppercase text-sm">{item}</span>
          </label>
        ))}
      </div>

      {/* 🏷 Brand */}
      <h2 className="font-semibold text-lg mt-6 mb-3">Brand</h2>

      <select
        value={brand}
        onChange={handleBrandChange}
        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-500 outline-none"
      >
        <option value="All">All Brands</option>

        {uniqueBrands.map((item, index) => (
          <option value={item} key={index}>
            {item?.toUpperCase()}
          </option>
        ))}
      </select>

      {/* 💰 Price */}
      <h2 className="font-semibold text-lg mt-6 mb-3">Price Range</h2>

      <div className="flex flex-col gap-3">

        <div className="flex justify-between text-sm text-gray-600">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>

        <input
          type="range"
          min="0"
          max="5000"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
          className="accent-pink-500"
        />
      </div>

      {/* 🔄 Reset */}
      <button
        onClick={handleReset}
        className="mt-6 w-full bg-linear-to-r from-pink-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition"
      >
        Reset Filters
      </button>

    </div>
  );
};

export default FilterSection;