import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../assets/Loading4.webm";
import Breadcrum from "../components/Breadcrum";
import { Check } from "lucide-react";
import { useCart } from "../context/CartContext";

const SingleProduct = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const getSingleProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://dummyjson.com/products/${id}`
      );

      setSingleProduct(res.data); // ✅ direct data (DummyJSON)
    } catch (error) {
      console.log("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <video muted autoPlay loop>
          <source src={Loading} type="video/webm" />
        </video>
      </div>
    );
  }

  if (!singleProduct) {
    return <div className="text-center py-20">Product not found</div>;
  }

  const originalPrice = Math.round(
    singleProduct.price +
      (singleProduct.price * singleProduct.discountPercentage) / 100
  );

  return (
    <div className="px-4 pb-10">
      <Breadcrum title={singleProduct.title} />

      <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Product Image */}
        <div className="w-full">
          <img
            src={singleProduct.thumbnail} // ✅ thumbnail for DummyJSON
            alt={singleProduct.title}
            className="rounded-2xl w-full object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          
          <h1 className="md:text-3xl text-xl text-gray-800 font-bold">
            {singleProduct.title}
          </h1>

          <div className="text-gray-600">
            {singleProduct.brand?.toUpperCase()} /{" "}
            {singleProduct.category?.toUpperCase()}
          </div>

          {/* Price Section */}
          <div>
            <p className="text-2xl font-bold text-red-500">
              ${singleProduct.price}
              <span className="text-gray-600 line-through ml-3 text-lg">
                ${originalPrice}
              </span>
              <span className="bg-gradient-to-r from-pink-500 to-red-500 px-4 ml-5 py-1 rounded-full font-semibold text-white text-sm">
                {Math.round(singleProduct.discountPercentage)}% OFF
              </span>
            </p>
          </div>

          <p className="text-gray-500">
            {singleProduct.description}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <label className="text-gray-700 font-medium">
              Quantity:
            </label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-24 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart({ ...singleProduct, quantity })}
            className="group bg-gradient-to-r from-pink-500 to-red-500 px-4 py-2 font-semibold w-44 rounded-md flex items-center justify-center gap-3 text-white hover:opacity-90 transition"
          >
            <Check className="h-5 w-5 hidden group-hover:block" />
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;