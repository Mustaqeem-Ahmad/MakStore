import { UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
  const { user } = useUser();

  return (
    <div
      className={`${
        openNav ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex flex-col h-screen w-[75%] justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden transition-all duration-300 rounded-r-xl shadow-md `}
    >
      <div>
        <div className="flex items-center mb-5 gap-3 justify-start">
          {user ? <UserButton size={60} /> : <FaUserCircle size={60} />}
          <div>
            <h1>Hello,{user?.firstName}</h1>
            <h1 className="text-sm text-slate-500">Premium User</h1>
          </div>
        </div>
        <hr className="text-gray-400"/>
        <nav className="mt-12">
          <ul className="flex flex-col gap-7 font-semibold">
            <NavLink 
              to={"/"} onClick={()=> setOpenNav(false)}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-[#FB641B] w-fit transition-all duration-200"
                  : "text-zinc-600"
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink 
              to={"/products"} onClick={()=> setOpenNav(false)}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-[#FB641B] w-fit transition-all duration-200"
                  : "text-zinc-600"
              }
            >
              <li>Products</li>
            </NavLink>
            <NavLink 
              to={"/about"} onClick={()=> setOpenNav(false)}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-[#FB641B] w-fit transition-all duration-200"
                  : "text-zinc-600"
              }
            >
              <li>About Us</li>
            </NavLink>
            <NavLink 
              to={"/contact"} onClick={()=> setOpenNav(false)}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-[#FB641B] w-fit transition-all duration-200"
                  : "text-zinc-600"
              }
            >
              <li>Contact Us</li>
            </NavLink>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
