import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch products from DummyJSON
  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        "https://dummyjson.com/products?limit=100"
      );

      // ⚠ IMPORTANT: DummyJSON me products array inside object hota hai
      setData(response.data.products);

    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // ✅ Unique values generator
  const getUniqueValues = (items, property) => {
    const values = items?.map((item) => item[property]);
    return ["All", ...new Set(values)];
  };

  const categoryOnlyData = getUniqueValues(data, "category");
  const brandOnlyData = getUniqueValues(data, "brand");

  return (
    <DataContext.Provider
      value={{
        data,
        loading,
        error,
        fetchAllProducts,
        categoryOnlyData,
        brandOnlyData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// ✅ Custom hook (IMPORTANT: ab getData use mat karo)
export const useData = () => {
  return useContext(DataContext);
};