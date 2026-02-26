import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductListView = ({ product }) => {
  const navigate = useNavigate();
  const {addToCart} = useCart()

  return (
    <div className="space-y-4 mt-4 rounded-md shadow-md">
      <div className="bg-gray-100 flex flex-col md:flex-row gap-7 items-center p-3 hover:scale-105 transition-all duration-200 rounded-md">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-48  rounded-md cursor-pointer"
          onClick={() => navigate(`/products/${product.id}`)}
        />
        <div className="space-y-2 ">
          <h1 className="font-semibold text-xl line-clamp-3 hover:text-rose-400 w-full">
            {product.title}
          </h1>
          <p className="font-semibold text-lg flex gap-2 items-center">
            <span className="text-2xl text-[#FA2D3D]">${product.price} </span> (
            {product.discount}% off)
          </p>
          <p>FREE delivery <span className="font-semibold">Fri, 18 Apr</span> <br /> Or fastest delivery <span className="font-semibold">Tomorrow, 17 Apr</span> </p>
          <button onClick={()=>addToCart(product)} className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 px-3  cursor-pointer py-2 rounded-md font-semibold text-white">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductListView;
