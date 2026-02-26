import React from "react";
import { FaFilter } from "react-icons/fa6";
import { useData } from "../context/DataContext";

const MobileFilter = ({
  openFilter,
  setOpenFilter,
  search,
  setSearch,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  handleBrandChange,
  handleCategoryChange,
}) => {
  const { categoryOnlyData, brandOnlyData } = useData(); // ✅ hook use karo

  return (
    <>
      <div className="bg-gray-100 flex items-center justify-between px-4 rounded-md p-2 mt-5 md:hidden">
        <h1 className="font-semibold text-xl">Filters</h1>
        <FaFilter
          onClick={() => setOpenFilter(!openFilter)}
          className="text-gray-800 cursor-pointer"
        />
      </div>

      {openFilter && (
        <div className="bg-gray-100 p-4 md:hidden rounded-md fixed top-16 left-0 w-full max-h-[80vh] overflow-y-auto z-50 shadow-lg">
          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white border-2 border-gray-200 rounded-md p-2 w-full"
          />

          {/* Category */}
          <h1 className="font-semibold text-xl mt-5">Category</h1>
          <div className="flex flex-col mt-3 gap-2">
            {categoryOnlyData?.map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={category === item}
                  value={item}
                  onChange={handleCategoryChange}
                />
                <span className="uppercase">{item}</span>
              </div>
            ))}
          </div>

          {/* Brand */}
          <h1 className="font-semibold text-xl mt-5">Brand</h1>
          <select
            value={brand}
            onChange={handleBrandChange}
            className="bg-white border-2 border-gray-200 rounded-md p-2 w-full mt-3"
          >
            {brandOnlyData?.map((item, index) => (
              <option value={item} key={index}>
                {item.toUpperCase()}
              </option>
            ))}
          </select>

          {/* Price Range */}
          <h1 className="font-semibold text-xl my-5">Price Range</h1>
          <div className="flex flex-col gap-2">
            <label>
              Price: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-full"
            />
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
              setBrand("All");
              setPriceRange([0, 5000]);
              setOpenFilter(false);
            }}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-600 hover:to-pink-600 px-3 my-5 cursor-pointer py-2 w-full text-white rounded-md font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </>
  );
};

export default MobileFilter;