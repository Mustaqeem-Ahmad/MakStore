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
  const { cartItem } = useCart();

  const [location, setLocation] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Use OpenStreetMap Nominatim API to get city/state
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();

        setLocation({
          city: data.address.city || data.address.town || data.address.village || "Unknown",
          state: data.address.state || "Unknown",
        });
        setOpenDropdown(false); // auto-close after setting
      },
      (error) => {
        console.error(error);
        alert("Unable to fetch location");
      }
    );
  };

  return (
    <div className="bg-white py-3 px-4 md:px-0 shadow-2xl">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-7">
          <Link to={"/"}>
            <h1 className="text-3xl font-semibold font-[Orbitron]">
              <span className="bg-gradient-to-r from-pink-500 to-[#000] bg-clip-text text-transparent">
                MakStore
              </span>
            </h1>
          </Link>

          {/* Location */}
          <div className="md:flex hidden items-center gap-1 cursor-pointer text-gray-700">
            <MapPin className="text-pink-500" />
            <span className="font-semibold">
              {location ? (
                <div className="-space-y-1 text-sm">
                  <p>{location.city}</p>
                  <p>{location.state}</p>
                </div>
              ) : (
                "Add Address"
              )}
            </span>
            <FaCaretDown onClick={toggleDropdown} />
          </div>

          {/* Dropdown */}
          {openDropdown && (
            <div className="w-60 h-max bg-white shadow-2xl fixed top-20 left-[20rem] rounded-md p-3 z-50 border-2 border-gray-200">
              <h1 className="font-semibold mb-4 text-xl flex justify-between">
                Change Location
                <span onClick={toggleDropdown} className="mt-2 cursor-pointer">
                  <CgClose />
                </span>
              </h1>
              <button
                onClick={getLocation}
                className="bg-pink-500 hover:bg-pink-600 hover:text-black px-3 py-1 rounded-md text-white font-semibold cursor-pointer"
              >
                Set Location
              </button>
            </div>
          )}
        </div>

        {/* Menu Section */}
        <nav className="flex items-center font-[poppins] justify-between gap-6">
          <ul className="md:flex hidden items-center text-lg font-semibold gap-6 text-black">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-pink-500 transition-all duration-200"
                  : "text-zinc-600"
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-pink-500 transition-all duration-200"
                  : "text-zinc-600"
              }
            >
              <li>Products</li>
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-pink-500 transition-all duration-200"
                  : "text-zinc-600"
              }
            >
              <li>About Us</li>
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-pink-500 transition-all duration-200"
                  : "text-zinc-600"
              }
            >
              <li>Contact Us</li>
            </NavLink>
          </ul>

          {/* Cart */}
          <Link className="relative" to={"/cart"}>
            <IoCartOutline className="h-7 w-7" />
            <span className="px-2 absolute -top-3 -right-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full">
              {cartItem.length}
            </span>
          </Link>

          {/* User Buttons */}
          <div className="clrk hidden md:block">
            <SignedOut>
              <SignInButton className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-600 hover:to-pink-600 px-4 py-1 ml-2 rounded-md text-white font-semibold cursor-pointer" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile Menu Icon */}
          {openNav ? (
            <HiMenuAlt3 onClick={() => setOpenNav(false)} className="h-7 w-7 md:hidden" />
          ) : (
            <HiMenuAlt1 onClick={() => setOpenNav(true)} className="h-7 w-7 md:hidden" />
          )}
        </nav>
      </div>
      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
    </div>
  );
};

export default Navbar;