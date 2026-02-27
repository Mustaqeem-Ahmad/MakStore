import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // ✅ Load from localStorage initially
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // ✅ Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const itemInCart = prevCart.find(
        (item) => item.id === product.id
      );

      if (itemInCart) {
        toast.success("Product quantity increased!");
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      toast.success("Product added to cart!");
      return [
        ...prevCart,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image || product.thumbnail,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (productId, action) => {
    setCartItems((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            let newQty = item.quantity;

            if (action === "increase") newQty++;
            if (action === "decrease") newQty--;

            if (newQty > 0) {
              return { ...item, quantity: newQty };
            }

            return null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const deleteCartItem = (productId) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
    toast.success("Product removed from cart!");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        deleteCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);