import React from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/clerk-react";
import emptyCart from "../assets/empty-cart.png";
import { useNavigate } from "react-router-dom";

const Cart = ({ location, getLocation }) => {
  const { cartItem, updateQuantity, deletCartItem } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  // Total price including quantities
  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl px-4 md:px-0 mt-10 overflow-x-hidden mb-5 mx-auto">
      {cartItem.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl">My Cart ({cartItem.length})</h1>

          <div className="mt-10 space-y-4">
            {cartItem.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 flex justify-between items-center p-5 rounded-md"
              >
                <div className="flex items-center gap-4 md:gap-8">
                  <img
                    src={item.image || item.thumbnail || emptyCart} // ✅ fallback
                    alt={item.title}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div>
                    <h1 className="md:w-[300px] w-[120px] line-clamp-2 font-medium md:font-semibold">
                      {item.title}
                    </h1>
                    <h3 className="text-xl text-red-500 mt-1 md:mt-0 font-semibold">
                      ${item.price}
                    </h3>
                  </div>
                </div>

                {/* Quantity controls */}
                <div className="bg-gradient-to-r from-pink-500 to-red-500 md:px-4 px-2 py-1 text-xl mr-3 md:py-2 rounded-md font-semibold flex gap-4 text-white">
                  <button
                    onClick={() => updateQuantity(cartItem, item.id, "decrease")}
                    className="cursor-pointer h-5 w-5"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(cartItem, item.id, "increase")}
                    className="cursor-pointer h-5 w-5"
                  >
                    +
                  </button>
                </div>

                {/* Delete item */}
                <span className="hover:bg-white/60 transition-all rounded-full p-3 shadow-2xl">
                  <FaRegTrashAlt
                    onClick={() => deletCartItem(item.id)}
                    className="cursor-pointer text-rose-500 text-2xl h-6 w-6"
                  />
                </span>
              </div>
            ))}
          </div>

          {/* Delivery info and bill */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 mt-10">
            {/* Delivery Info */}
            <div className="bg-gray-100 rounded-md p-7 space-y-2">
              <h1 className="text-gray-800 font-bold text-xl">Delivery Info</h1>

              <div className="flex flex-col space-y-1">
                <label>Full Name</label>
                <input
                  type="text"
                  className="p-2 rounded-md"
                  value={user?.fullName || ""}
                  placeholder="Enter Your Name"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label>Address</label>
                <input
                  type="text"
                  className="p-2 rounded-md"
                  value={location?.city || ""}
                  placeholder="Enter Your Address"
                />
              </div>

              <div className="flex w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label>State</label>
                  <input
                    type="text"
                    className="p-2 w-full rounded-md"
                    value={location?.state || ""}
                    placeholder="Enter State"
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label>Pin Code</label>
                  <input
                    type="text"
                    className="p-2 w-full rounded-md"
                    value={location?.postcode || ""}
                    placeholder="Enter Pin Code"
                  />
                </div>
              </div>

              <div className="flex w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label>Country</label>
                  <input
                    type="text"
                    className="p-2 w-full rounded-md"
                    value={location?.country || ""}
                    placeholder="Enter Country"
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className="p-2 w-full rounded-md"
                    placeholder="Enter Phone Number"
                  />
                </div>
              </div>

              <button className="bg-gradient-to-r from-pink-500 to-red-500 px-4 text-xl mt-5 py-1 rounded-md font-semibold text-white w-full">
                Submit
              </button>

              <div className="flex items-center justify-center text-gray-700 mt-4">
                ----------OR----------
              </div>

              <div className="flex justify-center mt-4">
                <button
                  onClick={getLocation}
                  className="bg-gradient-to-r from-pink-500 to-red-500 px-4 text-xl py-1 rounded-md font-semibold text-white"
                >
                  Detect Location
                </button>
              </div>
            </div>

            {/* Bill Details */}
            <div className="bg-white border border-gray-100 shadow-xl h-max rounded-md p-7 space-y-2">
              <h1 className="text-gray-800 font-bold text-xl">Bill Details</h1>

              <div className="flex items-center justify-between text-gray-600">
                <h1 className="flex items-center gap-2">
                  <LuNotebookText /> Items Total
                </h1>
                <p className="font-semibold">${totalPrice}</p>
              </div>

              <div className="flex items-center justify-between text-gray-600">
                <h1 className="flex items-center gap-2">
                  <MdDeliveryDining /> Delivery Charges
                </h1>
                <p className="text-rose-500 font-semibold">
                  <span className="text-gray-600 font-semibold line-through mr-2">$25</span>
                  FREE
                </p>
              </div>

              <div className="flex items-center justify-between text-gray-600">
                <h1 className="flex items-center gap-2">
                  <GiShoppingBag /> Handling Charges
                </h1>
                <p className="text-rose-500 font-semibold">$5</p>
              </div>

              <hr className="text-gray-200 my-5" />

              <div className="flex items-center justify-between">
                <h1 className="font-semibold text-lg">Grand Total</h1>
                <p className="font-semibold text-lg">${totalPrice + 5}</p>
              </div>

              <div>
                <h1 className="mt-7 mb-3 text-gray-600 font-semibold">Apply Promo Code</h1>
                <div className="flex gap-4 w-full">
                  <input
                    type="text"
                    className="p-2 rounded-md w-full"
                    placeholder="Enter Code"
                  />
                  <button className="px-4 py-1 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer">
                    Apply
                  </button>
                </div>
              </div>

              <button className="bg-gradient-to-r from-pink-500 to-red-500 px-4 text-xl mt-5 py-2 rounded-md font-semibold w-full flex items-center justify-center gap-4 text-white">
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Empty cart
        <div className="flex flex-col items-center justify-center h-[600px]">
          <h1 className="text-5xl text-rose-500/80 font-bold">
            Oh No! Your Cart is Empty
          </h1>
          <img src={emptyCart} alt="Empty Cart" className="w-[450px]" />
          <button
            onClick={() => navigate("/products")}
            className="bg-gradient-to-r from-pink-500 to-red-500 px-4 py-2 mt-4 rounded-md font-semibold text-white"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;