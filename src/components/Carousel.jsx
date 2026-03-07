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

  const carouselProducts = data?.slice(0, 6);

  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <div className="bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">

      <Slider {...settings}>
        {carouselProducts?.map((item) => (
          <div key={item.id}>
            
            <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-12 min-h-137.5">

              {/* LEFT CONTENT */}
              <div className="space-y-6 max-w-xl">

                <h3 className="text-pink-400 font-semibold uppercase text-sm tracking-wide">
                  {item.category}
                </h3>

                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  {item.title}
                </h1>

                <p className="text-gray-300 text-lg line-clamp-3">
                  {item.description}
                </p>

                <button
                  onClick={() => addToCart(item)}
                  className="bg-linear-to-r from-pink-500 to-red-500
                  px-6 py-3 rounded-xl text-white font-semibold
                  hover:scale-105 hover:shadow-xl hover:shadow-pink-500/40
                  transition duration-300"
                >
                  Shop Now
                </button>

              </div>

              {/* RIGHT IMAGE */}
              <div className="relative flex justify-center items-center">

                {/* glow */}
                <div className="absolute w-72 h-72 bg-pink-500/30 blur-3xl rounded-full"></div>

                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="relative w-80 md:w-96 object-contain animate-float"
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