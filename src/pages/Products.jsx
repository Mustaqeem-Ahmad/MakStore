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

  // Reset page when filters change
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

  // Memoized filtering (performance optimized)
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.title?.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
    );
  }, [data, search, category, brand, priceRange]);

  const dynamicPage = Math.ceil(filteredData.length / 12);

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 mb-10">
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
          <div className="flex items-center justify-center h-[400px]">
            <video muted autoPlay loop>
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        ) : (
          <div className="flex gap-8">
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

            {filteredData.length > 0 ? (
              <div className="flex flex-col items-center justify-center w-full">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-7 mt-10 w-full">
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
                  <Pagination
                    pageHandler={pageHandler}
                    page={page}
                    dynamicPage={dynamicPage}
                  />
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-[500px]">
                <Lottie animationData={notfound} className="w-[400px]" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;