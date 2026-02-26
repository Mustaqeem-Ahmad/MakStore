import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col justify-between border border-gray-200 relative bg-gray-50 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-3 h-full">
      
      {/* Product Image */}
      <img
        src={product?.thumbnail}
        alt={product?.title}
        className="bg-gray-100 aspect-square object-contain rounded-xl"
        onClick={() => navigate(`/products/${product.id}`)}
      />

      {/* Title */}
      <h1 className="line-clamp-2 p-1 font-semibold mt-2 min-h-[3rem]">
        {product?.title}
      </h1>

      {/* Price */}
      <p className="my-1 text-lg text-gray-800 font-bold pl-1">
        ${product?.price}
      </p>

      {/* Button */}
      <button
        onClick={() => addToCart(product)}
        className="bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 px-3 py-2 font-semibold w-full flex gap-3 items-center justify-center text-white rounded-md mt-2 transition"
      >
        <IoCartOutline className="h-5 w-5" />
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductCard;