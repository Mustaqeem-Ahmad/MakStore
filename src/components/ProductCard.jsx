import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="group flex flex-col justify-between border border-gray-200 relative bg-white rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-300 p-4 h-full">

      {/* Discount Badge */}
      {product?.discountPercentage && (
        <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs px-2 py-1 rounded-md">
          -{Math.round(product.discountPercentage)}%
        </span>
      )}

      {/* Wishlist Icon */}
      <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:scale-110 transition">
        <AiOutlineHeart />
      </button>

      {/* Image */}
      <div
        onClick={() => navigate(`/products/${product.id}`)}
        className="overflow-hidden rounded-xl"
      >
        <img
          src={product?.thumbnail}
          alt={product?.title}
          className="bg-gray-100 aspect-square object-contain group-hover:scale-110 transition duration-300"
        />
      </div>

      {/* Title */}
      <h1 className="line-clamp-2 font-semibold mt-3 text-gray-800 min-h-12">
        {product?.title}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
        ⭐ {product?.rating}
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 mt-2">
        <p className="text-lg font-bold text-gray-900">
          ${product?.price}
        </p>

        {product?.discountPercentage && (
          <p className="text-sm text-gray-400 line-through">
            $
            {Math.round(
              product.price / (1 - product.discountPercentage / 100)
            )}
          </p>
        )}
      </div>

      {/* Button */}
      <button
        onClick={() => addToCart(product)}
        className="bg-linear-to-r from-pink-500 to-red-500 hover:opacity-90 px-3 py-2 font-semibold w-full flex gap-2 items-center justify-center text-white rounded-lg mt-4 transition"
      >
        <IoCartOutline className="h-5 w-5" />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;