import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-14">

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Info */}
        <div>
          <Link to="/">
            <h1 className="text-3xl font-bold bg-linear-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
              MakStore
            </h1>
          </Link>

          <p className="mt-4 text-sm text-gray-400">
            Powering Your World with the Best in Electronics.
          </p>

          <p className="mt-3 text-sm text-gray-400">
            123 Electronics St, Style City, NY 10001
          </p>

          <p className="text-sm text-gray-400">
            Email: support@MakStore.com
          </p>

          <p className="text-sm text-gray-400">
            Phone: (123) 456-7890
          </p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Customer Service</h3>

          <ul className="space-y-2 text-sm text-gray-400">

            <li className="hover:text-white cursor-pointer transition">
              Contact Us
            </li>

            <li className="hover:text-white cursor-pointer transition">
              Shipping & Returns
            </li>

            <li className="hover:text-white cursor-pointer transition">
              FAQs
            </li>

            <li className="hover:text-white cursor-pointer transition">
              Order Tracking
            </li>

            <li className="hover:text-white cursor-pointer transition">
              Size Guide
            </li>

          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>

          <div className="flex gap-5 text-xl">

            <FaFacebook className="hover:text-pink-500 cursor-pointer transition"/>

            <FaInstagram className="hover:text-pink-500 cursor-pointer transition"/>

            <FaTwitterSquare className="hover:text-pink-500 cursor-pointer transition"/>

            <FaPinterest className="hover:text-pink-500 cursor-pointer transition"/>

          </div>
        </div>

        {/* Newsletter */}
        <div>

          <h3 className="text-xl font-semibold mb-3">
            Stay in the Loop
          </h3>

          <p className="text-sm text-gray-400">
            Subscribe to get special offers, free giveaways, and more
          </p>

          <form className="mt-4 flex">

            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-3 py-2 rounded-l-lg text-gray-900 focus:outline-none"
            />

            <button
              type="submit"
              className="bg-linear-to-r from-pink-500 to-red-500
              px-4 rounded-r-lg text-white font-semibold
              hover:from-red-600 hover:to-pink-600 transition"
            >
              Subscribe
            </button>

          </form>

        </div>

      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">

        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-pink-500 font-semibold">
            MakStore
          </span>{" "}
          . All rights reserved
        </p>

      </div>

    </footer>
  );
};

export default Footer;