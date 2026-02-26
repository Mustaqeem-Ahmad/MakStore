import React from "react";
import { useData } from "../context/DataContext";

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

  return (
    <div className="bg-gray-100 h-max hidden md:block rounded-md mt-10 p-4 w-[250px]">
      
      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white border border-gray-300 rounded-md p-2 w-full"
      />

      {/* 📂 Category */}
      <h1 className="font-semibold text-lg mt-6">Category</h1>
      <div className="flex flex-col mt-3 gap-2">
        {categoryOnlyData
          .filter(Boolean)
          .map((item, index) => (
            <label key={index} className="flex gap-2 items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                value={item}
                checked={category === item}
                onChange={handleCategoryChange}
              />
              <span className="uppercase text-sm">
                {item}
              </span>
            </label>
        ))}
      </div>

      {/* 🏷 Brand */}
      <h1 className="font-semibold text-lg mt-6">Brand</h1>
      <select
        value={brand}
        onChange={handleBrandChange}
        className="bg-white border border-gray-300 rounded-md p-2 w-full mt-3"
      >
        {brandOnlyData
          .filter(Boolean)
          .map((item, index) => (
            <option value={item} key={index}>
              {item?.toUpperCase()}
            </option>
        ))}
      </select>

      {/* 💰 Price Range */}
      <h1 className="font-semibold text-lg mt-6">Price Range</h1>
      <div className="flex flex-col gap-2 mt-2">
        <label className="text-sm">
          ${priceRange[0]} - ${priceRange[1]}
        </label>
        <input
          type="range"
          min="0"
          max="5000"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
        />
      </div>

      {/* 🔄 Reset */}
      <button
        onClick={handleReset}
        className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-600 hover:to-pink-600 px-3 mt-6 cursor-pointer py-2 w-full text-white rounded-md font-semibold"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;