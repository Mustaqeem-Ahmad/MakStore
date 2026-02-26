// context/CartContext.jsx
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  const addToCart = (product) => {
    const itemInCart = cartItem.find((item) => item.id === product.id);

    if (itemInCart) {
      const updatedCart = cartItem.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItem(updatedCart);
      toast.success("Product quantity increased!");
    } else {
      // Ensure image key exists
      const newProduct = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image || product.thumbnail, // fallback for DummyJSON
        quantity: 1,
      };
      setCartItem([...cartItem, newProduct]);
      toast.success("Product added to cart!");
    }
  };

  const updateQuantity = (cartItem, productId, action) => {
    setCartItem(
      cartItem
        .map((item) => {
          if (item.id === productId) {
            let newQty = item.quantity;
            if (action === "increase") newQty += 1;
            if (action === "decrease") newQty -= 1;
            toast.success(
              action === "increase"
                ? "Product quantity increased!"
                : "Product quantity decreased!"
            );
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item) => item != null)
    );
  };

  const deletCartItem = (productId) => {
    setCartItem(cartItem.filter((item) => item.id !== productId));
    toast.success("Product removed from cart!");
  };

  return (
    <CartContext.Provider
      value={{ cartItem, setCartItem, addToCart, updateQuantity, deletCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);