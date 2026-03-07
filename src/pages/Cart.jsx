import React from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";
import emptyCart from "../assets/empty-cart.png";
import { useNavigate } from "react-router-dom";

const Cart = ({ location, getLocation }) => {

  const { cartItems, updateQuantity, deleteCartItem } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const totalPrice =
    cartItems?.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ) || 0;

  const deliveryFee = 5;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {cartItems?.length > 0 ? (

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT SIDE - CART ITEMS */}

          <div className="lg:col-span-2 space-y-5">

            <h1 className="text-3xl font-bold">
              My Cart ({cartItems.length})
            </h1>

            {cartItems.map((item, index) => {

              const subtotal = item.price * item.quantity;

              return (

                <div
                  key={index}
                  className="flex items-center justify-between bg-white shadow-md rounded-xl p-5"
                >

                  {/* Product */}

                  <div className="flex items-center gap-6">

                    <img
                      src={item.thumbnail || item.image || emptyCart}
                      alt={item.title}
                      className="h-24 w-24 object-cover rounded-lg"
                    />

                    <div>

                      <h2 className="font-semibold line-clamp-2">
                        {item.title}
                      </h2>

                      <p className="text-gray-500 text-sm mt-1">
                        ${item.price} each
                      </p>

                      <p className="text-red-500 font-semibold mt-1">
                        Subtotal: ${subtotal}
                      </p>

                    </div>

                  </div>

                  {/* Quantity */}

                  <div className="flex items-center gap-4">

                    <div className="flex items-center border rounded-lg overflow-hidden">

                      <button
                        onClick={() =>
                          updateQuantity(item.id, "decrease")
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        -
                      </button>

                      <span className="px-4">{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, "increase")
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>

                    </div>

                    {/* Delete */}

                    <FaRegTrashAlt
                      onClick={() => deleteCartItem(item.id)}
                      className="text-rose-500 cursor-pointer text-xl hover:scale-110 transition"
                    />

                  </div>

                </div>

              );

            })}

          </div>

          {/* RIGHT SIDE - BILL */}

          <div className="bg-white shadow-lg rounded-xl p-6 h-fit sticky top-24">

            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-gray-600">

              <div className="flex justify-between">
                <span>Items Total</span>
                <span>${totalPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${deliveryFee}</span>
              </div>

              <hr />

              <div className="flex justify-between font-bold text-lg">
                <span>Grand Total</span>
                <span>${totalPrice + deliveryFee}</span>
              </div>

            </div>

            <button
              className="w-full mt-6 bg-linear-to-r from-pink-500 to-red-500 py-3 rounded-xl text-white font-semibold hover:scale-105 transition"
            >
              Proceed to Checkout
            </button>

          </div>

        </div>

      ) : (

        /* EMPTY CART */

        <div className="flex flex-col items-center justify-center h-[70vh] text-center">

          <h1 className="text-4xl font-bold text-rose-500">
            Your Cart is Empty
          </h1>

          <img
            src={emptyCart}
            alt="Empty Cart"
            className="w-72 my-6"
          />

          <button
            onClick={() => navigate("/products")}
            className="bg-linear-to-r from-pink-500 to-red-500 px-6 py-3 rounded-xl text-white font-semibold hover:scale-105 transition"
          >
            Continue Shopping
          </button>

        </div>

      )}

    </div>
  );
};

export default Cart;