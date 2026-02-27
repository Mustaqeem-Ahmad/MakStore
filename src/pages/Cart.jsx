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
  // ✅ updated names
  const { cartItems, updateQuantity, deleteCartItem } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  // ✅ Safe total calculation
  const totalPrice =
    cartItems?.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ) || 0;

  return (
    <div className="max-w-6xl px-4 md:px-0 mt-10 overflow-x-hidden mb-5 mx-auto">
      {cartItems?.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl">
            My Cart ({cartItems.length})
          </h1>

          <div className="mt-10 space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 flex justify-between items-center p-5 rounded-md"
              >
                <div className="flex items-center gap-4 md:gap-8">
                  <img
                    src={item.image || emptyCart}
                    alt={item.title}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div>
                    <h1 className="md:w-[300px] w-[120px] line-clamp-2 font-medium md:font-semibold">
                      {item.title}
                    </h1>
                    <h3 className="text-xl text-red-500 font-semibold">
                      ${item.price}
                    </h3>
                  </div>
                </div>

                {/* Quantity controls */}
                <div className="bg-gradient-to-r from-pink-500 to-red-500 md:px-4 px-2 py-1 text-xl rounded-md font-semibold flex gap-4 text-white">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, "decrease")
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, "increase")
                    }
                  >
                    +
                  </button>
                </div>

                {/* Delete */}
                <span className="hover:bg-white/60 transition-all rounded-full p-3 shadow-2xl">
                  <FaRegTrashAlt
                    onClick={() => deleteCartItem(item.id)}
                    className="cursor-pointer text-rose-500 text-2xl"
                  />
                </span>
              </div>
            ))}
          </div>

          {/* Bill Section */}
          <div className="mt-10 bg-white border shadow-xl rounded-md p-7 space-y-4">
            <h1 className="font-bold text-xl">Bill Details</h1>

            <div className="flex justify-between">
              <span>Items Total</span>
              <span>${totalPrice}</span>
            </div>

            <div className="flex justify-between">
              <span>Handling Charges</span>
              <span>$5</span>
            </div>

            <hr />

            <div className="flex justify-between font-semibold text-lg">
              <span>Grand Total</span>
              <span>${totalPrice + 5}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[600px]">
          <h1 className="text-4xl text-rose-500 font-bold">
            Your Cart is Empty
          </h1>

          <img src={emptyCart} alt="Empty Cart" className="w-[350px]" />

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