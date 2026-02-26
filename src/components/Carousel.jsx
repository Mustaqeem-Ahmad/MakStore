import React from "react";
import Slider from "react-slick";
import { useData } from "../context/DataContext";
import { useCart } from "../context/CartContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const { data, loading } = useData();
  const { addToCart } = useCart();

  if (loading) return null;

  // sirf top 8 products show
  const carouselProducts = data?.slice(0, 8);

  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2500,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        {carouselProducts?.map((item) => (
          <div key={item.id} className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <div className="flex flex-col md:flex-row justify-center items-center h-[600px] px-6 gap-10">

              {/* LEFT CONTENT */}
              <div className="space-y-4">
                <h3 className="text-pink-500 font-semibold text-sm uppercase">
                  {item.category}
                </h3>

                <h1 className="text-3xl md:text-4xl font-bold text-white max-w-[500px]">
                  {item.title}
                </h1>

                <p className="text-gray-400 max-w-[500px] line-clamp-3">
                  {item.description}
                </p>

                <button
                  onClick={() => addToCart(item)}
                  className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 px-4 py-2 rounded-md text-white  font-semibold"
                >
                  Shop Now
                </button>
              </div>

              {/* RIGHT IMAGE */}
              <div>
                <img
                  src={item.thumbnail}   // ✅ IMPORTANT CHANGE
                  alt={item.title}
                  className="w-[400px] h-[400px] object-contain rounded-full  hover:scale-105 transition-all duration-300"
                />
              </div>

            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;