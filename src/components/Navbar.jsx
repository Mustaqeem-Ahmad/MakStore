import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { MapPin } from "lucide-react";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = () => {

  const { cartItems } = useCart();

  const [location, setLocation] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {

      const { latitude, longitude } = position.coords;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );

      const data = await res.json();

      setLocation({
        city: data.address.city || data.address.town || data.address.village || "Unknown",
        state: data.address.state || "Unknown",
      });

      setOpenDropdown(false);

    });
  };

  return (

    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

        {/* LEFT */}
        <div className="flex items-center gap-8">

          {/* Logo */}
          <Link to="/">
            <h1 className="text-3xl font-bold font-[Orbitron] tracking-wide">
              <span className="bg-linear-to-r from-pink-500 to-black bg-clip-text text-transparent">
                MakStore
              </span>
            </h1>
          </Link>

          {/* Location */}
          <div className="hidden md:flex items-center gap-2 text-gray-700 cursor-pointer relative">

            <MapPin className="text-pink-500" size={20} />

            <span className="font-medium text-sm">
              {location ? (
                <div className="leading-tight">
                  <p>{location.city}</p>
                  <p className="text-xs text-gray-500">{location.state}</p>
                </div>
              ) : (
                "Add Address"
              )}
            </span>

            <FaCaretDown onClick={toggleDropdown} className="text-gray-500"/>

            {/* Dropdown */}
            {openDropdown && (

              <div className="absolute top-12 left-0 w-64 bg-white shadow-xl rounded-xl p-4 border">

                <div className="flex justify-between items-center mb-3">

                  <h3 className="font-semibold text-lg">
                    Change Location
                  </h3>

                  <CgClose
                    onClick={toggleDropdown}
                    className="cursor-pointer"
                  />

                </div>

                <button
                  onClick={getLocation}
                  className="w-full bg-linear-to-r from-pink-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition"
                >
                  Use Current Location
                </button>

              </div>

            )}

          </div>

        </div>

        {/* CENTER MENU */}
        <ul className="hidden md:flex items-center gap-8 font-medium">

          <NavLink to="/" className={({ isActive }) =>
            isActive
              ? "text-black border-b-2 border-pink-500 pb-1"
              : "text-gray-600 hover:text-black transition"
          }>
            Home
          </NavLink>

          <NavLink to="/products" className={({ isActive }) =>
            isActive
              ? "text-black border-b-2 border-pink-500 pb-1"
              : "text-gray-600 hover:text-black transition"
          }>
            Products
          </NavLink>

          <NavLink to="/about" className={({ isActive }) =>
            isActive
              ? "text-black border-b-2 border-pink-500 pb-1"
              : "text-gray-600 hover:text-black transition"
          }>
            About
          </NavLink>

          <NavLink to="/contact" className={({ isActive }) =>
            isActive
              ? "text-black border-b-2 border-pink-500 pb-1"
              : "text-gray-600 hover:text-black transition"
          }>
            Contact
          </NavLink>

        </ul>

        {/* RIGHT */}
        <div className="flex items-center gap-6">

          {/* Cart */}
          <Link to="/cart" className="relative">

            <IoCartOutline className="h-7 w-7 text-gray-700 hover:text-black transition" />

            <span className="absolute -top-2 -right-2 bg-linear-to-r from-pink-500 to-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems?.length || 0}
            </span>

          </Link>

          {/* Auth */}
          <div className="hidden md:block">

            <SignedOut>
              <SignInButton className="bg-linear-to-r from-pink-500 to-red-500 text-white px-4 py-1 rounded-lg font-semibold hover:scale-105 transition cursor-pointer"/>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>

          </div>

          {/* Mobile menu */}
          {openNav ? (
            <HiMenuAlt3
              onClick={() => setOpenNav(false)}
              className="h-7 w-7 md:hidden cursor-pointer"
            />
          ) : (
            <HiMenuAlt1
              onClick={() => setOpenNav(true)}
              className="h-7 w-7 md:hidden cursor-pointer"
            />
          )}

        </div>

      </div>

      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />

    </header>

  );
};

export default Navbar;