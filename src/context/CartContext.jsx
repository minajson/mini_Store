
// src/context/CartContext.jsx
import { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex !== -1) {
        const updated = [...state.items];
        updated[existingIndex].qty += 1;
        return { ...state, items: updated };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
      };

    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "CLEAR":
      return { ...state, items: [] };

    default:
      return state;
  }
};

const initialState = {
  items: [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const totalItems = state.items.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = state.items
    .reduce((sum, item) => sum + item.price * item.qty, 0)
    .toFixed(2);

  const value = {
    items: state.items,
    dispatch,
    totalItems,
    totalAmount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
