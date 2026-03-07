import React, { useEffect, useMemo, useState } from "react";
import { useData } from "../context/DataContext";
import FilterSection from "../components/FilterSection";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import MobileFilter from "../components/MobileFilter";
import Loading from "../assets/Loading4.webm";
import Lottie from "lottie-react";
import notfound from "../assets/notfound.json";

const Products = () => {
  const { data = [], fetchAllProducts, loading } = useData();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, []);

  // reset page on filter change
  useEffect(() => {
    setPage(1);
  }, [search, category, brand, priceRange]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setOpenFilter(false);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setOpenFilter(false);
  };

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo(0, 0);
  };

  // filtering
  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.title?.toLowerCase().includes(search.toLowerCase()) &&
        (category === "All" || item.category === category) &&
        (brand === "All" || item.brand === brand) &&
        item.price >= priceRange[0] &&
        item.price <= priceRange[1]
    );
  }, [data, search, category, brand, priceRange]);

  const dynamicPage = Math.ceil(filteredData.length / 12);

  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="max-w-7xl mx-auto px-4 py-10">

        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          search={search}
          setSearch={setSearch}
          brand={brand}
          setBrand={setBrand}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          category={category}
          setCategory={setCategory}
          handleCategoryChange={handleCategoryChange}
          handleBrandChange={handleBrandChange}
        />

        {loading ? (
          <div className="flex items-center justify-center h-125">
            <video muted autoPlay loop className="w-40">
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        ) : (
          <div className="flex gap-10">

            {/* Sidebar Filter */}

            <div className="hidden lg:block w-65 sticky top-24 h-fit bg-white  rounded-xl shadow-md">
              <FilterSection
                search={search}
                setSearch={setSearch}
                brand={brand}
                setBrand={setBrand}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                category={category}
                setCategory={setCategory}
              />
            </div>

            {/* Products */}

            <div className="flex flex-col w-full">

              {/* Top Bar */}

              <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-semibold text-gray-800">
                  Products
                </h2>

                <p className="text-gray-500">
                  {filteredData.length} items found
                </p>

              </div>

              {filteredData.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {filteredData
                      .slice(page * 12 - 12, page * 12)
                      .map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                        />
                      ))}

                  </div>

                  {dynamicPage > 1 && (
                    <div className="mt-10 flex justify-center">
                      <Pagination
                        pageHandler={pageHandler}
                        page={page}
                        dynamicPage={dynamicPage}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-125">
                  <Lottie animationData={notfound} className="w-87.5" />
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Products;