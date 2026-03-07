import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../assets/Loading4.webm";
import Breadcrum from "../components/Breadcrum";
import { Star, Minus, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";

const SingleProduct = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");

  const getSingleProduct = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://dummyjson.com/products/${id}`
      );

      setSingleProduct(res.data);
      setActiveImage(res.data.thumbnail);
    } catch (error) {
      console.log(error);
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
    <div className="px-4 pb-16 bg-gray-50">

      <Breadcrum title={singleProduct.title} />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 mt-8">

        {/* LEFT SIDE - IMAGE */}

        <div className="flex flex-col gap-4 sticky top-24 h-fit">

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <img
              src={activeImage}
              alt={singleProduct.title}
              className="w-full object-contain h-105"
            />
          </div>

          {/* Image Gallery */}

          <div className="flex gap-3">

            {singleProduct.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setActiveImage(img)}
                className="w-20 h-20 object-cover rounded-lg cursor-pointer border hover:border-red-500"
              />
            ))}

          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="flex flex-col gap-6">

          <h1 className="text-3xl font-bold text-gray-800">
            {singleProduct.title}
          </h1>

          <div className="text-gray-500">
            {singleProduct.brand?.toUpperCase()} /{" "}
            {singleProduct.category?.toUpperCase()}
          </div>

          {/* Rating */}

          <div className="flex items-center gap-2 text-yellow-500">

            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                fill={
                  i < Math.round(singleProduct.rating)
                    ? "currentColor"
                    : "none"
                }
              />
            ))}

            <span className="text-gray-600 text-sm">
              ({singleProduct.rating})
            </span>

          </div>

          {/* Price */}

          <div className="flex items-center gap-4">

            <span className="text-3xl font-bold text-red-500">
              ${singleProduct.price}
            </span>

            <span className="line-through text-gray-500">
              ${originalPrice}
            </span>

            <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">
              {Math.round(singleProduct.discountPercentage)}% OFF
            </span>

          </div>

          {/* Stock */}

          <div className="text-green-600 font-medium">
            {singleProduct.stock > 0
              ? `In Stock (${singleProduct.stock})`
              : "Out of Stock"}
          </div>

          {/* Description */}

          <p className="text-gray-600 leading-relaxed">
            {singleProduct.description}
          </p>

          {/* Quantity */}

          <div className="flex items-center gap-4">

            <span className="font-medium">Quantity</span>

            <div className="flex items-center border rounded-lg">

              <button
                onClick={() =>
                  quantity > 1 && setQuantity(quantity - 1)
                }
                className="px-3 py-2 hover:bg-gray-100"
              >
                <Minus size={18} />
              </button>

              <span className="px-4">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-gray-100"
              >
                <Plus size={18} />
              </button>

            </div>

          </div>

          {/* Buttons */}

          <div className="flex gap-4">

            <button
              onClick={() =>
                addToCart({ ...singleProduct, quantity })
              }
              className="bg-linear-to-r from-pink-500 to-red-500 px-8 py-3 rounded-xl text-white font-semibold hover:scale-105 transition"
            >
              Add to Cart
            </button>

            <button className="border border-gray-300 px-8 py-3 rounded-xl hover:bg-gray-100 transition">
              Buy Now
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;