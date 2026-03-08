import React from "react";
import banner from "../assets/banner1.jpg";
import { Link } from "react-router-dom";

const MidBanner = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div
        className="relative max-w-7xl mx-auto rounded-2xl overflow-hidden h-130 md:h-150 bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30 flex items-center justify-center">
          
          <div className="text-center text-white px-6 max-w-2xl">

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
              Stylish Products for
              <span className="block text-pink-400">
                Everyday Life
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Explore our curated collection of clothing, home essentials,
              and lifestyle products — delivered fast and with care.
            </p>

            <Link to="/products">
              <button
                className="bg-linear-to-r from-pink-500 to-red-500
                px-8 py-3 rounded-xl text-white font-semibold
                hover:scale-105 hover:shadow-xl hover:shadow-pink-500/40
                transition duration-300"
              >
                Shop Now
              </button>
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
};

export default MidBanner;