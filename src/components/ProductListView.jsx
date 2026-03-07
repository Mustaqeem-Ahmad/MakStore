import React from "react";
import { useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const ProductListView = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const discountedPrice = product.price;
  const originalPrice = Math.round(
    product.price / (1 - product.discountPercentage / 100)
  );

  return (
    <div className="mt-4 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-all duration-300">

      <div className="flex flex-col md:flex-row gap-6 p-4">

        {/* Image */}
        <div
          className="overflow-hidden rounded-lg cursor-pointer"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          <img
            src={product.thumbnail || product.image}
            alt={product.title}
            className="h-48 w-48 object-contain hover:scale-110 transition duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between flex-1">

          <div>
            {/* Title */}
            <h1
              className="font-semibold text-lg md:text-xl line-clamp-2 hover:text-rose-500 cursor-pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              {product.title}
            </h1>

            {/* Rating */}
            <p className="text-yellow-500 text-sm mt-1">
              ⭐ {product.rating}
            </p>

            {/* Price */}
            <div className="flex items-center gap-3 mt-2">
              <span className="text-2xl font-bold text-rose-500">
                ${discountedPrice}
              </span>

              <span className="line-through text-gray-400">
                ${originalPrice}
              </span>

              <span className="text-green-600 text-sm font-medium">
                {Math.round(product.discountPercentage)}% off
              </span>
            </div>

            {/* Delivery Info */}
            <p className="text-sm text-gray-600 mt-2">
              FREE delivery <span className="font-semibold">Tomorrow</span>
            </p>
          </div>

          {/* Button */}
          <button
            onClick={() => addToCart(product)}
            className="mt-4 w-fit flex items-center gap-2 bg-linear-to-r from-pink-500 to-red-500 hover:opacity-90 px-4 py-2 rounded-md font-semibold text-white transition"
          >
            <IoCartOutline className="h-5 w-5" />
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductListView;